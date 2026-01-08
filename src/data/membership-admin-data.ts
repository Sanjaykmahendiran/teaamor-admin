// Admin-specific membership data and analytics

export interface MembershipStats {
    totalActiveMembers: number;
    totalRevenue: number;
    redemptionsToday: number;
    redemptionsThisMonth: number;
    averageRedemptionRate: number;
    mostPopularPlan: string;
}

export interface ActiveMember {
    id: number;
    name: string;
    email: string;
    phone: string;
    planId: number;
    planName: string;
    totalTeas: number;
    usedTeas: number;
    remainingTeas: number;
    dailyLimit: number;
    status: "active" | "paused" | "expired";
    purchasedOn: string;
    validTill: string;
    lastRedemption?: string;
    redeemedToday: boolean;
}

export interface RedemptionRecord {
    id: number;
    memberId: number;
    memberName: string;
    memberPhone: string;
    planName: string;
    teaType: string;
    store: string;
    storeId: number;
    date: string;
    time: string;
    status: "redeemed" | "pending" | "cancelled";
    verifiedBy?: string;
    notes?: string;
}

export interface TransactionRecord {
    id: number;
    memberId: number;
    memberName: string;
    memberEmail: string;
    planId: number;
    planName: string;
    amount: number;
    date: string;
    time: string;
    paymentMethod: string;
    paymentId: string;
    status: "completed" | "pending" | "failed" | "refunded";
    refundReason?: string;
}

export interface PlanPerformance {
    planId: number;
    planName: string;
    activeSubscriptions: number;
    totalRevenue: number;
    averageRedemptionRate: number;
    customerSatisfaction: number;
}

// Mock Statistics
export const MEMBERSHIP_STATS: MembershipStats = {
    totalActiveMembers: 156,
    totalRevenue: 234500,
    redemptionsToday: 89,
    redemptionsThisMonth: 2156,
    averageRedemptionRate: 78.5,
    mostPopularPlan: "Gold Pass"
};

// Mock Active Members
export const ACTIVE_MEMBERS: ActiveMember[] = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul.sharma@email.com",
        phone: "+91 98765 43210",
        planId: 2,
        planName: "Gold Pass",
        totalTeas: 30,
        usedTeas: 12,
        remainingTeas: 18,
        dailyLimit: 1,
        status: "active",
        purchasedOn: "Nov 15, 2024",
        validTill: "Dec 15, 2024",
        lastRedemption: "Dec 24, 2024",
        redeemedToday: true
    },
    {
        id: 2,
        name: "Priya Patel",
        email: "priya.patel@email.com",
        phone: "+91 98765 43211",
        planId: 3,
        planName: "Platinum Pass",
        totalTeas: 60,
        usedTeas: 8,
        remainingTeas: 52,
        dailyLimit: 2,
        status: "active",
        purchasedOn: "Dec 10, 2024",
        validTill: "Jan 10, 2025",
        lastRedemption: "Dec 23, 2024",
        redeemedToday: false
    },
    {
        id: 3,
        name: "Amit Kumar",
        email: "amit.kumar@email.com",
        phone: "+91 98765 43212",
        planId: 1,
        planName: "Silver Pass",
        totalTeas: 15,
        usedTeas: 14,
        remainingTeas: 1,
        dailyLimit: 1,
        status: "active",
        purchasedOn: "Dec 1, 2024",
        validTill: "Dec 26, 2024",
        lastRedemption: "Dec 24, 2024",
        redeemedToday: true
    },
    {
        id: 4,
        name: "Sneha Reddy",
        email: "sneha.reddy@email.com",
        phone: "+91 98765 43213",
        planId: 2,
        planName: "Gold Pass",
        totalTeas: 30,
        usedTeas: 0,
        remainingTeas: 30,
        dailyLimit: 1,
        status: "active",
        purchasedOn: "Dec 24, 2024",
        validTill: "Jan 24, 2025",
        redeemedToday: false
    },
    {
        id: 5,
        name: "Vikram Singh",
        email: "vikram.singh@email.com",
        phone: "+91 98765 43214",
        planId: 3,
        planName: "Platinum Pass",
        totalTeas: 60,
        usedTeas: 45,
        remainingTeas: 15,
        dailyLimit: 2,
        status: "active",
        purchasedOn: "Nov 1, 2024",
        validTill: "Dec 31, 2024",
        lastRedemption: "Dec 25, 2024",
        redeemedToday: true
    }
];

