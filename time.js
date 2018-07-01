const MS_IN_A_DAY = 24*60*60*1000

var today = Date.now()
export function daysAgo (d) {
  var diffDays = Math.floor(Math.abs(today - d.getTime()) / MS_IN_A_DAY)
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays > 14) return d.toLocaleDateString()
  return `${diffDays} days ago`
}