'use client'

import { cn } from '@/utilities/cn'
import { placeholderImageUrl } from '@/utilities/placeholderImage'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

import type { Props as MediaProps } from '../types'

export const Video: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename, url } = resource
    let src: string | undefined
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      src = url
    } else if (url?.trim()) {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      src = `${base.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`
    } else if (filename) {
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      src = `${base.replace(/\/$/, '')}/media/${filename}`
    }

    if (!src?.trim()) {
      return (
        <div className={cn('relative block min-h-[200px] w-full overflow-hidden', videoClassName)}>
          <Image
            src={placeholderImageUrl(String(filename || 'video'))}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )
    }

    return (
      <video
        autoPlay
        className={cn(videoClassName)}
        controls={false}
        loop
        muted
        onClick={onClick}
        playsInline
        ref={videoRef}
      >
        <source src={src} />
      </video>
    )
  }

  return null
}
