const BREAKPOINT = 1200

export function init() {
  let state: UiState = {
    state: 'narrow',
  }
  let observer = new ResizeObserver((entries, observer) => {
    onPageWidthChange(entries, state)
  })
  observer.observe(document.querySelector('html'))
}

function onPageWidthChange(ev: ResizeObserverEntry[], state: UiState) {
  let entry = ev[0]
  let size = entry.contentRect
  let newState = currPageState(size.width)
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
  // footer goes to bottom of content
  const footerLeft = document.getElementById('ui-footer-left')
  const footerRight = document.getElementById('ui-footer-right')

  // change body style
  const body = document.body
  body.classList.remove('page-narrow', 'page-wide')
  body.classList.add(`page-${to}`)

  if (to === 'narrow') {
    const narrowRoot = document.getElementById('ui-narrow-header-root')
    removeAndAppendTo(narrowRoot,[logo,nav])
  } else if (to === 'wide') {
    const wideRoot = document.getElementById('ui-wide-header-root')
    removeAndAppendTo(wideRoot,[logo,nav])
  }

  console.log('Move state to ', to, ':', logo, nav, footerLeft, footerRight)
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
