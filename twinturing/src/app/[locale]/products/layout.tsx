import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Collections',
  description: 'Explore our full range of premium lab-grown diamond jewelry. Rings, necklaces, and earrings.',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
