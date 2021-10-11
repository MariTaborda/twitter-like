import {format} from 'date-fns'

export const DATE_FORMAT = {
  iso: 'yyyy-MM-dd',
  tweet: 'MMM d, yyyy hh:mm:ss aa',
}

export const formatDate = (date: Date = new Date(), toFormat: string = DATE_FORMAT.iso): string => {
  return format(date, toFormat)
}