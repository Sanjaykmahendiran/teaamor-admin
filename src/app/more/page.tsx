"use client";

import Link from "next/link";
import {
  DollarSign,
  Tag,
  User,
  Users,
  Ticket,
  CreditCard,
  UserCheck,
  Receipt,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface MenuItem {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  iconColor: string;
  iconBg: string;
  section: "store" | "users" | "finance";
}

export default function MorePage() {
  const menuItems: MenuItem[] = [
    {
      title: "Offers",
      description: "Promunning promotions & discounts",
      icon: Tag,
      href: "/offers",
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      section: "store",
    },
    {
      title: "Membership Plans",
      description: "Configure membership benefits",
      icon: Ticket,
      href: "/membership-plans",
      iconColor: "text-yellow-700",
      iconBg: "bg-yellow-100",
      section: "store",
    },
    {
      title: "Redemptions",
      description: "Verify tea redemptions",
      icon: Receipt,
      href: "/redemptions",
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      section: "store",
    },

    {
      title: "Customers",
      description: "Manage customer profiles",
      icon: Users,
      href: "/customers",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      section: "users",
    },
    {
      title: "Members",
      description: "Active membership holders",
      icon: UserCheck,
      href: "/members",
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      section: "users",
    },
    {
      title: "Profile",
      description: "Store settings & details",
      icon: User,
      href: "/profile",
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      section: "users",
    },

    {
      title: "Expenses",
      description: "Track shop expenses",
      icon: DollarSign,
      href: "/expense",
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      section: "finance",
    },
    {
      title: "Transactions",
      description: "Payment history & reports",
      icon: CreditCard,
      href: "/transactions",
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      section: "finance",
    },
  ];

  const renderSection = (title: string, sectionKey: MenuItem["section"]) => (
    <div className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 px-1">
        {title}
      </h2>

      <div className="bg-white rounded-2xl divide-y overflow-hidden shadow-sm">
        {menuItems
          .filter((item) => item.section === sectionKey)
          .map((item) => {
            const IconComponent = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-4 py-4 
                           hover:bg-slate-50 transition group"
              >
                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl ${item.iconBg}
                              flex items-center justify-center`}
                >
                  <IconComponent className={`w-5 h-5 ${item.iconColor}`} />
                </div>

                {/* Text */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary transition" />
              </Link>
            );
          })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <Header />

      <main className="flex-1 px-4 py-6 max-w-3xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">More</h1>
          <p className="text-sm text-slate-600">
            Manage your store, users & finances
          </p>
        </div>

        {renderSection("Store Management", "store")}
        {renderSection("Users", "users")}
        {renderSection("Finance", "finance")}
      </main>

      <Footer />
    </div>
  );
}
