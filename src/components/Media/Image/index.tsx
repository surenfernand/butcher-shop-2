'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
import { absolutizeMediaSrc } from '@/utilities/absolutizeMediaSrc'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import NextImage from 'next/image'
import React from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'

const { breakpoints } = cssVariables

export const Image: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    height: heightFromProps,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    width: widthFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined | null
  let height: number | undefined | null
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
    } = resource

    width = widthFromProps ?? fullWidth
    height = heightFromProps ?? fullHeight
    alt = altFromResource

    const filename = fullFilename

    // src = `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
    src = url?.startsWith('http') ? url : url || ''
  }

  if (typeof src === 'string' && src.startsWith('/') && !src.startsWith('//')) {
    src = absolutizeMediaSrc(src)
  }

  let usedPlaceholder = false
  if (typeof src === 'string' && !src.trim()) {
    const seed =
      (typeof alt === 'string' && alt) ||
      (resource &&
      typeof resource === 'object' &&
      resource !== null &&
      'id' in resource &&
      resource.id !== undefined &&
      String(resource.id)) ||
      'media'
    src = placeholderImageUrl(seed, 'meat')
    usedPlaceholder = true
  }

  if (usedPlaceholder && !fill) {
    width = width ?? widthFromProps ?? 1600
    height = height ?? heightFromProps ?? 900
  }

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value}px`)
      .join(', ')

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height || heightFromProps : undefined}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width || widthFromProps : undefined}
    />
  )
}
