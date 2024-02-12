'use client'
import { SWRConfig } from 'swr'

export function SWRProvider({
  children,
  fallback,
}: {
  children: React.ReactNode
  fallback?: { [key: string]: any }
}) {
  return <SWRConfig value={{ fallback, suspense: true }}>{children}</SWRConfig>
}
