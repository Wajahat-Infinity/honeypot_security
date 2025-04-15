"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

export function NewReportForm() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [date, setDate] = useState<Date>()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Report generated",
        description: "Your report has been generated successfully.",
      })
    }, 1500)
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Name</FormLabel>
              <FormControl>
                <Input placeholder="Monthly Security Summary" {...field} />
              </FormControl>
              <FormDescription>A descriptive name for your report</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Type</FormLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Executive Summary</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="threats">Threat Intelligence</SelectItem>
                  <SelectItem value="compliance">Compliance Report</SelectItem>
                  <SelectItem value="incidents">Incident Response</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The type of report to generate</FormDescription>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={`w-full pl-3 text-left font-normal ${!date && "text-muted-foreground"}`}
                      >
                        {date ? format(date, "PPP") : "Pick a date"}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormDescription>The date range for the report data</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            name="format"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Export Format</FormLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                    <SelectItem value="json">JSON Data</SelectItem>
                    <SelectItem value="html">HTML Report</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The format of the exported report</FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-2">
          <FormLabel>Include Sections</FormLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="section-summary" defaultChecked />
              <label
                htmlFor="section-summary"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Executive Summary
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="section-threats" defaultChecked />
              <label
                htmlFor="section-threats"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Threat Analysis
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="section-incidents" defaultChecked />
              <label
                htmlFor="section-incidents"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Security Incidents
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="section-recommendations" defaultChecked />
              <label
                htmlFor="section-recommendations"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Recommendations
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="section-metrics" defaultChecked />
              <label
                htmlFor="section-metrics"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Security Metrics
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="section-compliance" />
              <label
                htmlFor="section-compliance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Compliance Status
              </label>
            </div>
          </div>
        </div>
      </div>
      <Button disabled={isLoading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-black">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Report...
          </>
        ) : (
          <>Generate Report</>
        )}
      </Button>
    </form>
  )
}
