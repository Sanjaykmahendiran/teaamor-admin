"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type React from "react"

interface SupportFormPanelProps {
    supportForm: {
        name: string
        email: string
        subject: string
        message: string
    }
    setSupportForm: React.Dispatch<
        React.SetStateAction<{
            name: string
            email: string
            subject: string
            message: string
        }>
    >
    handleSupportSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function SupportFormPanel({ supportForm, setSupportForm, handleSupportSubmit }: SupportFormPanelProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Submit a Support Query</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSupportSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="support-name" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <Input
                                id="support-name"
                                value={supportForm.name}
                                onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-1">
                                Your Email
                            </label>
                            <Input
                                id="support-email"
                                type="email"
                                value={supportForm.email}
                                onChange={(e) => setSupportForm({ ...supportForm, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="support-subject" className="block text-sm font-medium text-gray-700 mb-1">
                                Subject
                            </label>
                            <Input
                                id="support-subject"
                                value={supportForm.subject}
                                onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                            </label>
                            <Textarea
                                id="support-message"
                                value={supportForm.message}
                                onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                                rows={5}
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                            Submit Query
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
