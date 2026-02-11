
export type ActivePanel =
    | "orders"
    | "order-details"
    | "help"
    | "faq"
    | "policies"
    | "support-form"
    | "profile"
    | "settings";

export interface Order {
    id: string;
    date: string;
    status: string;
    amount: string;
    items: string;
    deliveryAddress?: string;
    estimatedDelivery?: string;
    trackingNumber?: string;
    products?: {
        name: string;
        quantity: number;
        price: string;
        image?: string;
    }[];
}
