// Animation of the hero illustrations of the inner pages, shared through the `data-illustration`
// attribute on their <svg>. Each plays once when it comes into view: the `.wiggle` shapes bob, a
// wave runs along the `.wave` shapes, the `.bar` shapes stretch, the `.rise` and `.fade` shapes
// fade in, the `.pop` shapes grow in, the `.gather` shapes come in from the offset given by their
// `--dx` and `--dy` and the `.write` and `.draw` lines draw themselves (see "Hero illustrations"
// in global.css). The shapes that appear stay hidden until the first play: `data-ready` marks an
// illustration that will play, `data-played` one that has. Then `.square`, `.lift`, `.bar` and
// `.write` shapes react to the mouse pointer, and `.person` groups near it get a `data-near`
// attribute, which their component styles. A `.lift` shape with a `data-node` name also lights up
// the links whose `data-links` list that name, through a `data-active` attribute. Nothing moves
// with reduced motion. `data-duration` gives the length of the longest animation, delay included,
// in milliseconds; `data-lift-radius`, the distance from the pointer at which `.lift` shapes start
// to rise, in units of the viewBox (46 by default).

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
  if (!reducedMotion.matches) svg.setAttribute('data-ready', '')

  // Play the animation once each time the illustration comes into view.
  let visible = false
  new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !visible && !reducedMotion.matches) {
        svg.removeAttribute('data-playing')
        // Restart the CSS animations on the next frame.
        requestAnimationFrame(() => {
          svg.setAttribute('data-playing', '')
          setTimeout(() => {
            svg.removeAttribute('data-playing')
            svg.setAttribute('data-played', '')
          }, duration)
        })
      }
      visible = entry.isIntersecting
    },
    { threshold: 0.4 },
  ).observe(svg)

  // Squares near the pointer rise and bars stretch a little.
  const squares = [...svg.querySelectorAll<SVGRectElement>('.square')]
  const bars = [...svg.querySelectorAll<SVGRectElement>('.bar')]
  const lines = [...svg.querySelectorAll<SVGLineElement>('line.write')]
  // Any shape or group that rises near the pointer, measured from the center of its box.
  const lifts = [...svg.querySelectorAll<SVGGraphicsElement>('.lift')]
  const liftRadius = Number(svg.dataset.liftRadius ?? 46)
  // Links between named shapes, lit while one of their shapes is close to the pointer.
  const links = [...svg.querySelectorAll<SVGElement>('[data-links]')]
  // People: the position of their head, given by `data-x` and `data-y`.
  const people = [...svg.querySelectorAll<SVGGElement>('.person')]
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
    const near = new Set<string>()
    for (const el of lifts) {
      let lift = 0
      const parent = el.parentNode as SVGGraphicsElement
      const toSvg = svg
        .getScreenCTM()
        ?.inverse()
        .multiply(parent.getScreenCTM() ?? new DOMMatrix())
      if (point && toSvg) {
        // Center of the box, in the coordinates of the <svg> (the shape may sit in a moved group).
        const b = el.getBBox()
        const center = new DOMPoint(b.x + b.width / 2, b.y + b.height / 2).matrixTransform(toSvg)
        lift = Math.max(0, 1 - Math.hypot(center.x - point.x, center.y - point.y) / liftRadius)
      }
      el.style.transform = lift > 0.01 ? `translate(${-4 * lift}px, ${-4 * lift}px)` : ''
      if (lift > 0.35 && el.dataset.node) near.add(el.dataset.node)
    }
    for (const el of links) {
      const names = (el.dataset.links ?? '').split(' ')
      el.toggleAttribute(
        'data-active',
        names.some((name) => near.has(name)),
      )
    }
    for (const el of lines) {
      const x1 = Number(el.getAttribute('x1'))
      const x2 = Number(el.getAttribute('x2'))
      const y = Number(el.getAttribute('y1'))
      let k = 0
      if (point) {
        const dx = point.x < x1 ? x1 - point.x : point.x > x2 ? point.x - x2 : 0
        k = Math.max(0, 1 - Math.hypot(dx, point.y - y) / 26)
      }
      el.style.transform = k > 0.01 ? `scaleX(${1 + 0.12 * k})` : ''
    }
    for (const el of people) {
      const near =
        point && Math.hypot(Number(el.dataset.x) - point.x, Number(el.dataset.y) - point.y) < 34
      el.toggleAttribute('data-near', Boolean(near))
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
