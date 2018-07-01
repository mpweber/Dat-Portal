export const $ = (el, sel = false) => {
  if (typeof sel === 'string') {
    // (el, sel)
    return el.querySelector(sel)
  }
  // (sel)
  return document.querySelector(el)
}

export function clone (templateEl) {
  return document.importNode(templateEl.content, true)
}