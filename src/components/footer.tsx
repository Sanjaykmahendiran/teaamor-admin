"use client";

import { menu } from "framer-motion/client";
import { Home, Menu, User, Monitor, ClipboardList } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname(); // Get current path

    const links = [
        { href: "/dashboard", icon: Home, label: "Home" },
        { href: "/ordermenu", icon: ClipboardList, label: "orders" },
        { href: "/menu-interface", icon: Menu, label: "menu" },  // Replace "#" with actual path
        { href: "/pos", icon: Monitor, label: "POS" },
        // { href: "/account", icon: User, label: "Account" },
    ];

    return (
        <footer className="sticky bottom-0 z-50 bg-white border-t py-2">
            <div className="flex justify-around items-center">
                {links.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link key={href} href={href} className="flex flex-col items-center">
                            <Icon className={`h-5 w-5 ${isActive ? "text-[#917c3d]" : "text-gray-400"}`} />
                            <span className={`text-xs ${isActive ? "text-[#917c3d]" : "text-gray-400"}`}>
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </footer>
    );
}
