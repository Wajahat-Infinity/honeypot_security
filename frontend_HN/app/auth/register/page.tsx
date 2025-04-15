import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Register - Cybersecurity Dashboard",
  description: "Create a new account",
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get the interface parameter from the URL
  const interfaceType = searchParams.interface as string | undefined

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900">
          <Image
            src="/auth-bg.jpg"
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
              "Security is our top priority. Only authorized administrators can create new user accounts."
            </p>
            <footer className="text-sm">HoneyNet Security Team</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span>Registration Restricted</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Self-registration is not available. New user accounts can only be created by system administrators.
              </p>
              <p className="text-sm">Please contact your system administrator to request an account.</p>
              <Button asChild variant="outline" className="w-full">
                <Link href={`/auth/login${interfaceType ? `?interface=${interfaceType}` : ""}`}>Return to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
