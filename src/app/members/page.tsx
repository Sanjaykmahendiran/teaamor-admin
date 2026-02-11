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
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-service";
import { motion } from "framer-motion";

export default function MembersPage() {
    const router = useRouter();
    const [members, setMembers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "expired">("all");
    const [selectedMember, setSelectedMember] = useState<any | null>(null);

    const loadMembers = async () => {
        setLoading(true);
        try {
            const data = await api.members.list();
            const list = Array.isArray(data) ? data : ((data as any).data || []);

            // Map API model to UI model
            const mappedMembers = list.map((m: any) => {
                const membership = m.membership || {};
                const customer = m.customer || {};
                const plan = m.plan || {};

                const total = parseInt(membership.total_tea_count) || 0;
                const remaining = parseInt(membership.remaining_tea_count) || 0;

                return {
                    id: membership.customer_membership_id || m.id,
                    name: customer.name || m.name,
                    email: customer.email || m.email,
                    phone: customer.mobilenumber || customer.phone || m.phone,
                    planId: membership.plan_id || m.plan_id,
                    planName: plan.plan_name || m.plan_name,
                    totalTeas: total,
                    usedTeas: total - remaining,
                    remainingTeas: remaining,
                    dailyLimit: parseInt(membership.daily_limit) || 1,
                    status: membership.status || m.status,
                    categoryName: plan.plan_name || m.category_name,
                    purchasedOn: membership.start_date || m.purchased_on,
                    validTill: membership.end_date || m.valid_till,
                    lastRedemption: membership.last_redemption_date || m.last_redemption,
                    redeemedToday: membership.redeemed_today === true || membership.redeemed_today === 1
                };
            });

            setMembers(mappedMembers);
        } catch (error) {
            console.error("Failed to load members:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMembers();
    }, []);

    const filteredMembers = members.filter((member) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
            (member.name?.toLowerCase() || "").includes(query) ||
            (member.email?.toLowerCase() || "").includes(query) ||
            (member.phone || "").includes(query) ||
            (member.categoryName?.toLowerCase() || "").includes(query);

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
                <section className="px-4 mb-6 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none shadow-sm"
                        />
                    </div>

                    {/* Tabs - Premium Scrollable Design */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                        {[
                            { label: "All Members", value: "all" },
                            { label: "Active", value: "active" },
                            { label: "Expired", value: "expired" }
                        ].map((tab) => {
                            const isActive = filterStatus === tab.value;
                            return (
                                <button
                                    key={tab.value}
                                    onClick={() => setFilterStatus(tab.value as any)}
                                    className={`relative px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 flex-shrink-0
                                        ${isActive ? 'text-white bg-[#2D3142] shadow-md' : 'text-gray-500 hover:text-gray-900 bg-white border border-gray-100 shadow-sm'}`}
                                >
                                    <span className="relative z-10">{tab.label}</span>
                                </button>
                            );
                        })}
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
                        filteredMembers.map((member, index) => (
                            <div
                                key={member.id || index}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                {/* MEMBER HEADER */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                            {/* Avatar */}
                                            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                {member.name?.charAt(0) || "U"}
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
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                                                        {member.planName}
                                                    </Badge>
                                                    {member.categoryName && (
                                                        <Badge className="bg-blue-100 text-blue-700 text-xs">
                                                            {member.categoryName}
                                                        </Badge>
                                                    )}
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
                                        value={member.totalTeas > 0 ? (member.usedTeas / member.totalTeas) * 100 : 0}
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
                                    {selectedMember.name?.charAt(0) || "U"}
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
                                    value={selectedMember.totalTeas > 0 ? (selectedMember.usedTeas / selectedMember.totalTeas) * 100 : 0}
                                    className="h-2 bg-white/30 mb-2"
                                />
                                <p className="text-xs text-white/80">
                                    {(selectedMember.usedTeas || 0)} of {(selectedMember.totalTeas || 0)} teas used
                                </p>
                            </div>

                            {/* Redemptions (Mock for now as per original unless API provided) */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Recent Redemptions</h4>
                                <div className="space-y-2">
                                    {/* This section would normally fetch redemptions for the selected member */}
                                    {/* In the original it used getRedemptionsByMember from mock data */}
                                    <p className="text-sm text-gray-500 italic">Redemption history will be loaded here.</p>
                                </div>
                            </div>

                            {/* Transactions (Mock for now as per original unless API provided) */}
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Transactions</h4>
                                <div className="space-y-2">
                                    {/* In the original it used getTransactionsByMember from mock data */}
                                    <p className="text-sm text-gray-500 italic">Transaction history will be loaded here.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
