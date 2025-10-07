'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calculator, Home, Info } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Concrete Calculator', href: '/calculator', icon: Calculator },
  { name: 'About', href: '/about', icon: Info },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Calculator className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                Concrete Calculator
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-primary text-primary font-medium'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}