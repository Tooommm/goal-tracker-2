import { differenceInCalendarDays, formatISO } from 'date-fns'

const FORMATTERS = {
  full: new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  medium: new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
}

const SPECIAL_FORMATS = ['Aujourd’hui', 'Hier', 'Avant-hier']

export function formatDate(date, format, { refDate = new Date() } = {}) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (typeof refDate === 'string') {
    refDate = new Date(refDate)
  }
  if (format) {
    return FORMATTERS[format].format(date)
  }
  const diff = differenceInCalendarDays(refDate, date)
  return SPECIAL_FORMATS[diff] || FORMATTERS.full.format(date)
}

export function getDayCounts(todaysProgress, goals) {
  let [totalProgress, totalTarget] = [0, 0]

  for (const { id, target } of goals) {
    totalProgress += todaysProgress[id] || 0
    totalTarget += target
  }

  return { totalProgress, totalTarget }
}

export function isoDate(date) {
  return formatISO(date, { representation: 'date' })
}
