'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/cn'
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

  const [fallbackSrc, setFallbackSrc] = React.useState<string | null>(null)

  let width: number | undefined | null
  let height: number | undefined | null
  let alt = altFromProps
  let resolvedSrc: StaticImageData | string = srcFromProps || ''

  if (!resolvedSrc && resource && typeof resource === 'object') {
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

    resolvedSrc = url?.startsWith('http') ? url : url || ''
  }

  const seed =
    (typeof alt === 'string' && alt) ||
    (resource &&
    typeof resource === 'object' &&
    resource !== null &&
    'id' in resource &&
    resource.id !== undefined &&
    String(resource.id)) ||
    'media'

  let usedPlaceholder = false
  if (typeof resolvedSrc === 'string' && !resolvedSrc.trim()) {
    resolvedSrc = placeholderImageUrl(seed, 'meat')
    usedPlaceholder = true
  }

  const resourceUrl =
    resource && typeof resource === 'object' && 'url' in resource
      ? String((resource as { url?: string | null }).url ?? '')
      : ''

  React.useEffect(() => {
    setFallbackSrc(null)
  }, [srcFromProps, resourceUrl])

  const displaySrc: StaticImageData | string =
    fallbackSrc !== null ? fallbackSrc : resolvedSrc

  if ((usedPlaceholder || fallbackSrc !== null) && !fill) {
    width = width ?? widthFromProps ?? 1600
    height = height ?? heightFromProps ?? 900
  }

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
      onError={() => {
        if (fallbackSrc !== null) return
        setFallbackSrc(placeholderImageUrl(seed, 'meat'))
      }}
      onLoad={() => {
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={displaySrc}
      width={!fill ? width || widthFromProps : undefined}
    />
  )
}
