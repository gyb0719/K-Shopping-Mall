import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = "KRW"): string {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + "..."
}

export function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  const weeks = Math.floor(diff / 604800000)
  const months = Math.floor(diff / 2592000000)
  const years = Math.floor(diff / 31536000000)
  
  if (minutes < 1) return '방금'
  if (minutes < 60) return `${minutes}분`
  if (hours < 24) return `${hours}시간`
  if (days < 7) return `${days}일`
  if (weeks < 4) return `${weeks}주`
  if (months < 12) return `${months}개월`
  return `${years}년`
}