// Mock Redemption Records
export const ADMIN_REDEMPTION_HISTORY: RedemptionRecord[] = [
    {
        id: 1,
        memberId: 1,
        memberName: "Rahul Sharma",
        memberPhone: "+91 98765 43210",
        planName: "Gold Pass",
        teaType: "Masala Chai",
        store: "MG Road, Bangalore",
        storeId: 1,
        date: "Dec 25, 2024",
        time: "09:30 AM",
        status: "redeemed",
        verifiedBy: "Staff: Ramesh"
    },
    {
        id: 2,
        memberId: 2,
        memberName: "Priya Patel",
        memberPhone: "+91 98765 43211",
        planName: "Platinum Pass",
        teaType: "Green Tea",
        store: "Indiranagar, Bangalore",
        storeId: 2,
        date: "Dec 25, 2024",
        time: "10:15 AM",
        status: "redeemed",
        verifiedBy: "Staff: Suresh"
    },
    {
        id: 3,
        memberId: 5,
        memberName: "Vikram Singh",
        memberPhone: "+91 98765 43214",
        planName: "Platinum Pass",
        teaType: "Lemon Tea",
        store: "Koramangala, Bangalore",
        storeId: 3,
        date: "Dec 25, 2024",
        time: "11:00 AM",
        status: "pending",
        notes: "Waiting for pickup"
    },
    {
        id: 4,
        memberId: 3,
        memberName: "Amit Kumar",
        memberPhone: "+91 98765 43212",
        planName: "Silver Pass",
        teaType: "Ginger Tea",
        store: "MG Road, Bangalore",
        storeId: 1,
        date: "Dec 24, 2024",
        time: "04:30 PM",
        status: "redeemed",
        verifiedBy: "Staff: Ramesh"
    },
    {
        id: 5,
        memberId: 1,
        memberName: "Rahul Sharma",
        memberPhone: "+91 98765 43210",
        planName: "Gold Pass",
        teaType: "Masala Chai",
        store: "MG Road, Bangalore",
        storeId: 1,
        date: "Dec 24, 2024",
        time: "09:45 AM",
        status: "redeemed",
        verifiedBy: "Staff: Ramesh"
    },
    {
        id: 6,
        memberId: 2,
        memberName: "Priya Patel",
        memberPhone: "+91 98765 43211",
        planName: "Platinum Pass",
        teaType: "Black Tea",
        store: "Indiranagar, Bangalore",
        storeId: 2,
        date: "Dec 23, 2024",
        time: "08:30 AM",
        status: "redeemed",
        verifiedBy: "Staff: Suresh"
    }
];

// Mock Transaction Records
export const ADMIN_TRANSACTION_HISTORY: TransactionRecord[] = [
    {
        id: 1,
        memberId: 4,
        memberName: "Sneha Reddy",
        memberEmail: "sneha.reddy@email.com",
        planId: 2,
        planName: "Gold Pass",
        amount: 899,
        date: "Dec 24, 2024",
        time: "02:15 PM",
        paymentMethod: "UPI",
        paymentId: "TXN202412240001",
        status: "completed"
    },
    {
        id: 2,
        memberId: 1,
        memberName: "Rahul Sharma",
        memberEmail: "rahul.sharma@email.com",
        planId: 2,
        planName: "Gold Pass",
        amount: 899,
        date: "Nov 15, 2024",
        time: "11:30 AM",
        paymentMethod: "Credit Card",
        paymentId: "TXN202411150001",
        status: "completed"
    },
    {
        id: 3,
        memberId: 2,
        memberName: "Priya Patel",
        memberEmail: "priya.patel@email.com",
        planId: 3,
        planName: "Platinum Pass",
        amount: 1699,
        date: "Dec 10, 2024",
        time: "03:45 PM",
        paymentMethod: "UPI",
        paymentId: "TXN202412100001",
        status: "completed"
    },
    {
        id: 4,
        memberId: 3,
        memberName: "Amit Kumar",
        memberEmail: "amit.kumar@email.com",
        planId: 1,
        planName: "Silver Pass",
        amount: 449,
        date: "Dec 1, 2024",
        time: "10:20 AM",
        paymentMethod: "Debit Card",
        paymentId: "TXN202412010001",
        status: "completed"
    },
    {
        id: 5,
        memberId: 5,
        memberName: "Vikram Singh",
        memberEmail: "vikram.singh@email.com",
        planId: 3,
        planName: "Platinum Pass",
        amount: 1699,
        date: "Nov 1, 2024",
        time: "09:00 AM",
        paymentMethod: "UPI",
        paymentId: "TXN202411010001",
        status: "completed"
    }
];

// Mock Plan Performance
export const PLAN_PERFORMANCE: PlanPerformance[] = [
    {
        planId: 1,
        planName: "Silver Pass",
        activeSubscriptions: 45,
        totalRevenue: 20205,
        averageRedemptionRate: 72.5,
        customerSatisfaction: 4.2
    },
    {
        planId: 2,
        planName: "Gold Pass",
        activeSubscriptions: 78,
        totalRevenue: 70122,
        averageRedemptionRate: 81.3,
        customerSatisfaction: 4.6
    },
    {
        planId: 3,
        planName: "Platinum Pass",
        activeSubscriptions: 33,
        totalRevenue: 56067,
        averageRedemptionRate: 85.7,
        customerSatisfaction: 4.8
    }
];

// Helper Functions
export const getMemberById = (id: number): ActiveMember | undefined => {
    return ACTIVE_MEMBERS.find(member => member.id === id);
};

export const getRedemptionsByMember = (memberId: number): RedemptionRecord[] => {
    return ADMIN_REDEMPTION_HISTORY.filter(redemption => redemption.memberId === memberId);
};

export const getTransactionsByMember = (memberId: number): TransactionRecord[] => {
    return ADMIN_TRANSACTION_HISTORY.filter(transaction => transaction.memberId === memberId);
};

export const getPendingRedemptions = (): RedemptionRecord[] => {
    return ADMIN_REDEMPTION_HISTORY.filter(redemption => redemption.status === "pending");
};

export const getTodayRedemptions = (): RedemptionRecord[] => {
    const today = "Dec 25, 2024";
    return ADMIN_REDEMPTION_HISTORY.filter(redemption => redemption.date === today);
};

export const getRevenueByPlan = (planId: number): number => {
    return ADMIN_TRANSACTION_HISTORY
        .filter(transaction => transaction.planId === planId && transaction.status === "completed")
        .reduce((sum, transaction) => sum + transaction.amount, 0);
};
