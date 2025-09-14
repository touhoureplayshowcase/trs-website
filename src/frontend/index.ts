const formatter = Intl.DateTimeFormat('en-us', {
  dateStyle: 'full',
  timeStyle: 'full'
})

addEventListener('DOMContentLoaded', () => {
  const elements = Array.from(document.querySelectorAll('.upcoming > p'))
  elements.sort((a, b) => getTime(a) - getTime(b))
  elements.forEach(e => e.remove())
  elements.forEach(e => document.querySelector('.upcoming')?.appendChild(e))
  elements.forEach(insertLocalTime)
  document.getElementById('google-button')?.addEventListener('click', loadGoogleSchedule)
})

function loadGoogleSchedule (this: HTMLButtonElement): void {
  this.remove()
  const iframe = document.getElementById('google-iframe') as HTMLIFrameElement
  iframe.src = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRHZ4i4isU2KENd95wQjiZaoBGw1hELbL6IQVGom3G9KMyrF6clnV_ILlYvMs1yvCYui2-a49yUCGYX/pubhtml?gid=1058542272&single=true'
  for (const elem of [iframe, iframe.parentElement as HTMLElement]) {
    elem.style.display = 'block'
  }
}

function getTime (element: Element): number {
  const now = new Date()
  const day = parseInt(element.getAttribute('day') ?? '', 10)
  const hour = parseInt(element.getAttribute('hour') ?? '', 10)
  const resultDate = new Date()
  resultDate.setUTCHours(hour, 0, 0, 0)
  const currentDayUTC = resultDate.getUTCDay()
  const daysToAdd = (day - currentDayUTC + 7) % 7
  resultDate.setUTCDate(resultDate.getUTCDate() + daysToAdd)
  if (resultDate.getTime() < now.getTime()) {
    resultDate.setUTCDate(resultDate.getUTCDate() + 7)
  }
  return resultDate.getTime()
}

function insertLocalTime (element: Element): void {
  element.innerHTML = formatter.format(getTime(element))
}
