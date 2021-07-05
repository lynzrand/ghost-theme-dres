// Moves title and footer around to fit different screen widths

const BREAKPOINT = 1200

export function init() {
  let state: UiState = {
    state: 'narrow',
  }
  document.body.classList.add('script-initialized')
  let observer = new ResizeObserver((entries, observer) => {
    onPageWidthChange(entries, state)
  })
  observer.observe(document.body)
}

function onPageWidthChange(ev: ResizeObserverEntry[], state: UiState) {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  let newState = currPageState(vw)
  if (state.state != newState) {
    moveComponents(newState)
    state.state = newState
  }
}

function currPageState(width: number): PageState {
  if (width < 1200) {
    return 'narrow'
  } else {
    return 'wide'
  }
}

function moveComponents(to: PageState) {
  // get the corresponding ui elements
  // title goes to top left on non-index pages, top left of contents on index page
  const logo = document.getElementById('ui-logo')
  // nav goes to top left on index
  const nav = document.getElementById('ui-nav')
  // share menu start at its default position (varies among pages), and moves to
  // left footer if it's wide enough.
  const shareMenu = document.getElementById('ui-share-menu')
  // footer goes to bottom of content
  const footerRight = document.getElementById('ui-footer-right')

  // change body style
  const body = document.body
  body.classList.remove('page-narrow', 'page-wide')
  body.classList.add(`page-${to}`)

  if (to === 'narrow') {
    const narrowHeaderRoot = document.getElementById('ui-narrow-header-root')
    removeAndAppendTo(narrowHeaderRoot, [logo, nav])
  } else if (to === 'wide') {
    const wideHeaderRoot = document.getElementById('ui-wide-header-root')
    removeAndAppendTo(wideHeaderRoot, [logo, nav])
  }
}

function removeAndAppendTo(target: HTMLElement, items: (HTMLElement | null)[]) {
  for (let item of items) {
    if (item) {
      item.remove()
      target.appendChild(item)
    }
  }
}

type PageState = 'narrow' | 'wide'

interface UiState {
  state: PageState
}
