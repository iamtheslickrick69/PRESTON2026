"use client"

import * as React from "react"

export interface PixelCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number
  speed?: number
  colors?: string[]
  variant?: "default" | "icon"
  noFocus?: boolean
}

const PixelCanvas = React.forwardRef<HTMLDivElement, PixelCanvasProps>(
  ({ gap, speed, colors, variant, noFocus, style, ...props }, ref) => {
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      // Only run on client
      if (typeof window === "undefined") return

      // Define Pixel class
      class Pixel {
        width: number
        height: number
        ctx: CanvasRenderingContext2D
        x: number
        y: number
        color: string
        speed: number
        size: number
        sizeStep: number
        minSize: number
        maxSizeInteger: number
        maxSize: number
        delay: number
        counter: number
        counterStep: number
        isIdle: boolean
        isReverse: boolean
        isShimmer: boolean

        constructor(
          canvas: HTMLCanvasElement,
          context: CanvasRenderingContext2D,
          x: number,
          y: number,
          color: string,
          speed: number,
          delay: number,
        ) {
          this.width = canvas.width
          this.height = canvas.height
          this.ctx = context
          this.x = x
          this.y = y
          this.color = color
          this.speed = this.getRandomValue(0.1, 0.9) * speed
          this.size = 0
          this.sizeStep = Math.random() * 0.4
          this.minSize = 0.5
          this.maxSizeInteger = 2
          this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger)
          this.delay = delay
          this.counter = 0
          this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01
          this.isIdle = false
          this.isReverse = false
          this.isShimmer = false
        }

        getRandomValue(min: number, max: number) {
          return Math.random() * (max - min) + min
        }

        draw() {
          const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5
          this.ctx.fillStyle = this.color
          this.ctx.fillRect(
            this.x + centerOffset,
            this.y + centerOffset,
            this.size,
            this.size,
          )
        }

        appear() {
          this.isIdle = false

          if (this.counter <= this.delay) {
            this.counter += this.counterStep
            return
          }

          if (this.size >= this.maxSize) {
            this.isShimmer = true
          }

          if (this.isShimmer) {
            this.shimmer()
          } else {
            this.size += this.sizeStep
          }

          this.draw()
        }

        disappear() {
          this.isShimmer = false
          this.counter = 0

          if (this.size <= 0) {
            this.isIdle = true
            return
          } else {
            this.size -= 0.1
          }

          this.draw()
        }

        shimmer() {
          if (this.size >= this.maxSize) {
            this.isReverse = true
          } else if (this.size <= this.minSize) {
            this.isReverse = false
          }

          if (this.isReverse) {
            this.size -= this.speed
          } else {
            this.size += this.speed
          }
        }
      }

      // Setup canvas
      const container = containerRef.current
      if (!container) return

      const parent = container.parentElement
      if (!parent) return

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      container.appendChild(canvas)

      const pixelColors = colors || ["#f8fafc", "#f1f5f9", "#cbd5e1"]
      const pixelGap = Math.max(4, Math.min(50, gap || 5))
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const pixelSpeed = reducedMotion ? 0 : Math.max(0, Math.min(100, speed || 35)) * 0.001
      const pixelVariant = variant || "default"

      let pixels: Pixel[] = []
      let animation: number | null = null
      const timeInterval = 1000 / 60
      let timePrevious = performance.now()

      const getDistanceToCenter = (x: number, y: number) => {
        const dx = x - canvas.width / 2
        const dy = y - canvas.height / 2
        return Math.sqrt(dx * dx + dy * dy)
      }

      const getDistanceToBottomLeft = (x: number, y: number) => {
        const dx = x
        const dy = canvas.height - y
        return Math.sqrt(dx * dx + dy * dy)
      }

      const createPixels = () => {
        pixels = []
        for (let x = 0; x < canvas.width; x += pixelGap) {
          for (let y = 0; y < canvas.height; y += pixelGap) {
            const color = pixelColors[Math.floor(Math.random() * pixelColors.length)]
            let delay = 0

            if (pixelVariant === "icon") {
              delay = reducedMotion ? 0 : getDistanceToCenter(x, y)
            } else {
              delay = reducedMotion ? 0 : getDistanceToBottomLeft(x, y)
            }

            pixels.push(new Pixel(canvas, ctx, x, y, color, pixelSpeed, delay))
          }
        }
      }

      const handleResize = () => {
        const rect = container.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return

        const width = Math.floor(rect.width)
        const height = Math.floor(rect.height)

        const dpr = window.devicePixelRatio || 1
        canvas.width = width * dpr
        canvas.height = height * dpr
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`

        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)

        createPixels()
      }

      const handleAnimation = (name: "appear" | "disappear") => {
        if (animation) {
          cancelAnimationFrame(animation)
        }

        const animate = () => {
          animation = requestAnimationFrame(animate)

          const timeNow = performance.now()
          const timePassed = timeNow - timePrevious

          if (timePassed < timeInterval) return

          timePrevious = timeNow - (timePassed % timeInterval)

          ctx.clearRect(0, 0, canvas.width, canvas.height)

          let allIdle = true
          for (const pixel of pixels) {
            pixel[name]()
            if (!pixel.isIdle) allIdle = false
          }

          if (allIdle) {
            cancelAnimationFrame(animation!)
            animation = null
          }
        }

        animate()
      }

      // Initial setup
      handleResize()

      // Resize observer
      const ro = new ResizeObserver(() => {
        requestAnimationFrame(handleResize)
      })
      ro.observe(container)

      // Event listeners
      const handleMouseEnter = () => handleAnimation("appear")
      const handleMouseLeave = () => handleAnimation("disappear")

      parent.addEventListener("mouseenter", handleMouseEnter)
      parent.addEventListener("mouseleave", handleMouseLeave)

      if (!noFocus) {
        parent.addEventListener("focus", handleMouseEnter, { capture: true })
        parent.addEventListener("blur", handleMouseLeave, { capture: true })
      }

      // Cleanup
      return () => {
        ro.disconnect()
        parent.removeEventListener("mouseenter", handleMouseEnter)
        parent.removeEventListener("mouseleave", handleMouseLeave)
        if (!noFocus) {
          parent.removeEventListener("focus", handleMouseEnter)
          parent.removeEventListener("blur", handleMouseLeave)
        }
        if (animation) {
          cancelAnimationFrame(animation)
        }
        if (canvas.parentElement) {
          canvas.parentElement.removeChild(canvas)
        }
      }
    }, [gap, speed, colors, variant, noFocus])

    return (
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style
        }}
        {...props}
      />
    )
  }
)
PixelCanvas.displayName = "PixelCanvas"

export { PixelCanvas }
