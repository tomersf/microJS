import { type ClassValue, clsx } from "clsx"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getAllHeaders(headers: ReadonlyHeaders) {
  let _headers: Record<string, string> = {}
  for (const [key, value] of headers.entries()) {
    _headers[key] = value
  }
  return _headers
}


export function redirectAndRefresh(router: AppRouterInstance, url: string) {
  router.push(url)
  router.refresh()
}