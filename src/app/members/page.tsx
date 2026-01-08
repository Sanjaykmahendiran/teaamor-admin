"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Search,
    Filter,
    Download,
    MoreVertical,
    User,
    Phone,
    Mail,
    Calendar,
    Check,
    X,
    AlertCircle,
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import {
    ACTIVE_MEMBERS,
    getMemberById,
    getRedemptionsByMember,
    getTransactionsByMember,
    type ActiveMember
} from "@/data/membership-admin-data";
import { useRouter } from "next/navigation";

export default function MembersPage() {
    const router = useRouter();
    const [members, setMembers] = useState(ACTIVE_MEMBERS);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");
    const [selectedMember, setSelectedMember] = useState<ActiveMember | null>(null);

    const filteredMembers = members.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.phone.includes(searchQuery);

        const matchesFilter = filterStatus === "all" || member.status === filterStatus;

        return matchesSearch && matchesFilter;
    });



    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-700";
            case "expired":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 pb-20">
                {/* HEADER */}
                <div className="px-4 flex items-center gap-2 pt-6 pb-4">
                    <Button
                        className="bg-primary hover:bg-primary/90 text-white"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Active Members
                        </h1>
                        <p className="text-sm text-gray-600">
                            Manage membership subscriptions
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <section className="px-4 mb-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                            <p className="text-xs text-gray-600 mb-1">Total</p>
                            <p className="text-xl font-bold text-gray-900">{members.length}</p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                            <p className="text-xs text-gray-600 mb-1">Active</p>
                            <p className="text-xl font-bold text-green-600">
                                {members.filter(m => m.status === "active").length}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-3 shadow-sm">
                            <p className="text-xs text-gray-600 mb-1">Expired</p>
                            <p className="text-xl font-bold text-red-600">
                                {members.filter(m => m.status === "expired").length}
                            </p>
                        </div>
                    </div>
                </section>

                {/* SEARCH & FILTERS */}
                <section className="px-4 mb-4 space-y-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-gray-200">
                        <div className="flex gap-6 justify-between">
                            <button
                                onClick={() => setFilterStatus("all")}
                                className={clsx(
                                    "pb-3 px-1 text-sm font-medium transition-colors relative",
                                    filterStatus === "all"
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                All Members
                                {filterStatus === "all" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setFilterStatus("active")}
                                className={clsx(
                                    "pb-3 px-1 text-sm font-medium transition-colors relative",
                                    filterStatus === "active"
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                Active
                                {filterStatus === "active" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                            </button>
                            <button
                                onClick={() => setFilterStatus("expired")}
                                className={clsx(
                                    "pb-3 px-1 text-sm font-medium transition-colors relative",
                                    filterStatus === "expired"
                                        ? "text-primary"
                                        : "text-gray-600 hover:text-gray-900"
                                )}
                            >
                                Expired
                                {filterStatus === "expired" && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                                )}
                            </button>
                        </div>
                    </div>
                </section>

                {/* MEMBERS LIST */}
                <section className="px-4 space-y-3">
                    {filteredMembers.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center">
                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No members found</p>
                        </div>
                    ) : (
                        filteredMembers.map((member) => (
                            <div
                                key={member.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                {/* MEMBER HEADER */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            {/* Avatar */}
                                            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {member.name.charAt(0)}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-gray-900 truncate">
                                                        {member.name}
                                                    </h3>
                                                    <Badge className={clsx("text-xs", getStatusBadge(member.status))}>
                                                        {member.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                                    <span className="flex items-center gap-1 flex-shrink-0">
                                                        <Phone className="h-3 w-3" />
                                                        {member.phone}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                                                        {member.planName}
                                                    </Badge>
                                                    {member.redeemedToday && (
                                                        <Badge className="bg-green-100 text-green-700 text-xs">
                                                            Redeemed Today
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/* MEMBERSHIP STATS */}
                                <div className="p-4 bg-gray-50">
                                    <div className="grid grid-cols-3 gap-4 mb-3">
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Total Teas</p>
                                            <p className="text-lg font-bold text-gray-900">{member.totalTeas}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Used</p>
                                            <p className="text-lg font-bold text-orange-600">{member.usedTeas}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-600 mb-1">Remaining</p>
                                            <p className="text-lg font-bold text-green-600">{member.remainingTeas}</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <Progress
                                        value={(member.usedTeas / member.totalTeas) * 100}
                                        className="h-2 mb-3"
                                    />

                                    {/* Dates */}
                                    <div className="flex items-center justify-between text-xs text-gray-600">
                                        <span>Purchased: {member.purchasedOn}</span>
                                        <span>Valid till: {member.validTill}</span>
                                    </div>
                                </div>

                                {/* QUICK ACTIONS */}
                                <div className="p-3 border-t border-gray-100 flex justify-between gap-2">
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex-1 rounded-lg"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                    {/* Actions */}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => setSelectedMember(member)}
                                        className="rounded-lg flex-1"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </section>
            </div>

            <Footer />

            {/* MEMBER DETAILS MODAL */}
            {selectedMember && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Member Details</h2>
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Member Info */}
                        <div className="space-y-6">
                            {/* Profile */}
                            <div className="flex items-start gap-4">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
                                    {selectedMember.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{selectedMember.name}</h3>
                                    <p className="text-sm text-gray-600">{selectedMember.email}</p>
                                    <p className="text-sm text-gray-600">{selectedMember.phone}</p>
                                </div>
                            </div>

                            {/* Membership Details */}
                            <div className="bg-gradient-to-br from-[#D4AF37] to-[#D4AF37]/80 rounded-2xl p-4 text-white">
                                <h4 className="font-semibold mb-3">{selectedMember.planName}</h4>
                                <div className="grid grid-cols-2 gap-4 mb-3">
                                    <div>
                                        <p className="text-xs text-white/80 mb-1">Remaining Teas</p>
                                        <p className="text-2xl font-bold">{selectedMember.remainingTeas}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/80 mb-1">Daily Limit</p>
                                        <p className="text-2xl font-bold">{selectedMember.dailyLimit}</p>
                                    </div>
                                </div>
                                <Progress
                                    value={(selectedMember.usedTeas / selectedMember.totalTeas) * 100}
                                    className="h-2 bg-white/30 mb-2"
                                />
                                <p className="text-xs text-white/80">
                                    {selectedMember.usedTeas} of {selectedMember.totalTeas} teas used
                                </p>
                            </div>

                            {/* Redemptions */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Recent Redemptions</h4>
                                <div className="space-y-2">
                                    {getRedemptionsByMember(selectedMember.id).slice(0, 3).map((redemption) => (
                                        <div key={redemption.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{redemption.teaType}</p>
                                                <p className="text-xs text-gray-500">{redemption.store}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-medium text-gray-900">{redemption.date}</p>
                                                <p className="text-xs text-gray-500">{redemption.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Transactions */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Transactions</h4>
                                <div className="space-y-2">
                                    {getTransactionsByMember(selectedMember.id).map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{transaction.planName}</p>
                                                <p className="text-xs text-gray-500">{transaction.date} · {transaction.paymentMethod}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-gray-900">₹{transaction.amount}</p>
                                                <Badge className={clsx(
                                                    "text-xs",
                                                    transaction.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                )}>
                                                    {transaction.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
