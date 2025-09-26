'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

/**
 * 面包屑导航组件
 * 提供页面层级导航，改善用户体验和SEO内部链接结构
 */
export function Breadcrumb() {
  const pathname = usePathname()

  // 根据路径生成面包屑项目
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    if (pathname === '/calculator') {
      items.push({ label: 'Concrete Calculator', href: '/calculator' })
    } else if (pathname === '/about') {
      items.push({ label: 'About', href: '/about' })
    }

    return items
  }

  const breadcrumbItems = getBreadcrumbItems()

  // 首页不显示面包屑
  if (pathname === '/') {
    return null
  }

  return (
    <nav className="bg-background border-b border-border py-3" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1
            
            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
                )}
                {index === 0 && (
                  <Home className="h-4 w-4 text-muted-foreground mr-2" />
                )}
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}