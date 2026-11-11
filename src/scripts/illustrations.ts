// Animation of the hero illustrations (research and publications pages), shared through the
// `data-illustration` attribute on their <svg>. Each plays once when it comes into view: the
// `.wiggle` shapes bob and the `.bar` shapes stretch (see "Hero illustrations" in global.css).
// Then `.square` and `.bar` shapes react to the mouse pointer. Nothing moves with reduced motion.
// `data-duration` gives the length of the longest animation, delay included, in milliseconds.

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function box(el: SVGGraphicsElement) {
  return {
    x: Number(el.getAttribute('x')),
    y: Number(el.getAttribute('y')),
    w: Number(el.getAttribute('width')),
    h: Number(el.getAttribute('height')),
  }
}

for (const svg of document.querySelectorAll<SVGSVGElement>('svg[data-illustration]')) {
  const duration = Number(svg.dataset.duration ?? 1500)

  // Play the animation once each time the illustration comes into view.
  let visible = false
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !visible && !reducedMotion.matches) {
        svg.removeAttribute('data-playing')
        // Restart the CSS animations on the next frame.
        requestAnimationFrame(() => {
          svg.setAttribute('data-playing', '')
          setTimeout(() => svg.removeAttribute('data-playing'), duration)
        })
      }
      visible = entry.isIntersecting
    },
    { threshold: 0.4 },
  ).observe(svg)

  // Squares near the pointer rise and bars stretch a little.
  const squares = [...svg.querySelectorAll<SVGRectElement>('.square')]
  const bars = [...svg.querySelectorAll<SVGRectElement>('.bar')]
  let frame = 0

  const update = (point: DOMPoint | null) => {
    frame = 0
    for (const el of squares) {
      const { x, y, w, h } = box(el)
      const lift = point
        ? Math.max(0, 1 - Math.hypot(x + w / 2 - point.x, y + h / 2 - point.y) / 42)
        : 0
      el.style.transform = lift > 0.01 ? `translate(${-4 * lift}px, ${-4 * lift}px)` : ''
    }
    for (const el of bars) {
      const { x, y, w, h } = box(el)
      let k = 0
      if (point) {
        const dy = point.y < y ? y - point.y : point.y > y + h ? point.y - y - h : 0
        k = Math.max(0, 1 - Math.hypot(x + w / 2 - point.x, dy) / 30)
      }
      el.style.transform = k > 0.01 ? `scaleY(${1 + 0.1 * k})` : ''
    }
  }

  svg.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || frame) return
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
    frame = requestAnimationFrame(() => update(point))
  })
  svg.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame)
    update(null)
  })
}
