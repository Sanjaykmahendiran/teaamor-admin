"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Phone,
    Mail,
    Calendar,
    User,
    ChevronRight,
    TrendingUp,
    Users,
    UserCheck,
    Plus,
    Edit,
    X,
    ArrowLeft,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-service";

interface Customer {
    id: string;
    name: string;
    phone: string;
    email?: string;
    totalOrders: number;
    totalSpent: number;
    lastOrderDate: string;
    status: "active" | "inactive";
}

export default function CustomersPage() {
    const router = useRouter();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
    });

    // Load customers from API
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Fetch active customers
                const activeData = await api.customers.list();
                // Optionally fetch inactive? Or assume list returns all?
                // Request lists 'inactivecustomerslist' separately.
                // I'll fetch both and combine if they are arrays.
                let combined: any[] = [];
                if (Array.isArray(activeData)) combined = [...activeData];

                try {
                    const inactiveData = await api.customers.inactiveList();
                    if (Array.isArray(inactiveData)) {
                        // Avoid duplicates if any
                        const existingIds = new Set(combined.map((c: any) => c.id || c.customer_id));
                        inactiveData.forEach((c: any) => {
                            const id = c.id || c.customer_id;
                            if (!existingIds.has(id)) {
                                combined.push(c);
                            }
                        });
                    }
                } catch (e) {
                    console.warn("Could not fetch inactive customers", e);
                }

                if (combined.length > 0) {
                    const mapped = combined.map((c: any) => ({
                        id: c.id || c.customer_id,
                        name: c.name || c.customer_name || "Unknown",
                        phone: c.phone || c.mobile || "",
                        email: c.email,
                        totalOrders: c.totalOrders || c.total_orders || 0,
                        totalSpent: c.totalSpent || c.total_spent || 0,
                        lastOrderDate: c.lastOrderDate || c.last_order_date || new Date().toISOString(),
                        status: c.status || "active"
                    }));
                    setCustomers(mapped);
                }
            } catch (err) {
                console.error("Failed to fetch customers", err);
            }
        };
        fetchCustomers();
    }, []);

    // Removed localStorage sync


    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            return;
        }

        const customer: Customer = {
            id: editingCustomer?.id || crypto.randomUUID(),
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            totalOrders: editingCustomer?.totalOrders || 0,
            totalSpent: editingCustomer?.totalSpent || 0,
            lastOrderDate: editingCustomer?.lastOrderDate || new Date().toISOString(),
            status: editingCustomer?.status || "active",
        };

        if (editingCustomer) {
            setCustomers((prev) => prev.map((c) => (c.id === customer.id ? customer : c)));
            setEditingCustomer(null);
        } else {
            setCustomers((prev) => [...prev, customer]);
        }

        // Reset form
        setFormData({
            name: "",
            phone: "",
        });
        setShowAddForm(false);
    };

    // Handle edit
    const handleEdit = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            name: customer.name,
            phone: customer.phone,
        });
        setShowAddForm(true);
    };

    // Filter customers
    const filteredCustomers = useMemo(() => {
        let filtered = [...customers];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (customer) =>
                    customer.name.toLowerCase().includes(query) ||
                    customer.phone.includes(query)
            );
        }

        // Filter by status
        if (selectedStatus !== "all") {
            filtered = filtered.filter((customer) => customer.status === selectedStatus);
        }

        // Sort by total spent (highest first)
        return filtered.sort((a, b) => b.totalSpent - a.totalSpent);
    }, [customers, searchQuery, selectedStatus]);

    // Calculate totals
    const customerStats = useMemo(() => {
        return {
            total: customers.length,
            active: customers.filter((c) => c.status === "active").length,
            inactive: customers.filter((c) => c.status === "inactive").length,
            totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
        };
    }, [customers]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    };

    // Get status badge
    const getStatusBadge = (status: "active" | "inactive") => {
        if (status === "active") {
            return (
                <span className="text-xs font-medium bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm">
                    Active
                </span>
            );
        }
        return (
            <span className="text-xs font-medium bg-gray-500/20 text-gray-700 px-3 py-1 rounded-full border border-gray-300/30">
                Inactive
            </span>
        );
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
                                <h1 className="text-xl font-bold text-primary">Customers</h1>
                                <p className="text-xs text-slate-600">View and manage customer data</p>
                            </div>
                        </div>
                        <Button
                            className="bg-primary hover:bg-primary/90 text-white"
                            onClick={() => {
                                setEditingCustomer(null);
                                setFormData({
                                    name: "",
                                    phone: ""
                                });
                                setShowAddForm(true);
                            }}
                        >
                            <Plus className="h-4 w-4" /> Add
                        </Button>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="bg-white rounded-xl p-3 text-black shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs opacity-90">Total</p>
                                <Users className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-lg font-bold text-[#D4AF37]">{customerStats.total}</p>
                        </div>

                        <div className="bg-white rounded-xl p-3 text-black shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs opacity-90">Active</p>
                                <UserCheck className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-lg font-bold text-[#D4AF37]">{customerStats.active}</p>
                        </div>

                        <div className="bg-white rounded-xl p-3 text-black shadow-lg">
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs opacity-90">Revenue</p>
                                <TrendingUp className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-lg font-bold text-[#D4AF37]">₹{customerStats.totalRevenue.toLocaleString()}</p>
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
                            placeholder="Search by name, phone, or email..."
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
                            <SelectItem value="all">All Customers</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Customers List */}
                <div className="overflow-hidden">
                    {filteredCustomers.length > 0 ? (
                        <div className="space-y-3 pb-20">
                            {filteredCustomers.map((customer) => (
                                <motion.div
                                    key={customer.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-start gap-3">
                                                {/* Avatar */}
                                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                                    {customer.name.charAt(0)}
                                                </div>

                                                {/* Customer Info */}
                                                <div className="flex-1">
                                                    <h3 className="text-primary text-base font-bold mb-1">
                                                        {customer.name}
                                                    </h3>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                                            <Phone className="h-3 w-3" />
                                                            <span>{customer.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(customer.status)}
                                                <motion.button
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleEdit(customer)}
                                                    className="w-full text-primary rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-1"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </motion.button>
                                            </div>
                                        </div>

                                        {/* Stats Row */}
                                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-0.5">Orders</p>
                                                <p className="text-sm font-bold text-primary">{customer.totalOrders}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-0.5">Spent</p>
                                                <p className="text-sm font-bold text-emerald-600">₹{customer.totalSpent.toLocaleString()}</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-xs text-gray-500 mb-0.5">Last Order</p>
                                                <p className="text-xs font-medium text-gray-700">{formatDate(customer.lastOrderDate)}</p>
                                            </div>
                                        </div>

                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                <Users className="h-6 w-6 text-gray-400" />
                            </div>
                            <p className="text-slate-500 text-sm mb-1">No customers found</p>
                            <p className="text-slate-400 text-xs">
                                {searchQuery || selectedStatus !== "all"
                                    ? "Try adjusting your filters"
                                    : "No customers yet"}
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Add/Edit Customer Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => {
                            setShowAddForm(false);
                            setEditingCustomer(null);
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
                                    {editingCustomer ? "Edit Customer" : "Add Customer"}
                                </h2>
                                <button
                                    onClick={() => {
                                        setShowAddForm(false);
                                        setEditingCustomer(null);
                                    }}
                                    className="p-1.5 active:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-4 space-y-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder="e.g., John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="h-11 text-base"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="e.g., +91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="h-11 text-base"
                                        required
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 h-11 text-base"
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setEditingCustomer(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="flex-1 h-11 text-base bg-primary hover:bg-primary/90">
                                        {editingCustomer ? "Update" : "Add"}
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
