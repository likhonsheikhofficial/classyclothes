import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function generateSlug(url: string) {
  try {
    const hostname = new URL(url).hostname
    return hostname
      .replace(/^www\./, '')
      .replace(/\./g, '-')
      .toLowerCase()
  } catch (error) {
    // If URL parsing fails, just sanitize the string
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\./g, '-')
      .replace(/[^a-z0-9-]/gi, '-')
      .toLowerCase()
  }
}

export function truncate(str: string, length: number) {
  if (!str) return ''
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getDomainFromUrl(url: string) {
  try {
    const hostname = new URL(url).hostname
    return hostname.replace(/^www\./, '')
  } catch (error) {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  }
}

