"use client";
import { Bell, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/app/assets/starbucks/tea-amor-logo.png"

export default function Header() {
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 bg-white p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
                <div className="flex items-center ">
                    <Image
                        width={80}
                        src={logo}
                        alt="Logo"
                        // className="h-8 w-8 rounded-full"
                    />
                    {/* <span className="text-lg font-bold">Foodie</span>    */}
                </div>
                {/* <span className="text-[20px] font-bold text-[#D4AF37]">Tea Amor</span> */}
            </div>
            <div className="flex items-center gap-4">
                <Bell className="h-5 w-5 text-gray-600" />
                <Search
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    onClick={() => router.push("/search-orders")}
                />
                <User
                    className="h-5 w-5 text-gray-600 cursor-pointer"
                    onClick={() => router.push("/user")}
                />
            </div>
        </header>
    );
}
