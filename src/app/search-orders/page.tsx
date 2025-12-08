"use client";

import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchOrdersPage() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);

    const handleSearch = (value: string) => {
        if (!value.trim()) return;
        setRecentSearches((prev) => {
            const newSearches = [value, ...prev.filter((item) => item !== value)];
            return newSearches.slice(0, 10); // Limit to last 10
        });
        setSearch("");
    };

    const handleClear = () => {
        setRecentSearches([]);
    };

    return (
        <div className="p-4">
            {/* Top Bar */}
            <div className="flex items-center gap-2 mb-4">
                <ArrowLeft className="h-5 w-5 cursor-pointer" onClick={() => router.back()} />
                <h2 className="font-semibold text-lg">Search Orders</h2>
            </div>

            {/* Search Input */}
            <div className="flex items-center border rounded-md px-3 py-2 mb-4">
                <SearchIcon className="h-4 w-4 text-gray-500 mr-2" />
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(search)}
                />
            </div>

            {/* Recently Search */}
            {recentSearches.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-600">Recently Search</p>
                        <button onClick={handleClear} className="text-sm text-gray-500">✕</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {recentSearches.map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 cursor-pointer"
                                onClick={() => setSearch(item)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
