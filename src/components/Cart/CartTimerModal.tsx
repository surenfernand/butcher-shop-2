'use client'

import { createPortal } from 'react-dom'

type Props = {
  open: boolean
  secondsLeft: number
  title: string
  message: string
  confirmLabel: string
  extendLabel: string
  footerText?: string
  onConfirm: () => void
  onExtend: () => void
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export function CartTimerModal({
  open,
  secondsLeft,
  title,
  message,
  confirmLabel,
  extendLabel,
  footerText,
  onConfirm,
  onExtend,
}: Props) {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/55 backdrop-blur-[2px]">
      <div className="w-full max-w-[520px] bg-white px-5 py-8 text-center text-[var(--color-text)] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
      
        <h2 className="mx-auto max-w-[360px] text-[28px] font-black uppercase leading-[1.25] tracking-[0.16em] text-[var(--color-text)]">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-[360px] text-[16px] font-normal leading-7 text-[#5f5f5f]">
          {message}
        </p>

        <div className="mx-auto mt-5 flex max-w-[360px] flex-col items-center justify-center bg-[#f5f3f2] px-4 py-5">
          <div className="text-[52px] font-light leading-none tracking-[-0.04em] text-[var(--color-text)]">
            {formatTime(secondsLeft)}
          </div>

          <div className="mt-6 text-[13px] font-bold uppercase tracking-[0.16em] text-[#b21f18]">
            Minutes Remaining
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-[360px] gap-4">
          <button
            type="button"
            onClick={onExtend}
            className="h-14 bg-[var(--color-primary)] text-[13px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[var(--color-primary)]"
          >
            {extendLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-14 border border-[#b89a91] bg-white text-[13px] font-black uppercase tracking-[0.18em] text-[var(--color-text)] transition hover:bg-[#f5f3f2]"
          >
            {confirmLabel}
          </button>
        </div>

        {footerText && (
          <p className="mt-10 text-[11px] uppercase tracking-[0.28em] text-[#8a8a8a]">
            {footerText}
          </p>
        )}
      </div>
    </div>,
    document.body,
  )
}