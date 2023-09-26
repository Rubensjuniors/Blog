'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

import { useSidemenuContext } from '@/context/sidemenuContext'
import { useTranslationClient } from '@/hooks/useTransletions/client'
import { sidemenuItems } from '@/ultils/constants'

import { Icon } from '@/components/basic'

import { Keystitle } from '../types'

const SidemenuMobile = ({
  setIsOpenMenu
}: {
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}) => {
  const { setTitle } = useSidemenuContext()
  const t = useTranslationClient()
  const pathname = usePathname()
  const filterPath = pathname.replace(/\/pt-BR/g, '')
  const filterDefaultPath = pathname === '/pt-BR' && '/'

  return (
    <nav
      data-testid="sidemenu"
      className="flex h-full w-full flex-col items-start justify-start gap-4 rounded-lg bg-gray-800 p-3"
    >
      <ul className="flex w-full flex-col items-start">
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
              onClick={() => {
                setTitle(t.blog.sidemenu[itensMenu.title as Keystitle])
                setIsOpenMenu(false)
              }}
            >
              <>
                <Icon id={itensMenu.id} />

                <li className="font-bold">
                  {t.blog.sidemenu[itensMenu.title as Keystitle]}
                </li>
              </>
            </Link>
          ))}
      </ul>
    </nav>
  )
}

export default SidemenuMobile
