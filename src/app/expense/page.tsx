"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Calendar,
  DollarSign,
  Tag,
  TrendingDown,
  X,
  Coffee,
  Zap,
  Home,
  Users,
  Wrench,
  Megaphone,
  Package,
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
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-service";

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
}

const expenseCategories = [
  { id: "ingredients", label: "Ingredients", icon: Coffee, color: "bg-blue-100 text-blue-700" },
  { id: "utilities", label: "Utilities", icon: Zap, color: "bg-yellow-100 text-yellow-700" },
  { id: "rent", label: "Rent", icon: Home, color: "bg-purple-100 text-purple-700" },
  { id: "staff", label: "Staff", icon: Users, color: "bg-green-100 text-green-700" },
  { id: "equipment", label: "Equipment", icon: Wrench, color: "bg-orange-100 text-orange-700" },
  { id: "marketing", label: "Marketing", icon: Megaphone, color: "bg-pink-100 text-pink-700" },
  { id: "other", label: "Other", icon: Package, color: "bg-gray-100 text-gray-700" },
];

export default function ExpensePage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  const [dateFilter, setDateFilter] = useState<string>("all");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [expensesData, categoriesData] = await Promise.all([
        api.expenses.list(),
        api.expenses.listCategories()
      ]);

      const expList = Array.isArray(expensesData) ? expensesData : ((expensesData as any).data || []);
      const catList = Array.isArray(categoriesData) ? categoriesData : ((categoriesData as any).data || []);

      setExpenses(expList.map((e: any) => ({
        id: e.expense_id?.toString(),
        title: e.expense_title,
        amount: Number(e.amount || 0),
        category: e.category_id?.toString(),
        categoryName: e.category_name,
        date: e.expense_date,
        description: e.notes,
        paymentMode: e.payment_mode
      })));

      setCategories(catList.map((c: any) => ({
        id: c.expcategory_id?.toString(),
        label: c.category_name
      })));
    } catch (error) {
      console.error("Failed to load expense data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter expenses
  const filteredExpenses = useMemo(() => {
    let filtered = expenses;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (expense) =>
          expense.title.toLowerCase().includes(query) ||
          expense.description?.toLowerCase().includes(query) ||
          expense.categoryName?.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((expense) => expense.category === selectedCategory);
    }

    // Filter by date
    if (dateFilter !== "all") {
      const today = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "today":
          filtered = filtered.filter((expense) => {
            const expenseDate = new Date(expense.date);
            return expenseDate.toDateString() === today.toDateString();
          });
          break;
        case "week":
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter((expense) => new Date(expense.date) >= filterDate);
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter((expense) => new Date(expense.date) >= filterDate);
          break;
        case "year":
          filterDate.setFullYear(today.getFullYear() - 1);
          filtered = filtered.filter((expense) => new Date(expense.date) >= filterDate);
          break;
      }
    }

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, searchQuery, selectedCategory, dateFilter]);

  // Calculate totals
  const totalExpenses = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [filteredExpenses]);

  const allTimeTotal = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.amount || !formData.category || !formData.date) {
      return;
    }

    try {
      if (editingExpense) {
        await api.expenses.edit({
          expense_id: editingExpense.id,
          category_id: formData.category,
          expense_title: formData.title.trim(),
          amount: parseFloat(formData.amount),
          expense_date: formData.date,
          payment_mode: "Cash", // Default or add to form
          notes: formData.description.trim()
        });
      } else {
        await api.expenses.add({
          category_id: formData.category,
          expense_title: formData.title.trim(),
          amount: parseFloat(formData.amount),
          expense_date: formData.date,
          payment_mode: "Cash", // Default or add to form
          notes: formData.description.trim()
        });
      }
      loadData();
      setShowAddForm(false);
      setEditingExpense(null);
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  // Handle edit
  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      amount: expense.amount.toString(),
      category: expense.category,
      date: expense.date,
      description: expense.description || "",
    });
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await api.expenses.delete(id);
        loadData();
      } catch (error) {
        console.error("Failed to delete expense:", error);
      }
    }
  };

  // Get category info
  const getCategoryInfo = (categoryId: string) => {
    return expenseCategories.find((cat) => cat.id === categoryId) || expenseCategories[expenseCategories.length - 1];
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
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
                <h1 className="text-xl font-bold text-primary">Expenses</h1>
                <p className="text-xs text-slate-600">Track and manage your expenses</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingExpense(null);
                setFormData({
                  title: "",
                  amount: "",
                  category: "",
                  date: new Date().toISOString().split("T")[0],
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
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-primary to-[#1a2440] rounded-xl p-3 text-white shadow-lg">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs opacity-90">All Time</p>
                <DollarSign className="h-4 w-4" />
              </div>
              <p className="text-lg font-bold">₹{allTimeTotal.toFixed(2)}</p>
              <p className="text-[10px] opacity-75 mt-0.5">{expenses.length} expenses</p>
            </div>

            <div className="bg-white rounded-xl p-3 shadow-md border border-slate-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-slate-600">This Month</p>
                <Calendar className="h-4 w-4 text-primary" />
              </div>
              <p className="text-lg font-bold text-primary">
                ₹{expenses
                  .filter((e) => {
                    const expenseDate = new Date(e.date);
                    const today = new Date();
                    return expenseDate.getMonth() === today.getMonth() && expenseDate.getFullYear() === today.getFullYear();
                  })
                  .reduce((sum, e) => sum + e.amount, 0)
                  .toFixed(2)}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Current month</p>
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
              placeholder="Search expenses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full h-10 text-sm">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => {
                  return (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        <span>{cat.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>

            {/* Date Filter */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full h-10 text-sm">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
                <SelectItem value="year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Expenses List */}
        <div className=" overflow-hidden">
          {filteredExpenses.length > 0 ? (
            <div className="divide-y divide-slate-100 space-y-4">
              {filteredExpenses.map((expense) => {
                const categoryInfo = getCategoryInfo(expense.category);
                return (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-white rounded-lg shadow-md transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center flex-shrink-0`}>
                        <DollarSign className="h-5 w-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 flex-wrap">
                              <h3 className="font-semibold text-primary text-sm">{expense.title}</h3>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium whitespace-nowrap`}>
                                {expense.categoryName}
                              </span>
                            </div>
                            {expense.description && (
                              <p className="text-sm text-slate-600 line-clamp-1 mb-1">{expense.description}</p>
                            )}
                            <p className="text-base font-bold text-red-600">₹{expense.amount.toFixed(2)}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-slate-400" />
                            <span className="text-[10px] text-slate-400">{formatDate(expense.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleEdit(expense)}
                              className="px-3 py-1.5 text-primary bg-primary/10 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                              aria-label="Edit expense"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleDelete(expense.id)}
                              className="px-3 py-1.5 text-red-500 bg-red-50 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                              aria-label="Delete expense"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-slate-500 text-sm mb-1">No expenses found</p>
              <p className="text-slate-400 text-xs">
                {searchQuery || selectedCategory !== "all" || dateFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Add your first expense to get started"}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Expense Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowAddForm(false);
              setEditingExpense(null);
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
                  {editingExpense ? "Edit Expense" : "Add Expense"}
                </h2>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingExpense(null);
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
                    placeholder="e.g., Grocery shopping"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-11 text-base"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="h-11 text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="h-11 text-base"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="w-full h-11 text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {categories.map((cat) => {
                        return (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4" />
                              <span>{cat.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
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
                      setEditingExpense(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 h-11 text-base bg-primary hover:bg-primary/90">
                    {editingExpense ? "Update" : "Add"}
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

