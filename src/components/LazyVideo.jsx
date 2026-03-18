import { useRef, useState, useEffect } from 'react'

/**
 * Loads video only when near/in viewport so grids don't fetch 20+ MP4s at once.
 * Once visible, uses preload="metadata" + muted autoplay like the rest of the site.
 */
export default function LazyVideo({
  src,
  className = '',
  wrapperClassName = 'absolute inset-0',
  loadImmediately = false,
  autoPlayWhenVisible = true,
  rootMargin = '180px',
  threshold = 0.05,
  onCanPlay,
  ...videoProps
}) {
  const rootRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(loadImmediately)

  useEffect(() => {
    if (loadImmediately || shouldLoad) return
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting)
        if (hit) {
          setShouldLoad(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [loadImmediately, shouldLoad, rootMargin, threshold])

  return (
    <div ref={rootRef} className={`${wrapperClassName} bg-primary overflow-hidden`}>
      {shouldLoad ? (
        <video
          src={src}
          className={className}
          muted
          loop
          playsInline
          autoPlay={autoPlayWhenVisible}
          preload="metadata"
          onCanPlay={onCanPlay}
          {...videoProps}
        />
      ) : (
        <div
          className="w-full h-full min-h-[8rem] flex items-center justify-center bg-gradient-to-b from-charcoal/40 to-primary"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-2xl">▶</span>
            <span className="text-[10px] uppercase tracking-widest">Loading…</span>
          </div>
        </div>
      )}
    </div>
  )
}
