import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Truck } from "lucide-react"
import type { Order } from "@/app/settings/page"

interface OrderDetailsPanelProps {
  selectedOrder: Order
  getStatusColor: (status: string) => string
}

export function OrderDetailsPanel({ selectedOrder, getStatusColor }: OrderDetailsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Order Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{selectedOrder.id}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Placed on {selectedOrder.date}</p>
            </div>
            <Badge className={getStatusColor(selectedOrder.status)} variant="secondary">
              {selectedOrder.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Total Amount</p>
              <p className="text-lg font-semibold">{selectedOrder.amount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Items</p>
              <p className="text-lg font-semibold">{selectedOrder.items}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <p className="font-medium">Delivery Address</p>
              <p className="text-sm text-gray-600">{selectedOrder.deliveryAddress}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <p className="font-medium">Estimated Delivery</p>
              <p className="text-sm text-gray-600">{selectedOrder.estimatedDelivery}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Truck className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <p className="font-medium">Tracking Number</p>
              <p className="text-sm text-gray-600">{selectedOrder.trackingNumber}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {selectedOrder.products.map((product, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div
                  className="w-12 h-12 bg-white rounded-lg overflow-hidden"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
