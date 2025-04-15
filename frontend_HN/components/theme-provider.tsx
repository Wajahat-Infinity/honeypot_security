"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }, [])

  return (
    <NextThemesProvider forcedTheme="dark" {...props}>
      {children}
    </NextThemesProvider>
  )
}
