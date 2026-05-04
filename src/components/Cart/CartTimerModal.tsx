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
      <div className="w-full max-w-[520px] bg-white px-10 py-14 text-center text-[#181818] shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
      
        <h2 className="mx-auto max-w-[360px] text-[28px] font-black uppercase leading-[1.25] tracking-[0.16em] text-[#181818]">
          {title}
        </h2>

        <p className="mx-auto mt-7 max-w-[360px] text-[16px] font-normal leading-7 text-[#5f5f5f]">
          {message}
        </p>

        <div className="mx-auto mt-12 flex min-h-[80px] max-w-[360px] flex-col items-center justify-center bg-[#f5f3f2] px-8 py-10">
          <div className="text-[52px] font-light leading-none tracking-[-0.04em] text-[#151515]">
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
            className="h-14 bg-[#e95b45] text-[13px] font-black uppercase tracking-[0.18em] text-white transition hover:bg-[#d94c37]"
          >
            {extendLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="h-14 border border-[#b89a91] bg-white text-[13px] font-black uppercase tracking-[0.18em] text-[#181818] transition hover:bg-[#f5f3f2]"
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