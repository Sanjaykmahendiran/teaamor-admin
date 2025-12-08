"use client";
import { Bell, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
                <div className="flex items-center mr-2">
                    <div className="h-5 w-5 bg-orange-500 rounded-full opacity-70"></div>
                    <div className="h-5 w-5 bg-orange-400 rounded-full -ml-2"></div>
                </div>
                <span className="font-medium">Online</span>
            </div>
            <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-gray-600" />
                <Search
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    onClick={() => router.push("/search-orders")}
                />
            </div>
        </header>
    );
}
