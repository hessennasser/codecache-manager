"use client"

import React, { useState } from 'react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Code, Home, Plus, User, Search, Menu, X } from "lucide-react"
import { ThemeSwitcher } from "@/components/shared/Header/ThemeSwitcher"
import { UserNav } from "./UserNav"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/snippets", label: "Snippets", icon: Code },
    { href: "/create", label: "Create", icon: Plus },
    { href: "/profile", label: "Profile", icon: User },
  ]

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-gray-100",
            pathname === item.href
              ? "text-gray-100"
              : "text-gray-300",
            mobile && "py-2"
          )}
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </Link>
      ))}
    </>
  )

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-colors duration-200 container",
        className
      )}
      {...props}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary text-white" />
            <span className="hidden font-bold text-primary sm:inline-block text-white">
              codeCache
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLinks />
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent dark:hover:bg-gray-700 focus-visible:bg-transparent dark:focus-visible:bg-gray-800 focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5 text-primary dark:text-white" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 dark:bg-gray-800">
            <Link
              href="/"
              className="flex items-center space-x-2 text-primary dark:text-white"
            >
              <Code className="h-6 w-6" />
              <span className="font-bold">codeCache</span>
            </Link>
            <nav className="mt-6 flex flex-col space-y-3">
              <NavLinks mobile />
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="relative h-8 w-full justify-start text-sm font-normal dark:border-gray-600 md:w-64 md:pr-12"
                >
                  <Search className="mr-2 h-4 w-4 text-primary dark:text-white" />
                  <span className="hidden lg:inline-flex text-primary dark:text-gray-200">Search Snippets...</span>
                  <span className="inline-flex lg:hidden text-muted-foreground dark:text-gray-400">Search...</span>
                  <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted dark:bg-gray-700 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] dark:bg-gray-900">
                <DialogHeader>
                  <DialogTitle className="dark:text-white">Search</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="search"
                      placeholder="Search documentation..."
                      className="col-span-4 dark:bg-gray-800 dark:text-white"
                      autoFocus
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <nav className="flex items-center gap-2">
            <ThemeSwitcher />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
