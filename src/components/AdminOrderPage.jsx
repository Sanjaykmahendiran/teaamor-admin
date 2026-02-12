"use client";

import React, { useState, useEffect } from "react";
import {
    ChevronDown,
    ChevronUp,
    Loader2,
    AlertCircle,
    RefreshCcw,
    ExternalLink,
    Package,
    CreditCard,
    User,
    Calendar,
    CheckCircle2,
    Clock,
    Send
} from "lucide-react";
import { fetchOrders, placeOrder } from "@/services/orders";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";



const AdminOrderPage = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const tabs = [
        { label: "All", code: "All", icon: <Package className="w-4 h-4" /> },
        { label: "New", code: "New", icon: <Clock className="w-4 h-4" /> },
        { label: "Pending", code: "Processing", icon: <RefreshCcw className="w-4 h-4" /> },
        { label: "Ready", code: "Ready", icon: <CheckCircle2 className="w-4 h-4" /> },
        { label: "Completed", code: "Completed", icon: <Send className="w-4 h-4" /> },
    ];

    const loadOrders = async (statusCode) => {
        setLoading(true);
        setError(null);
        try {
            // Map the codes to the API's expected formats if necessary
            // In the previous version, it seemed like "All", "New", etc. were being used directly
            const response = await fetchOrders(statusCode);
            const ordersList = Array.isArray(response) ? response : (response.data || []);
            setOrders(ordersList);
        } catch (err) {
            setError(err.message || "Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders(activeTab);
    }, [activeTab]);

    const toggleExpand = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const getStatusConfig = (status) => {
        const lowerStatus = (status || "").toLowerCase();
        if (lowerStatus.includes('processing') || lowerStatus === 'pro')
            return { label: 'Processing', color: 'bg-blue-50 text-blue-600 border-blue-100' };
        if (lowerStatus.includes('ready') || lowerStatus === 'rdy')
            return { label: 'Ready', color: 'bg-amber-50 text-amber-600 border-amber-100' };
        if (lowerStatus.includes('completed') || lowerStatus.includes('done') || lowerStatus === 'con')
            return { label: 'Completed', color: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
        if (lowerStatus.includes('new'))
            return { label: 'New', color: 'bg-indigo-50 text-indigo-600 border-indigo-100' };

        return { label: status, color: 'bg-gray-50 text-gray-600 border-gray-100' };
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FB]">
            <Header />

            <main className="flex-1 max-w-2xl mx-auto w-full pb-24">
                {/* Mobile Header Bar */}
                <div className="px-6 pt-8 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black text-[#2D3142] tracking-tight">Orders</h1>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Live Kitchen Dashboard</p>
                        </div>
                    </div>
                    <button
                        onClick={() => loadOrders(activeTab)}
                        className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-gray-100 text-[#2D3142] active:scale-90 transition-all duration-200"
                    >
                        <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>

                {/* Categories Sticky Tab Bar */}
                <div className="sticky top-0 z-30 bg-[#F8F9FB]/80 backdrop-blur-xl py-4">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar px-6">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.code;
                            return (
                                <button
                                    key={tab.code}
                                    onClick={() => setActiveTab(tab.code)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all duration-500
                                        ${isActive
                                            ? 'bg-[#2D3142] text-white shadow-xl shadow-[#2D3142]/20 scale-105'
                                            : 'bg-white text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Orders Content */}
                <div className="px-6 space-y-5 mt-2">
                    {loading && !orders.length ? (
                        <div className="flex flex-col items-center justify-center py-32 space-y-6">
                            <div className="relative">
                                <div className="w-16 h-16 border-4 border-[#D4AF37]/10 rounded-full" />
                                <div className="absolute top-0 w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                            </div>
                            <div className="text-center">
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest">Updating Kitchen</p>
                                <p className="text-[#2D3142] text-sm font-bold mt-1 italic">Brewing greatness...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 px-8 bg-white rounded-[40px] border border-gray-100 shadow-sm">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <p className="text-gray-800 font-bold mb-2">Sync Interrupted</p>
                            <p className="text-gray-400 text-sm mb-6">{error}</p>
                            <button
                                onClick={() => loadOrders(activeTab)}
                                className="px-8 py-3 bg-[#2D3142] text-white rounded-2xl font-bold text-xs"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center py-32 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Package className="w-8 h-8 text-gray-200" />
                            </div>
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No active orders</p>
                            <p className="text-gray-300 text-xs mt-2 italic">Waiting for new magic...</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {orders.map((order, idx) => (
                                <motion.div
                                    key={order.order_id || idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    className={`bg-white rounded-[32px] p-6 shadow-sm border-2 transition-all duration-500
                                        ${expandedOrderId === order.order_id ? 'border-[#D4AF37] shadow-2xl scale-[1.02]' : 'border-transparent'}`}
                                    onClick={() => toggleExpand(order.order_id)}
                                >
                                    {/* Card Header: Order and Progress */}
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-white shadow-lg shadow-[#D4AF37]/30">
                                                <Package className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Reference</p>
                                                <p className="text-lg font-black text-[#2D3142]">#{order.order_id}</p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-wider border-2 ${getStatusConfig(order.order_status || activeTab).color}`}>
                                            {getStatusConfig(order.order_status || activeTab).label}
                                        </div>
                                    </div>

                                    {/* Quick Metrics */}
                                    <div className="grid grid-cols-2 gap-4 pb-6 border-b-2 border-gray-50">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 opacity-40">
                                                <User className="w-3 h-3 text-[#2D3142]" />
                                                <span className="text-[9px] font-black uppercase">Customer</span>
                                            </div>
                                            <p className="text-xs font-bold text-[#2D3142] truncate">ID {order.customer_id}</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <div className="flex items-center gap-2 justify-end opacity-40">
                                                <CreditCard className="w-3 h-3 text-[#2D3142]" />
                                                <span className="text-[9px] font-black uppercase">Payment</span>
                                            </div>
                                            <p className="text-xs font-bold text-[#2D3142]">{order.payment_mode}</p>
                                        </div>
                                    </div>

                                    {/* Bottom Bar */}
                                    <div className="mt-6 flex justify-between items-center">
                                        <div className="flex flex-col">
                                            <p className="text-[9px] font-black uppercase text-gray-300 mb-1">Total Bill</p>
                                            <p className="text-xl font-black text-[#D4AF37] leading-none">₹{order.total_amount}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-[9px] font-black uppercase text-gray-300 mb-1">Time</p>
                                                <p className="text-[10px] font-bold text-gray-600">{order.created_at || 'Just Now'}</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#2D3142] group-hover:text-white transition-colors capitalize">
                                                {expandedOrderId === order.order_id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {expandedOrderId === order.order_id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="mt-8 space-y-6 pt-6 border-t-2 border-gray-50">
                                                    {/* Product List */}
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order Items</h4>
                                                            <span className="text-[10px] font-black text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
                                                                {order.fullquantity || order.total_quantity || 0} Products
                                                            </span>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {order.product_details?.map((product, pIdx) => (
                                                                <div key={pIdx} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-3xl border border-gray-100 hover:border-[#D4AF37]/30 transition-colors">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center font-black text-[#2D3142] text-xs shadow-sm shadow-[#2D3142]/5 border border-gray-100">
                                                                            {product.quantity}<span className="text-[8px] opacity-40 ml-0.5">X</span>
                                                                        </div>
                                                                        <div className="flex flex-col">
                                                                            <p className="text-xs font-bold text-[#2D3142]">Product SKU</p>
                                                                            <p className="text-[10px] font-medium text-gray-400">#{product.product_id}</p>
                                                                        </div>
                                                                    </div>
                                                                    <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm active:scale-90 transition-all border border-gray-100">
                                                                        <ExternalLink className="w-3 h-3 text-[#2D3142]" />
                                                                    </button>
                                                                </div>
                                                            )) || (
                                                                    <div className="text-center py-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                                                                        <p className="text-[10px] font-bold text-gray-400 uppercase italic">No item details summarized</p>
                                                                    </div>
                                                                )}
                                                        </div>
                                                    </div>

                                                    {/* Summary Footer */}
                                                    <div className="bg-[#2D3142] rounded-[32px] p-6 text-white shadow-2xl shadow-[#2D3142]/40 relative overflow-hidden group">
                                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:opacity-20 transition-opacity" />
                                                        <div className="relative z-10 space-y-3">
                                                            <div className="flex justify-between text-[10px] font-black uppercase opacity-60 tracking-wider">
                                                                <span>Invoice Base</span>
                                                                <span>₹{order.invoice_amount || order.total_amount}</span>
                                                            </div>
                                                            {order.coupon_amount > 0 && (
                                                                <div className="flex justify-between text-[10px] font-black uppercase text-emerald-400 tracking-wider">
                                                                    <span>Membership Discount</span>
                                                                    <span>-₹{order.coupon_amount}</span>
                                                                </div>
                                                            )}
                                                            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                                                                <div>
                                                                    <p className="text-[9px] font-black uppercase opacity-60 mb-1">Final Amount</p>
                                                                    <p className="text-2xl font-black text-[#D4AF37]">₹{order.total_amount}</p>
                                                                </div>
                                                                <CheckCircle2 className="w-8 h-8 text-[#D4AF37] opacity-20" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminOrderPage;
