"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Trash2,
    Edit,
    Calendar,
    Tag,
    Gift,
    X,
    Percent,
    TrendingUp,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ImagF from "@/assets/fries/cheesy-fernch-fries.jpg"
import ImagF1 from "@/assets/puff/egg-puff.jpg"
import { useRouter } from "next/navigation";
interface Offer {
    id: string;
    title: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    startDate: string;
    endDate: string;
    description?: string;
    status: "active" | "expired" | "upcoming";
}

export default function OffersPage() {
    const router = useRouter();
    const [offers, setOffers] = useState<Offer[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        discountType: "percentage" as "percentage" | "fixed",
        discountValue: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        description: "",
    });

    // Calculate offer status based on dates
    const calculateStatus = (startDate: string, endDate: string): "active" | "expired" | "upcoming" => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) return "upcoming";
        if (now > end) return "expired";
        return "active";
    };

    // Load offers from localStorage or initialize with sample data
    useEffect(() => {
        const savedOffers = localStorage.getItem("offers");
        if (savedOffers) {
            setOffers(JSON.parse(savedOffers));
        } else {
            // Initialize with sample data
            const sampleOffers: Offer[] = [
                {
                    id: crypto.randomUUID(),
                    title: "New Year Special",
                    discountType: "percentage",
                    discountValue: 20,
                    startDate: new Date().toISOString().split("T")[0],
                    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                    description: "20% off on all tea varieties",
                    status: "active",
                },
                {
                    id: crypto.randomUUID(),
                    title: "Buy 2 Get 1 Free",
                    discountType: "fixed",
                    discountValue: 25,
                    startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                    description: "Fixed ₹25 off on orders above ₹100",
                    status: "active",
                },
            ];
            setOffers(sampleOffers);
            localStorage.setItem("offers", JSON.stringify(sampleOffers));
        }
    }, []);

    // Save offers to localStorage and update status
    useEffect(() => {
        if (offers.length > 0 || localStorage.getItem("offers")) {
            // Update status for all offers
            const updatedOffers = offers.map(offer => ({
                ...offer,
                status: calculateStatus(offer.startDate, offer.endDate),
            }));
            localStorage.setItem("offers", JSON.stringify(updatedOffers));
        }
    }, [offers]);

    // Filter offers
    const filteredOffers = useMemo(() => {
        let filtered = offers.map(offer => ({
            ...offer,
            status: calculateStatus(offer.startDate, offer.endDate),
        }));

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (offer) =>
                    offer.title.toLowerCase().includes(query) ||
                    offer.description?.toLowerCase().includes(query)
            );
        }

        // Filter by status
        if (selectedStatus !== "all") {
            filtered = filtered.filter((offer) => offer.status === selectedStatus);
        }

        // Sort by start date (newest first)
        return filtered.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    }, [offers, searchQuery, selectedStatus]);

    // Calculate totals
    const offerCounts = useMemo(() => {
        const allOffers = offers.map(offer => ({
            ...offer,
            status: calculateStatus(offer.startDate, offer.endDate),
        }));
        return {
            all: allOffers.length,
            active: allOffers.filter(o => o.status === "active").length,
            upcoming: allOffers.filter(o => o.status === "upcoming").length,
            expired: allOffers.filter(o => o.status === "expired").length,
        };
    }, [offers]);

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.discountValue || !formData.startDate || !formData.endDate) {
            return;
        }

        const status = calculateStatus(formData.startDate, formData.endDate);

        const offer: Offer = {
            id: editingOffer?.id || crypto.randomUUID(),
            title: formData.title.trim(),
            discountType: formData.discountType,
            discountValue: parseFloat(formData.discountValue),
            startDate: formData.startDate,
            endDate: formData.endDate,
            description: formData.description.trim() || undefined,
            status,
        };

        if (editingOffer) {
            setOffers((prev) => prev.map((o) => (o.id === offer.id ? offer : o)));
            setEditingOffer(null);
        } else {
            setOffers((prev) => [...prev, offer]);
        }

        // Reset form
        setFormData({
            title: "",
            discountType: "percentage",
            discountValue: "",
            startDate: new Date().toISOString().split("T")[0],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            description: "",
        });
        setShowAddForm(false);
    };

    // Handle edit
    const handleEdit = (offer: Offer) => {
        setEditingOffer(offer);
        setFormData({
            title: offer.title,
            discountType: offer.discountType,
            discountValue: offer.discountValue.toString(),
            startDate: offer.startDate,
            endDate: offer.endDate,
            description: offer.description || "",
        });
        setShowAddForm(true);
    };

    // Handle delete
    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this offer?")) {
            setOffers((prev) => prev.filter((o) => o.id !== id));
        }
    };

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    // Get status badge
    const getStatusBadge = (status: "active" | "expired" | "upcoming") => {
        switch (status) {
            case "active":
                return (
                    <span className="text-xs font-medium bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm">
                        Active
                    </span>
                );
            case "upcoming":
                return (
                    <span className="text-xs font-medium bg-blue-500/20 text-blue-700 px-3 py-1 rounded-full border border-blue-300/30">
                        Upcoming
                    </span>
                );
            case "expired":
                return (
                    <span className="text-xs font-medium bg-gray-500/20 text-gray-700 px-3 py-1 rounded-full border border-gray-300/30">
                        Expired
                    </span>
                );
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <Header />

            <main className="flex-1 p-4 w-full">
                {/* Header Section */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <Button
                                className="bg-primary hover:bg-primary/90 text-white"
                                onClick={() => router.back()}
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                            <h1 className="text-xl font-bold text-primary">Offers</h1>
                            <p className="text-xs text-slate-600">Manage promotions and discounts</p>
                        </div>
                        </div>
                        <Button
                            onClick={() => {
                                setEditingOffer(null);
                                setFormData({
                                    title: "",
                                    discountType: "percentage",
                                    discountValue: "",
                                    startDate: new Date().toISOString().split("T")[0],
                                    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                                    description: "",
                                });
                                setShowAddForm(true);
                            }}
                            className="bg-primary hover:bg-primary/90 h-10 px-4"
                        >
                            <Plus className="h-4 w-4" />
                            Add
                        </Button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs opacity-90">Active</p>
                                <Gift className="h-4 w-4" />
                            </div>
                            <p className="text-lg font-bold">{offerCounts.active}</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 text-white shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs opacity-90">Upcoming</p>
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <p className="text-lg font-bold">{offerCounts.upcoming}</p>
                        </div>

                        <div className="bg-white rounded-xl p-3 shadow-md border border-slate-100">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs text-slate-600">Expired</p>
                                <Calendar className="h-4 w-4 text-slate-600" />
                            </div>
                            <p className="text-lg font-bold text-slate-600">{offerCounts.expired}</p>
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="bg-white rounded-xl shadow-md border border-slate-100 p-3 mb-4 space-y-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search offers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-10 text-sm"
                        />
                    </div>

                    {/* Status Filter */}
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger className="w-full h-10 text-sm">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                            <SelectItem value="all">All Offers</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Offers List */}
                <div className="overflow-hidden">
                    {filteredOffers.length > 0 ? (
                        <div className="space-y-4 pb-20">
                            {filteredOffers.map((offer) => (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden relative border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Discount Badge */}
                                    <div className="absolute -top-2 -right-2 z-10">
                                        <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white rounded-lg shadow-2xl px-3 py-2.5 transform rotate-3 hover:rotate-6 transition-transform">
                                            <div className="flex flex-col items-center justify-center transform -rotate-3">
                                                <span className="text-[8px] font-bold uppercase tracking-wider opacity-90">
                                                    {offer.discountType === "percentage" ? "OFF" : "Save"}
                                                </span>
                                                <span className="text-xl font-black leading-none mt-0.5">
                                                    {offer.discountType === "percentage" ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg pointer-events-none"></div>
                                        </div>
                                    </div>

                                    {/* Status Badge (top-left for 50%+ offers) */}
                                    {offer.discountType === "percentage" && offer.discountValue >= 50 && (
                                        <div className="absolute top-0 left-0 z-10">
                                            <div className="relative">
                                                <div className="bg-[#2c375d] text-white px-3 py-1.5 shadow-xl">
                                                    <span className="text-xs font-extrabold tracking-tight">50% OFF</span>
                                                </div>
                                                <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[6px] border-t-[#1a2440]"></div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-4 pr-20">
                                        <div className="flex gap-4">
                                            {/* Icon */}
                                            <div className="flex-shrink-0">
                                                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-md">
                                                    <img src={ImagF.src} alt={offer.title} className="w-full h-full object-cover" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0 pr-2">
                                                <h3 className="text-[#2c375d] text-lg font-bold mb-1 leading-tight">
                                                    {offer.title}
                                                </h3>
                                                {offer.description && (
                                                    <p className="text-gray-500 text-sm mb-2">{offer.description}</p>
                                                )}

                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-gray-600 text-sm">Discount:</span>
                                                        <span className="text-[#2c375d] text-xl font-bold">
                                                            {offer.discountType === "percentage" ? `${offer.discountValue}%` : `₹${offer.discountValue}`}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>Valid till: {formatDate(offer.endDate)}</span>
                                                    </div>
                                                    <div className="mt-1">
                                                        {getStatusBadge(offer.status)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Row */}
                                    <div className="px-4 pb-4 flex items-center gap-2 border-t border-gray-100 pt-3">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleEdit(offer)}
                                            className="flex-1 px-3 py-2 text-primary bg-primary/10 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </motion.button>
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleDelete(offer.id)}
                                            className="flex-1 px-3 py-2 text-red-500 bg-red-50 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </motion.button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                <Gift className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-slate-500 text-sm mb-1">No offers found</p>
                            <p className="text-slate-400 text-xs">
                                {searchQuery || selectedStatus !== "all"
                                    ? "Try adjusting your filters"
                                    : "Add your first offer to get started"}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Add/Edit Offer Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowAddForm(false);
                            setEditingOffer(null);
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="sticky top-0 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-10">
                                <h2 className="text-lg font-bold text-primary">
                                    {editingOffer ? "Edit Offer" : "Add Offer"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setEditingOffer(null);
                                    }}
                                    className="p-1.5 active:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Title <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g., New Year Special"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="h-11 text-base"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Discount Type <span className="text-red-500">*</span>
                                        </label>
                                        <Select
                                            value={formData.discountType}
                                            onValueChange={(value: "percentage" | "fixed") =>
                                                setFormData({ ...formData, discountType: value })
                                            }
                                        >
                                            <SelectTrigger className="w-full h-11 text-base">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                <SelectItem value="percentage">Percentage (%)</SelectItem>
                                                <SelectItem value="fixed">Fixed (₹)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Value <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            placeholder={formData.discountType === "percentage" ? "20" : "100"}
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })}
                                            className="h-11 text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Start Date <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="date"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            className="h-11 text-base"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            End Date <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            type="date"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                            className="h-11 text-base"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        placeholder="Optional description..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] resize-none text-base"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 h-11 text-base"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingOffer(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 h-11 text-base bg-primary hover:bg-primary/90">
                                        {editingOffer ? "Update" : "Add"}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
}
