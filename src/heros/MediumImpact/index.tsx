import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { RichText } from '@/components/RichText'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import Image from 'next/image'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="">
      <div className="container mb-8">
        {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex gap-4">
            {links.map(({ link }, i) => {
              return (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <div className="container ">
        <div>
          {media && typeof media === 'object' ? (
            <Media
              className="-mx-4 md:-mx-8 2xl:-mx-16"
              imgClassName=""
              priority
              resource={media}
            />
          ) : (
            <div className="relative -mx-4 aspect-[21/9] min-h-[200px] md:-mx-8 2xl:-mx-16">
              <Image
                src={placeholderImageUrl('medium-impact-hero', 'hero')}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </div>
          )}
          {media && typeof media === 'object' && media?.caption && (
            <div className="mt-3">
              <RichText data={media.caption} enableGutter={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
