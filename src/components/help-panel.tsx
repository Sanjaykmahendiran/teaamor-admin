"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, HelpCircle, ClipboardList, MessageSquare, ChevronRight, Clock } from "lucide-react"
import { ActivePanel } from "@/types/shared"

interface HelpPanelProps {
  setActivePanel: (panel: ActivePanel) => void
}

export function HelpPanel({ setActivePanel }: HelpPanelProps) {
  return (
    <div className="space-y-6" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
            <Phone className="h-5 w-5 mr-3 text-green-600" />
            Call Support: +91 1800-123-4567
          </Button>
          <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
            <Mail className="h-5 w-5 mr-3 text-blue-600" />
            Email: support@distrova.com
          </Button>
        </CardContent>
      </Card>
      {/* Help Topics */}
      <Card>
        <CardHeader>
          <CardTitle>Help Topics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="ghost" className="w-full justify-between h-12" onClick={() => setActivePanel("faq")}>
            <div className="flex items-center space-x-3">
              <HelpCircle className="h-5 w-5 text-purple-600" />
              <span>FAQs</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
          <Button variant="ghost" className="w-full justify-between h-12" onClick={() => setActivePanel("policies")}>
            <div className="flex items-center space-x-3">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <span>Policies</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-between h-12"
            onClick={() => setActivePanel("support-form")}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <span>Submit a Query</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Button>
        </CardContent>
      </Card>
      {/* Business Hours */}
      <Card>
        <CardHeader>
          <CardTitle>Support Hours</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-600" />
            <div>
              <p className="font-medium">Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-sm text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
