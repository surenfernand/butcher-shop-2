import type { Media as MediaType } from '@/payload-types'

import { Label } from '@/components/Grid/Label'
import { Media } from '@/components/Media'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type Props = {
  active?: boolean
  isInteractive?: boolean
  label?: {
    amount: number
    position?: 'bottom' | 'center'
    title: string
  }
  media?: MediaType | null
}

export const GridTileImage: React.FC<Props> = ({
  active,
  isInteractive = true,
  label,
  ...props
}) => {
  return (
    <div
      className={clsx(
        'group relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-black hover:border-blue-600 dark:bg-black',
        {
          'border-2 border-blue-600': active,
          'border-neutral-200 dark:border-neutral-800': !active,
        },
      )}
    >
      {props.media ? (
        <Media
          className={clsx('relative h-full w-full object-cover', {
            'transition duration-300 ease-in-out group-hover:scale-105': isInteractive,
          })}
          height={80}
          imgClassName="h-full w-full object-cover"
          resource={props.media}
          width={80}
        />
      ) : (
        <Image
          src={placeholderImageUrl('carousel-tile', 'meat')}
          alt=""
          fill
          sizes="(max-width: 768px) 70vw, 400px"
          className="object-cover"
        />
      )}
      {label ? <Label amount={label.amount} position={label.position} title={label.title} /> : null}
    </div>
  )
}
