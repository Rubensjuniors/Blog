import { getPrismicClient } from '@/services/prismic/PrismicRequest'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export async function getArticlesData() {
  try {
    const prismic = getPrismicClient()

    const response = await prismic?.getByType('page_articles', {
      fetch: ['page_articles.my_articles', 'page_articles.search_tags'],
      pageSize: 100,
    })
    const { results } = response
    const articles = {
      title_my_articles: results[0].data.my_articles,
      search_tags: results[0].data.search_tags
    }

    return articles
  } catch {
    throw new Error('Failed fetching Articles')
  }
}

export async function getTagsData() {
  try{
    const prismic = getPrismicClient()

    const tags = await prismic?.getTags()
    return tags
  } catch {
    throw new Error('Failed fetching Tags')
  }
}

export async function getPost(uid: string){
  try {

    const prismic = getPrismicClient()

    const response = await prismic?.getByUID('artigos', uid)

    const post = {
      id: response.id,
      first_publication_date: format(
        new Date(response.first_publication_date ?? ''),
        'dd MMM yyyy',
        {
          locale: ptBR,
        },
      ),
      last_publication_date: format(
        new Date(response.last_publication_date ?? ''),
        'dd MMM yyyy',
        {
          locale: ptBR,
        },
      ),
      tags: response.tags,
      contentBody: {
        title: response.data.title,
        description: response.data.description,
        author: response.data.author,
        photoPost: { ...response.data.cover },
        content: response?.data.content.map(
          (content: { heading: string; body: [{ type: string, text: string, span: [] }] }) => {
            return {
              heading: content.heading,
              body: [...content.body],
            }
          },
        ),

      }

    }

    return post
  } catch {
    throw new Error('Failed fetching Posts')
  }
}