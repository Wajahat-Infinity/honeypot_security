import type { Metadata } from "next"
import { LoginPageContent } from "@/components/auth/login-page-content"

export const metadata: Metadata = {
  title: "Login - Cybersecurity Dashboard",
  description: "Login to your account",
}

export default function LoginPage() {
  return <LoginPageContent />
}
