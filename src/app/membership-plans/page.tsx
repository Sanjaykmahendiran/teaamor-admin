"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    TrendingUp,
    Users,
    DollarSign,
    Star,
    MoreVertical,
    ArrowLeft
} from "lucide-react";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import { PLAN_PERFORMANCE } from "@/data/membership-admin-data";
import { useRouter } from "next/navigation";

interface MembershipPlan {
    id: number;
    title: string;
    description: string;
    price: number;
    teas: number;
    validity: string;
    validityDays: number;
    dailyLimit: number;
    savings: string;
    badge: string;
    featured: boolean;
    active: boolean;
    benefits: string[];
    popular?: boolean;
}

// Membership plans data
const MEMBERSHIP_PLANS: MembershipPlan[] = [
    {
        id: 1,
        title: "Monthly Tea Pass",
        price: 599,
        teas: 30,
        validity: "30 Days",
        validityDays: 30,
        badge: "Best Value",
        featured: true,
        description: "Perfect for daily tea lovers. Get 30 teas valid for 30 days.",
        dailyLimit: 1,
        benefits: [
            "30 teas in 30 days",
            "Save up to ₹151 (40% off)",
            "Priority pickup",
            "Member-only offers",
        ],
        savings: "Save ₹151",
        popular: true,
        active: true,
    },
    {
        id: 2,
        title: "Lite Tea Pass",
        price: 349,
        teas: 15,
        validity: "30 Days",
        validityDays: 30,
        badge: "Popular",
        featured: false,
        description: "Ideal for occasional tea drinkers. 15 teas over 30 days.",
        dailyLimit: 1,
        benefits: [
            "15 teas in 30 days",
            "Save up to ₹76 (22% off)",
            "Priority pickup",
            "Flexible redemption",
        ],
        savings: "Save ₹76",
        popular: true,
        active: true,
    },
    {
        id: 3,
        title: "Weekend Tea Pass",
        price: 249,
        teas: 8,
        validity: "Weekends Only",
        validityDays: 30,
        badge: "New",
        featured: false,
        description: "Weekend special! 8 teas valid only on Saturdays & Sundays.",
        dailyLimit: 1,
        benefits: [
            "8 weekend teas",
            "Save up to ₹51 (20% off)",
            "Perfect for weekends",
            "Valid for 30 days",
        ],
        savings: "Save ₹51",
        active: true,
    },
];

export default function MembershipPlansPage() {
    const router = useRouter();
    const [plans, setPlans] = useState(MEMBERSHIP_PLANS);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

    const handleToggleActive = (planId: number) => {
        setPlans(plans.map(plan =>
            plan.id === planId ? { ...plan, active: !plan.active } : plan
        ));
    };

    const handleToggleFeatured = (planId: number) => {
        setPlans(plans.map(plan =>
            plan.id === planId ? { ...plan, featured: !plan.featured } : plan
        ));
    };

    const handleDelete = (planId: number) => {
        if (confirm("Are you sure you want to delete this plan?")) {
            setPlans(plans.filter(plan => plan.id !== planId));
        }
    };

    const getPlanPerformance = (planId: number) => {
        return PLAN_PERFORMANCE.find(p => p.planId === planId);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 pb-20 overflow-y-auto">
                {/* HEADER */}
                <div className="px-4 pt-6 pb-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Button
                                className="bg-primary hover:bg-primary/90 text-white"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Membership Plans
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Manage your membership offerings
                                </p>
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowAddModal(true)}
                            className="bg-primary hover:bg-primary/80 rounded-xl"
                        >
                            <Plus className="h-4 w-4" />
                            Add
                        </Button>
                    </div>
                </div>

                {/* STATS OVERVIEW */}
                <section className="px-4 mb-6">
                    <div className="flex items-center justify-between gap-2">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                                <Users className="h-4 w-4" />
                                <span>Total Subscribers</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {PLAN_PERFORMANCE.reduce((sum, p) => sum + p.activeSubscriptions, 0)}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                                <DollarSign className="h-4 w-4" />
                                <span>Total Revenue</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                ₹{PLAN_PERFORMANCE.reduce((sum, p) => sum + p.totalRevenue, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>Avg Redemption</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {(PLAN_PERFORMANCE.reduce((sum, p) => sum + p.averageRedemptionRate, 0) / PLAN_PERFORMANCE.length).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </section>

                {/* PLANS LIST */}
                <section className="px-4 space-y-4">
                    {plans.map((plan) => {
                        const performance = getPlanPerformance(plan.id);
                        return (
                            <div
                                key={plan.id}
                                className={clsx(
                                    "bg-white rounded-2xl shadow-sm border-2 transition-all",
                                    plan.featured ? "border-[#D4AF37]" : "border-gray-100"
                                )}
                            >
                                {/* PLAN HEADER */}
                                <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {plan.title}
                                                </h3>
                                                <Badge
                                                    className={clsx(
                                                        "text-xs",
                                                        plan.featured
                                                            ? "bg-[#D4AF37] text-white"
                                                            : "bg-gray-100 text-gray-700"
                                                    )}
                                                >
                                                    {plan.badge}
                                                </Badge>
                                                {!plan.active && (
                                                    <Badge className="bg-red-100 text-red-700 text-xs">
                                                        Inactive
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3">
                                                {plan.description}
                                            </p>

                                            {/* PRICING */}
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    ₹{plan.price}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    · {plan.teas} teas · {plan.validity}
                                                </span>
                                            </div>
                                            <p className="text-xs text-green-600 mt-1">
                                                {plan.savings}
                                            </p>
                                        </div>


                                    </div>
                                </div>

                                {/* BENEFITS */}
                                <div className="p-4 border-b border-gray-100">
                                    <h4 className="text-xs font-semibold text-gray-900 mb-2 uppercase">
                                        Benefits
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {plan.benefits.map((benefit, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-2 text-sm text-gray-700"
                                            >
                                                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                                <span>{benefit}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* PERFORMANCE METRICS */}
                                {performance && (
                                    <div className="p-4 bg-gray-50">
                                        <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase">
                                            Performance
                                        </h4>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Active Subs</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {performance.activeSubscriptions}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Revenue</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ₹{performance.totalRevenue.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Redemption Rate</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {performance.averageRedemptionRate}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="p-3 border-t border-gray-100">
                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => handleToggleActive(plan.id)}
                                            className={clsx(
                                                "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all",
                                                plan.active
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-gray-100 text-gray-500"
                                            )}
                                        >
                                            {plan.active ? (
                                                <Eye className="h-4 w-4" />
                                            ) : (
                                                <EyeOff className="h-4 w-4" />
                                            )}
                                            <span className="text-[10px] font-medium">
                                                {plan.active ? "Active" : "Hidden"}
                                            </span>
                                        </button>
                                        <button
                                            onClick={() => handleToggleFeatured(plan.id)}
                                            className={clsx(
                                                "flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all",
                                                plan.featured
                                                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                                                    : "bg-gray-100 text-gray-500"
                                            )}
                                        >
                                            <Star
                                                className={clsx(
                                                    "h-4 w-4",
                                                    plan.featured && "fill-[#D4AF37]"
                                                )}
                                            />
                                            <span className="text-[10px] font-medium">Featured</span>
                                        </button>
                                        <button
                                            onClick={() => setEditingPlan(plan)}
                                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-blue-50 text-blue-600 transition-all hover:bg-blue-100"
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span className="text-[10px] font-medium">Edit</span>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(plan.id)}
                                            className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg bg-red-50 text-red-600 transition-all hover:bg-red-100"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="text-[10px] font-medium">Delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>

            <Footer />
        </div>
    );
}
