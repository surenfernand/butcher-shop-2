import type { Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'

type Upload = Media | string | null | undefined

const mediaUrl = (image: Upload) =>
  typeof image === 'object' && image ? image.url : undefined

const fallbackImages = [
  'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=700&q=80',
]

const TeamImage = ({
  image,
  alt,
  index,
}: {
  image?: Upload
  alt: string
  index: number
}) => {
  const src = mediaUrl(image) ?? fallbackImages[index % fallbackImages.length]

  return (
    <div className="relative h-[184px] w-full overflow-hidden bg-neutral-200">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1280px) 220px, (min-width: 768px) 45vw, 100vw"
        className="object-cover grayscale"
      />
    </div>
  )
}

export const ArchitectsOfFlavorBlock: React.FC<any> = ({
  title = 'THE ARCHITECTS OF FLAVOR',
  subtitle = 'Precision in every movement, mastery in every cut.',
  team = [],
}) => {
  return (
    <section className="bg-[var(--color-background)] px-6 py-20 text-[var(--color-text)] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          {title && (
            <h2 className="text-3xl font-black uppercase leading-none tracking-[-0.04em] md:text-4xl">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-3 font-sans text-sm italic tracking-wide text-[var(--color-muted-text)]">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member: any, index: number) => (
            <article
              key={member.id ?? index}
              className="rounded-2xl border border-[var(--color-border-token)] bg-white p-6 text-[var(--color-text)] shadow-sm"
            >
              <TeamImage image={member.image} alt={member.name} index={index} />

              <div className="pt-5">
                {member.name && (
                  <h3 className="text-sm font-medium uppercase tracking-[-0.03em]">
                    {member.name}
                  </h3>
                )}

                {member.role && (
                  <p className="mt-2 font-sans text-xs italic text-[var(--color-primary-hover)]">
                    {member.role}
                  </p>
                )}

                {member.description && (
                  <p className="mt-5 text-[12px] leading-5 tracking-[0.03em] text-[var(--color-text)]">
                    {member.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}