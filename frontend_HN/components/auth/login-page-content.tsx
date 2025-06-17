"use client"

import Image from "next/image"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LoginForm } from "@/components/auth/login-form"
import { useSearchParams } from "next/navigation"

export function LoginPageContent() {
  const searchParams = useSearchParams()
  const interfaceType = searchParams?.get("interface") || undefined

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/auth-bg2.jpg"
            width={1280}
            height={843}
            alt="Authentication background"
            className="block dark:hidden object-cover w-full h-full opacity-20"
          />
          <Image
            src="/auth-bg-dark.jpg"
            width={1280}
            height={843}
            alt="Authentication background"
            className="hidden dark:block object-cover w-full h-full opacity-20"
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Shield className="mr-2 h-6 w-6" /> HoneyNet
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "This platform has revolutionized how we detect and respond to cyber threats. The real-time monitoring and
              automated alerts have made our network security more robust than ever."
            </p>
            <footer className="text-sm">YAHYA HUSSAIN, Chief Security Officer</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {interfaceType === "cockpit" ? "Cockpit Access" : "Dashboard Access"}
            </h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>
          <LoginForm interfaceType={interfaceType} />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className={interfaceType === "cockpit" ? "border-purple-500/50" : "border-cyan-500/50"}
          >
            <Link href={`/auth/register${interfaceType ? `?interface=${interfaceType}` : ""}`}>
              Create a new account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 