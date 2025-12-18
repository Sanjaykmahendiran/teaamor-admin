"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/app/settings/page"
import type React from "react"

interface OrdersPanelProps {
  recentOrders: Order[]
  handleOrderClick: (order: Order) => void
  getStatusColor: (status: string) => string
  getStatusIcon: (status: string) => React.ReactNode
}

export function OrdersPanel({ recentOrders, handleOrderClick, getStatusColor, getStatusIcon }: OrdersPanelProps) {
  return (
    <div className="space-y-6">

        <div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg  transition-colors cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.date} • {order.items}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{order.amount}</p>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

  )
}
