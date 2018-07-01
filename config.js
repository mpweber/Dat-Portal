
export function getHops () {
  var hops = (+localStorage.hops)
  if (Number.isNaN(hops)) return 1
  return hops
}

export function setHops (hops) {
  localStorage.hops = hops
}