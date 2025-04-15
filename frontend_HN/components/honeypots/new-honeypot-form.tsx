"use client"

import type React from "react"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { useForm, FormProvider } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

interface HoneypotFormData {
  name: string
  type: string
  port: number
}

export function NewHoneypotForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const methods = useForm<HoneypotFormData>()

  async function onSubmit(data: HoneypotFormData) {
    setIsLoading(true)

    try {
      // TODO: Add API call to create honeypot
      console.log("Form data:", data)
      
      toast({
        title: "Success",
        description: "New honeypot has been created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create honeypot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={methods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Web Server Honeypot" {...field} />
                </FormControl>
                <FormDescription>A unique name for your honeypot instance</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">HTTP Server</SelectItem>
                    <SelectItem value="ftp">FTP Server</SelectItem>
                    <SelectItem value="ssh">SSH Server</SelectItem>
                    <SelectItem value="smtp">SMTP Server</SelectItem>
                    <SelectItem value="mysql">MySQL Server</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The type of service this honeypot will emulate</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="80" {...field} />
                </FormControl>
                <FormDescription>The port number this honeypot will listen on</FormDescription>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Honeypot
        </Button>
      </form>
    </FormProvider>
  )
}
