"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, Search, User, LogOut, UserCircle, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/starbucks/tea-amor-logo.png"
import { logout } from "@/lib/auth";

export default function Header() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isShopOpen, setIsShopOpen] = useState(true);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleProfileClick = () => {
        setIsMenuOpen(false);
        router.push("/profile");
    };

    const handleLogoutClick = () => {
        setIsMenuOpen(false);
        logout();
        router.push("/");
    };

    return (
        <header className="sticky top-0 z-50 bg-white p-4 border-b flex items-center justify-between">
            <div className="flex items-center">
                <div className="flex items-center ">
                    <Image
                        width={80}
                        src={logo}
                        alt="Logo"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                {/* Shop Status Toggle */}
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium ${isShopOpen ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {isShopOpen ? 'Open' : 'Closed'}
                    </span>
                    <button
                        onClick={() => setIsShopOpen(!isShopOpen)}
                        className={`relative w-11 h-6 rounded-full transition-colors ${isShopOpen ? 'bg-primary' : 'bg-gray-300'
                            }`}
                    >
                        <div
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isShopOpen ? 'translate-x-5' : 'translate-x-0'
                                }`}
                        />
                    </button>
                </div>
                <div className="h-5 w-px bg-gray-300" />
                <Bell className="h-5 w-5 text-gray-600" />
                <div className="relative" ref={menuRef}>
                    <User
                        className="h-5 w-5 text-gray-600 cursor-pointer hover:text-primary transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    />

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                            <button
                                onClick={handleProfileClick}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 transition-colors flex items-center gap-2"
                            >
                                <UserCircle className="h-4 w-4" />
                                Profile
                            </button>
                            <div className="border-t border-slate-200 my-1"></div>
                            <button
                                onClick={handleLogoutClick}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </header>
    );
}
