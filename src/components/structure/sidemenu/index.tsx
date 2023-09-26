'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useSidemenuContext } from '@/context/sidemenuContext'
import { useTranslationClient } from '@/hooks/useTransletions/client'

import { Icon } from '@/components/basic'

import { Keystitle, sidemenuProps } from './types'

const Sidemenu = ({ sidemenuItems }: sidemenuProps) => {
  const { setTitle } = useSidemenuContext()
  const t = useTranslationClient()
  const pathname = usePathname()
  const filterPath = pathname.replace(/\/pt-BR/g, '')
  const filterDefaultPath = pathname === '/pt-BR' && '/'

  return (
    <nav
      data-testid="sidemenu"
      className="sticky left-0 top-0 hidden max-h-screen  min-w-[60px] flex-col items-center justify-start gap-4 p-3 sm:flex lg:min-w-[230px] lg:items-start lg:p-5"
    >
      <Link href="/" className="lg:pl-3">
        <Icon id="icon_logo" iconSize={42} />
      </Link>

      <ul className="flex flex-col items-start lg:w-full">
        {sidemenuItems &&
          sidemenuItems.map((itensMenu) => (
            <Link
              href={itensMenu.path}
              key={itensMenu.id}
              className={`
              ${
                (filterPath || filterDefaultPath || pathname) === itensMenu.path
                  ? 'text-red-300'
                  : ''
              }
              flex w-full items-center gap-3 
              p-4 transition-all sm:hover:text-red-300 
              sm:hover:brightness-90`}
              onClick={() =>
                setTitle(t.blog.sidemenu[itensMenu.title as Keystitle])
              }
            >
              <>
                <Icon id={itensMenu.id} />

                <li className="hidden font-bold lg:inline">
                  {t.blog.sidemenu[itensMenu.title as Keystitle]}
                </li>
              </>
            </Link>
          ))}
      </ul>
    </nav>
  )
}

export default Sidemenu
