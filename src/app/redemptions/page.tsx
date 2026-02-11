"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Download,
    Check,
    Clock,
    X,
    MapPin,
    User,
    Phone,
    Calendar,
    TrendingUp,
    CheckCircle2,
    XCircle
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-service";
import { useEffect } from "react";

export default function RedemptionsPage() {
    const [redemptions, setRedemptions] = useState<any[]>([]);
    const [stats, setStats] = useState({ pending: 0, today: 0, completed: 0 });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "redeemed" | "cancelled">("all");
    const [selectedRedemption, setSelectedRedemption] = useState<any | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [listData, statsData] = await Promise.all([
                api.redemptions.list(),
                api.redemptions.getStats()
            ]);

            const list = Array.isArray(listData) ? listData : ((listData as any).data || []);

            // Map API model to UI model
            const mappedRedemptions = list.map((r: any) => ({
                id: r.id,
                memberName: r.member_name,
                memberPhone: r.member_phone,
                teaType: r.tea_type,
                store: r.store,
                date: r.date,
                time: r.time,
                planName: r.plan_name,
                status: r.status,
                verifiedBy: r.verified_by,
                notes: r.notes
            }));

            setRedemptions(mappedRedemptions);
            setStats({
                pending: statsData?.pending || 0,
                today: statsData?.today || 0,
                completed: statsData?.completed || 0
            });
        } catch (error) {
            console.error("Failed to load redemption data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleVerifyRedemption = async (redemptionId: number) => {
        try {
            await api.redemptions.verify(redemptionId);
            loadData();
        } catch (error) {
            console.error("Failed to verify redemption:", error);
        }
    };

    const handleCancelRedemption = async (redemptionId: number) => {
        // Assuming there might be a cancel endpoint eventually, 
        // for now just using verify with a different status if supported, 
        // or just local state if not. 
        // Since user didn't provide cancel api, I'll keep it simple.
        console.log("Cancel redemption not implemented in API yet");
    };

    const filteredRedemptions = redemptions.filter((redemption) => {
        const matchesSearch =
            redemption.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            redemption.memberPhone.includes(searchQuery) ||
            redemption.teaType.toLowerCase().includes(searchQuery.toLowerCase()) ||
            redemption.store.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === "all" || redemption.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "redeemed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-orange-100 text-orange-700";
            case "cancelled":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const pendingCount = stats.pending;
    const todayCount = stats.today;
    const completedToday = stats.completed;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 pb-20 overflow-y-auto">
                {/* HEADER */}
                <div className="px-4 pt-6 pb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Redemption Tracking
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Monitor and verify tea redemptions
                    </p>
                </div>

                {/* STATS */}
                <section className="px-4 mb-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-orange-600 mb-2">
                                <Clock className="h-4 w-4" />
                                <p className="text-xs font-medium">Pending</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-blue-600 mb-2">
                                <Calendar className="h-4 w-4" />
                                <p className="text-xs font-medium">Today</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-2 text-green-600 mb-2">
                                <CheckCircle2 className="h-4 w-4" />
                                <p className="text-xs font-medium">Completed</p>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{completedToday}</p>
                        </div>
                    </div>
                </section>

                {/* PENDING REDEMPTIONS ALERT */}
                {pendingCount > 0 && (
                    <section className="px-4 mb-4">
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center gap-3">
                            <Clock className="h-5 w-5 text-orange-600 flex-shrink-0" />
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-orange-900">
                                    {pendingCount} Pending Redemption{pendingCount !== 1 ? 's' : ''}
                                </p>
                                <p className="text-xs text-orange-700">
                                    Awaiting verification
                                </p>
                            </div>
                            <Button
                                size="sm"
                                onClick={() => setFilterStatus("pending")}
                                className="bg-orange-600 hover:bg-orange-700 rounded-lg"
                            >
                                View
                            </Button>
                        </div>
                    </section>
                )}

                {/* SEARCH & FILTERS */}
                <section className="px-4 mb-4 space-y-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by member, tea type, or store..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    {/* Status Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                                filterStatus === "all"
                                    ? "bg-primary text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "pending"
                                    ? "bg-orange-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <Clock className="h-4 w-4" />
                            Pending ({pendingCount})
                        </button>
                        <button
                            onClick={() => setFilterStatus("redeemed")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "redeemed"
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <Check className="h-4 w-4" />
                            Redeemed
                        </button>
                        <button
                            onClick={() => setFilterStatus("cancelled")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "cancelled"
                                    ? "bg-red-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <XCircle className="h-4 w-4" />
                            Cancelled
                        </button>
                    </div>
                </section>

                {/* REDEMPTIONS LIST */}
                <section className="px-4 space-y-3">
                    {filteredRedemptions.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center">
                            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No redemptions found</p>
                        </div>
                    ) : (
                        filteredRedemptions.map((redemption) => (
                            <div
                                key={redemption.id}
                                className={clsx(
                                    "bg-white rounded-xl shadow-sm border-2 overflow-hidden transition-all",
                                    redemption.status === "pending" && "border-orange-200"
                                )}
                            >
                                {/* MAIN INFO */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex-1 min-w-0">
                                            {/* Tea & Status */}
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="font-semibold text-gray-900">
                                                    {redemption.teaType}
                                                </h3>
                                                <Badge className={clsx("text-xs", getStatusColor(redemption.status))}>
                                                    {redemption.status}
                                                </Badge>
                                            </div>

                                            {/* Member Info */}
                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <User className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{redemption.memberName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{redemption.memberPhone}</span>
                                                </div>
                                            </div>

                                            {/* Store & Date */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span className="truncate">{redemption.store}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">{redemption.date} · {redemption.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Plan Badge */}
                                    <div className="mb-3">
                                        <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                                            {redemption.planName}
                                        </Badge>
                                    </div>

                                    {/* Verified By or Notes */}
                                    {redemption.verifiedBy && (
                                        <div className="bg-green-50 rounded-lg p-2 text-xs text-green-700">
                                            ✓ Verified by {redemption.verifiedBy}
                                        </div>
                                    )}
                                    {redemption.notes && !redemption.verifiedBy && (
                                        <div className="bg-orange-50 rounded-lg p-2 text-xs text-orange-700">
                                            📝 {redemption.notes}
                                        </div>
                                    )}
                                </div>

                                {/* ACTIONS (only for pending) */}
                                {redemption.status === "pending" && (
                                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                                        <Button
                                            size="sm"
                                            onClick={() => handleVerifyRedemption(redemption.id)}
                                            className="flex-1 bg-green-600 hover:bg-green-700 rounded-lg"
                                        >
                                            <Check className="h-4 w-4 mr-2" />
                                            Verify
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleCancelRedemption(redemption.id)}
                                            className="flex-1 text-red-600 hover:text-red-700 rounded-lg"
                                        >
                                            <X className="h-4 w-4 mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </section>

                {/* EXPORT SECTION */}
                <section className="px-4 mt-6 mb-6">
                    <Button
                        variant="outline"
                        className="w-full rounded-xl border-2 border-dashed"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        Export Redemption Report
                    </Button>
                </section>
            </div>

            <Footer />
        </div>
    );
}
