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
import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-service";

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
    performance?: {
        activeSubscriptions: number;
        totalRevenue: number;
        averageRedemptionRate: number;
    };
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
    const [plans, setPlans] = useState<MembershipPlan[]>([]);
    const [stats, setStats] = useState({
        total_subscribers: 0,
        total_revenue: 0,
        avg_redemption: 0
    });
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

    const loadData = async () => {
        setLoading(true);
        try {
            const [plansData, statsData] = await Promise.all([
                api.membership.list(),
                api.membership.getStats()
            ]);

            // Map API response to UI model if needed
            const mappedPlans = (Array.isArray(plansData) ? plansData : ((plansData as any).data || [])).map((p: any) => ({
                id: p.plan_id || p.id,
                title: p.plan_name || p.title,
                description: p.description,
                price: parseFloat(p.price),
                teas: p.total_tea_count || p.teas,
                validity: `${p.duration_days || p.validity_days} Days`,
                validityDays: p.duration_days || p.validity_days,
                dailyLimit: p.daily_limit || 1, // Default or from API
                savings: `₹${p.save_amount || p.savings}`,
                badge: p.tagline || p.badge,
                featured: p.is_featured === true || p.is_featured === 1,
                active: p.is_active === true || p.is_active === 1,
                benefits: Array.isArray(p.mem_benefits)
                    ? p.mem_benefits.map((b: any) => b.benefit_text)
                    : (Array.isArray(p.benefits) ? p.benefits : []),
                performance: p.performance
            }));

            setPlans(mappedPlans);
            setStats({
                total_subscribers: statsData?.total_subscribers || (typeof statsData === 'object' ? 0 : statsData) || 0,
                total_revenue: statsData?.total_revenue || 0,
                avg_redemption: statsData?.avg_redemption || 0
            });
        } catch (error) {
            console.error("Failed to load membership data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const mapUIToApi = (plan: any) => ({
        plan_id: plan.id,
        plan_name: plan.title,
        tagline: plan.badge || "",
        description: plan.description || "",
        price: plan.price,
        duration_days: plan.validityDays,
        total_tea_count: plan.teas,
        save_amount: typeof plan.savings === 'string'
            ? parseFloat(plan.savings.replace('₹', '') || "0")
            : plan.savings,
        is_featured: plan.featured ? 1 : 0,
        is_popular: plan.popular ? 1 : 0,
        is_active: plan.active ? 1 : 0,
        mem_benefits: (plan.benefits || []).map((b: string) => ({ benefit_text: b }))
    });

    const handleToggleActive = async (plan: MembershipPlan) => {
        try {
            const apiPayload = mapUIToApi(plan);
            apiPayload.is_active = plan.active ? 0 : 1;
            await api.membership.edit(apiPayload as any);
            loadData();
        } catch (error) {
            console.error("Failed to toggle status:", error);
        }
    };

    const handleToggleFeatured = async (plan: MembershipPlan) => {
        try {
            const apiPayload = mapUIToApi(plan);
            apiPayload.is_featured = plan.featured ? 0 : 1;
            await api.membership.edit(apiPayload as any);
            loadData();
        } catch (error) {
            console.error("Failed to toggle featured:", error);
        }
    };

    const handleSavePlan = async (formData: any) => {
        try {
            const apiPayload = {
                plan_name: formData.title,
                tagline: formData.badge,
                description: formData.description,
                price: formData.price,
                duration_days: formData.validityDays,
                total_tea_count: formData.teas,
                save_amount: formData.savings,
                is_featured: formData.featured ? 1 : 0,
                is_popular: formData.popular ? 1 : 0,
                is_active: 1,
                mem_benefits: formData.benefits.map((b: string) => ({ benefit_text: b }))
            };

            if (editingPlan) {
                await api.membership.edit({
                    ...apiPayload,
                    plan_id: editingPlan.id
                } as any);
            } else {
                await api.membership.add(apiPayload as any);
            }

            setShowAddModal(false);
            setEditingPlan(null);
            loadData();
        } catch (error) {
            console.error("Failed to save plan:", error);
        }
    };

    const handleDelete = async (planId: number) => {
        if (confirm("Are you sure you want to delete this plan?")) {
            try {
                await api.membership.delete(planId);
                loadData();
            } catch (error) {
                console.error("Failed to delete plan:", error);
            }
        }
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
                                {stats.total_subscribers}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                                <DollarSign className="h-4 w-4" />
                                <span>Total Revenue</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                ₹{stats.total_revenue.toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="flex items-center gap-1 text-gray-600 text-xs mb-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>Avg Redemption</span>
                            </div>
                            <p className="text-lg font-bold text-gray-900">
                                {stats.avg_redemption}%
                            </p>
                        </div>
                    </div>
                </section>

                {/* PLANS LIST */}
                <section className="px-4 space-y-4">
                    {plans.map((plan) => {
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
                                {plan.performance && (
                                    <div className="p-4 bg-gray-50">
                                        <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase">
                                            Performance
                                        </h4>
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Active Subs</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {plan.performance.activeSubscriptions}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Revenue</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    ₹{plan.performance.totalRevenue.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">Redemption Rate</p>
                                                <p className="text-lg font-bold text-gray-900">
                                                    {plan.performance.averageRedemptionRate}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="p-3 border-t border-gray-100">
                                    <div className="grid grid-cols-4 gap-2">
                                        <button
                                            onClick={() => handleToggleActive(plan)}
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
                                            onClick={() => handleToggleFeatured(plan)}
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

            {/* ADD/EDIT MODAL */}
            {(showAddModal || editingPlan) && (
                <MembershipPlanModal
                    plan={editingPlan}
                    onClose={() => {
                        setShowAddModal(false);
                        setEditingPlan(null);
                    }}
                    onSave={handleSavePlan}
                />
            )}
        </div>
    );
}

function MembershipPlanModal({ plan, onClose, onSave }: { plan: any, onClose: () => void, onSave: (data: any) => void }) {
    const [formData, setFormData] = useState({
        title: plan?.title || "",
        badge: plan?.badge || "",
        description: plan?.description || "",
        price: plan?.price || 0,
        teas: plan?.teas || 0,
        validityDays: plan?.validityDays || 30,
        savings: typeof plan?.savings === 'string'
            ? parseFloat(plan.savings.replace('₹', '') || "0")
            : (plan?.save_amount || 0),
        featured: plan?.featured || false,
        popular: plan?.popular || false,
        benefits: plan?.benefits || [""]
    });

    const addBenefit = () => {
        setFormData({ ...formData, benefits: [...formData.benefits, ""] });
    };

    const updateBenefit = (index: number, value: string) => {
        const newBenefits = [...formData.benefits];
        newBenefits[index] = value;
        setFormData({ ...formData, benefits: newBenefits });
    };

    const removeBenefit = (index: number) => {
        const newBenefits = formData.benefits.filter((_: any, i: number) => i !== index);
        setFormData({ ...formData, benefits: newBenefits });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">
                        {plan ? "Edit Membership Plan" : "Add New Plan"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                        <Plus className="h-5 w-5 rotate-45" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Plan Name</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="e.g. Monthly Tea Pass"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Tagline / Badge</label>
                            <input
                                type="text"
                                value={formData.badge}
                                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="e.g. Best Value"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Price (₹)</label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Total Teas</label>
                            <input
                                type="number"
                                value={formData.teas}
                                onChange={(e) => setFormData({ ...formData, teas: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Validity (Days)</label>
                            <input
                                type="number"
                                value={formData.validityDays}
                                onChange={(e) => setFormData({ ...formData, validityDays: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none min-h-[80px]"
                            placeholder="Briefly describe the plan benefits..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Save Amount (₹)</label>
                        <input
                            type="number"
                            value={formData.savings}
                            onChange={(e) => setFormData({ ...formData, savings: parseFloat(e.target.value) })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                    </div>

                    <div className="flex gap-6 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.featured}
                                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.popular}
                                onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-gray-700">Popular</span>
                        </label>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-semibold text-gray-700">Benefits</label>
                            <Button variant="outline" size="sm" onClick={addBenefit} className="h-7 text-xs rounded-lg">
                                + Add Benefit
                            </Button>
                        </div>
                        {formData.benefits.map((benefit: string, idx: number) => (
                            <div key={idx} className="flex gap-2">
                                <input
                                    type="text"
                                    value={benefit}
                                    onChange={(e) => updateBenefit(idx, e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                                    placeholder="Enter benefit text..."
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeBenefit(idx)}
                                    className="text-red-400 hover:text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 flex gap-3">
                    <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl h-12">
                        Cancel
                    </Button>
                    <Button onClick={() => onSave(formData)} className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90">
                        {plan ? "Update Plan" : "Create Plan"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
