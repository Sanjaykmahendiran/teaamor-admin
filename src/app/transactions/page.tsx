"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    Download,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Calendar,
    CreditCard,
    User,
    RefreshCw
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import {
    ADMIN_TRANSACTION_HISTORY,
    PLAN_PERFORMANCE,
    type TransactionRecord
} from "@/data/membership-admin-data";

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState(ADMIN_TRANSACTION_HISTORY);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending" | "failed" | "refunded">("all");
    const [selectedTransaction, setSelectedTransaction] = useState<TransactionRecord | null>(null);

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.memberEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.planName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            transaction.paymentId.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const totalRevenue = transactions
        .filter(t => t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0);

    const pendingAmount = transactions
        .filter(t => t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0);

    const completedCount = transactions.filter(t => t.status === "completed").length;
    const pendingCount = transactions.filter(t => t.status === "pending").length;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-700";
            case "pending":
                return "bg-yellow-100 text-yellow-700";
            case "failed":
                return "bg-red-100 text-red-700";
            case "refunded":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "failed":
                return <XCircle className="h-4 w-4" />;
            case "refunded":
                return <RefreshCw className="h-4 w-4" />;
            default:
                return <AlertCircle className="h-4 w-4" />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 pb-20 overflow-y-auto">
                {/* HEADER */}
                <div className="px-4 pt-6 pb-4">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Transactions
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Track membership payments and revenue
                    </p>
                </div>

                {/* REVENUE STATS */}
                <section className="px-4 mb-6">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 shadow-lg text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-5 w-5" />
                                <p className="text-xs font-medium opacity-90">Total Revenue</p>
                            </div>
                            <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                            <p className="text-xs opacity-80 mt-1">{completedCount} completed</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 shadow-lg text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="h-5 w-5" />
                                <p className="text-xs font-medium opacity-90">Pending</p>
                            </div>
                            <p className="text-3xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                            <p className="text-xs opacity-80 mt-1">{pendingCount} transactions</p>
                        </div>
                    </div>

                    {/* Plan Wise Revenue */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Revenue by Plan</h3>
                        <div className="space-y-3">
                            {PLAN_PERFORMANCE.map((plan) => (
                                <div key={plan.planId} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-900">{plan.planName}</span>
                                            <span className="text-sm font-bold text-gray-900">₹{plan.totalRevenue.toLocaleString()}</span>
                                        </div>
                                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#D4AF37] rounded-full transition-all"
                                                style={{
                                                    width: `${(plan.totalRevenue / totalRevenue) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                            placeholder="Search by member, plan, or payment ID..."
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
                            onClick={() => setFilterStatus("completed")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "completed"
                                    ? "bg-green-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            Completed
                        </button>
                        <button
                            onClick={() => setFilterStatus("pending")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "pending"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <Clock className="h-4 w-4" />
                            Pending
                        </button>
                        <button
                            onClick={() => setFilterStatus("failed")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "failed"
                                    ? "bg-red-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <XCircle className="h-4 w-4" />
                            Failed
                        </button>
                        <button
                            onClick={() => setFilterStatus("refunded")}
                            className={clsx(
                                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2",
                                filterStatus === "refunded"
                                    ? "bg-blue-600 text-white"
                                    : "bg-white text-gray-700 border border-gray-200"
                            )}
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refunded
                        </button>
                    </div>
                </section>

                {/* TRANSACTIONS LIST */}
                <section className="px-4 space-y-3">
                    {filteredTransactions.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center">
                            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-600">No transactions found</p>
                        </div>
                    ) : (
                        filteredTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                {/* MAIN INFO */}
                                <div className="p-4">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="flex-1 min-w-0">
                                            {/* Plan & Amount */}
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-gray-900 truncate mb-1">
                                                        {transaction.planName}
                                                    </h3>
                                                    <div className="flex items-center gap-2">
                                                        <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                                                            {transaction.planName}
                                                        </Badge>
                                                        <Badge className={clsx("text-xs flex items-center gap-1", getStatusColor(transaction.status))}>
                                                            {getStatusIcon(transaction.status)}
                                                            {transaction.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-3 flex-shrink-0">
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        ₹{transaction.amount}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Member Info */}
                                            <div className="grid grid-cols-2 gap-2 mb-3">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <User className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{transaction.memberName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <CreditCard className="h-4 w-4 flex-shrink-0" />
                                                    <span className="truncate">{transaction.paymentMethod}</span>
                                                </div>
                                            </div>

                                            {/* Date & Payment ID */}
                                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span className="whitespace-nowrap">{transaction.date} · {transaction.time}</span>
                                                </div>
                                            </div>

                                            {/* Payment ID */}
                                            <div className="mt-2 bg-gray-50 rounded-lg p-2">
                                                <p className="text-xs text-gray-500">Payment ID</p>
                                                <p className="text-xs font-mono text-gray-900">{transaction.paymentId}</p>
                                            </div>

                                            {/* Refund Reason */}
                                            {transaction.refundReason && (
                                                <div className="mt-2 bg-blue-50 rounded-lg p-2">
                                                    <p className="text-xs text-blue-900">
                                                        <strong>Refund Reason:</strong> {transaction.refundReason}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                {transaction.status === "pending" && (
                                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 rounded-lg"
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            size="sm"
                                            className="flex-1 bg-green-600 hover:bg-green-700 rounded-lg"
                                        >
                                            <CheckCircle2 className="h-4 w-4 mr-2" />
                                            Confirm
                                        </Button>
                                    </div>
                                )}

                                {transaction.status === "completed" && (
                                    <div className="p-3 bg-gray-50 border-t border-gray-100 flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 rounded-lg"
                                        >
                                            View Receipt
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="flex-1 text-blue-600 hover:text-blue-700 rounded-lg"
                                        >
                                            <RefreshCw className="h-4 w-4 mr-2" />
                                            Refund
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
                        Export Financial Report
                    </Button>
                </section>
            </div>

            <Footer />
        </div>
    );
}
