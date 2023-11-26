import React from 'react'

import { Icon } from '@/components/basic'

import { SOCIAIS } from '@/ultils/constants'

import { getFooterData } from './request'

const Footer = async () => {
  const footerData = await getFooterData()
  return (
    <div className="p-4 py-8 flex items-center flex-col w-full border-t border-gray-750 gap-10">
      <div className="flex items-start justify-between w-full">
        <div>
          <h1 className="text-3xl md:text-4xl font-marck-script">{footerData.name}</h1>
          <p className="font-light mt-2 text-sm md:text-md">{footerData.description}</p>
        </div>

        <ul className="flex items-center gap-3 sm:mr-6 sm:gap-4">
          {SOCIAIS.map((social) => {
            return (
              <li key={social.name}>
                <a href={social.url}>
                  <Icon id={social.id} iconSize={32} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      <p className="text-sm md:text-md">{footerData.copyright}</p>
    </div>
  )
}

export default Footer