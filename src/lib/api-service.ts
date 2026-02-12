// API Service for Tea Amor Admin
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://teaamor.top/App/api.php";

interface LoginResponse {
    success?: boolean;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        mobile?: string;
        role?: string;
        storeName?: string;
        distributorName?: string;
    };
    id?: string;
    name?: string;
    email?: string;
    mobile?: string;
    role?: string;
    storeName?: string;
    distributorName?: string;
}

interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

interface DashboardStats {
    total_orders?: number;
    total_customers?: number;
    total_revenue?: number;
    [key: string]: any;
}

interface Customer {
    customer_id: string;
    name: string;
    email: string;
    mobile?: string;
    status?: string;
    [key: string]: any;
}

interface Order {
    order_id: string;
    customer_id: string;
    order_status: string;
    total_amount?: number;
    created_at?: string;
    [key: string]: any;
}

interface Offer {
    offer_id?: string | number;
    title: string;
    description: string;
    discount_type: string;
    discount_value: number;
    min_order_amount: number;
    start_date: string;
    end_date: string;
    offer_image: string;
    [key: string]: any;
}

interface MembershipPlan {
    plan_id?: string | number;
    plan_name: string;
    tagline: string;
    description: string;
    price: number;
    duration_days: number;
    total_tea_count: number;
    save_amount: number;
    is_featured: number | boolean;
    is_popular: number | boolean;
    is_active?: number | boolean;
    mem_benefits: { benefit_text: string }[];
    [key: string]: any;
}

interface MembershipStats {
    total_subscribers: number;
    total_revenue: number;
    avg_redemption: number;
}

interface Member {
    member_id: string | number;
    name: string;
    email: string;
    phone: string;
    plan_id: string | number;
    plan_name: string;
    total_teas: number;
    used_teas: number;
    remaining_teas: number;
    daily_limit: number;
    status: "active" | "paused" | "expired";
    purchased_on: string;
    valid_till: string;
    last_redemption?: string;
    redeemed_today: boolean;
    [key: string]: any;
}

interface ExpenseCategory {
    expcategory_id?: string | number;
    category_name: string;
    [key: string]: any;
}

interface Expense {
    expense_id?: string | number;
    category_id: string | number;
    expense_title: string;
    amount: number;
    expense_date: string;
    payment_mode: string;
    notes?: string;
    category_name?: string;
    [key: string]: any;
}

interface Redemption {
    id: string | number;
    member_id: string | number;
    member_name: string;
    member_phone: string;
    tea_type: string;
    tea_id: string | number;
    store: string;
    store_id: string | number;
    date: string;
    time: string;
    plan_name: string;
    status: "pending" | "redeemed" | "cancelled";
    verified_by?: string;
    notes?: string;
    [key: string]: any;
}

interface RedemptionStats {
    pending: number;
    today: number;
    completed: number;
}

class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private async request<T = any>(payload: any, method: "GET" | "POST" = "POST"): Promise<T> {
        try {
            let url = this.baseUrl;
            let options: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
            };

            if (method === "GET" && payload) {
                // For GET requests, append parameters to URL
                const filteredPayload: any = {};
                Object.keys(payload).forEach(key => {
                    if (payload[key] !== undefined && payload[key] !== null) {
                        filteredPayload[key] = payload[key];
                    }
                });
                const params = new URLSearchParams(filteredPayload);
                url = `${this.baseUrl}?${params.toString()}`;
            } else if (method === "POST") {
                options.body = JSON.stringify(payload);
            }

            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const text = await response.text();
            if (!text) {
                return {} as T;
            }

            try {
                const data = JSON.parse(text);
                return data;
            } catch (e) {
                console.error("Failed to parse JSON:", text);
                throw new Error("Invalid JSON response from server");
            }
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }

    // Auth endpoints
    auth = {
        login: async (username: string, password: string): Promise<LoginResponse> => {
            const payload = {
                gofor: "alogin",
                username,
                password,
            };
            return this.request<LoginResponse>(payload, "GET");
        },
    };

    // Dashboard
    dashboard = {
        getStats: async (): Promise<DashboardStats> => {
            const payload = { gofor: "dashboard" };
            return this.request<DashboardStats>(payload, "GET");
        },
    };

    // Image upload
    upload = {
        image: async (base64Image: string, type: string = "products"): Promise<{ url: string }> => {
            const payload = {
                gofor: "image_upload",
                imgname: base64Image,
                type,
            };
            return this.request<{ url: string }>(payload, "POST");
        },
    };

    // Customers
    customers = {
        list: async (): Promise<Customer[]> => {
            const payload = { gofor: "customerslist" };
            return this.request<Customer[]>(payload, "GET");
        },

        get: async (customerId: string): Promise<Customer> => {
            const payload = {
                gofor: "customersget",
                customer_id: customerId,
            };
            return this.request<Customer>(payload, "GET");
        },

        listInactive: async (): Promise<Customer[]> => {
            const payload = { gofor: "inactivecustomerslist" };
            return this.request<Customer[]>(payload, "GET");
        },

        getWishlist: async (customerId: string): Promise<any[]> => {
            const payload = {
                gofor: "wishlist",
                customer_id: customerId,
            };
            return this.request<any[]>(payload, "GET");
        },

        getAddresses: async (customerId: string): Promise<any[]> => {
            const payload = {
                gofor: "addresslist",
                customer_id: customerId,
            };
            return this.request<any[]>(payload, "GET");
        },
    };

    // Orders
    orders = {
        list: async (): Promise<Order[]> => {
            const payload = { gofor: "orderslist" };
            return this.request<Order[]>(payload, "GET");
        },

        get: async (orderId: string): Promise<Order> => {
            const payload = {
                gofor: "getorder",
                order_id: orderId,
            };
            return this.request<Order>(payload, "GET");
        },

        getByCustomer: async (customerId: string): Promise<Order[]> => {
            const payload = {
                gofor: "vieworders",
                customer_id: customerId,
            };
            return this.request<Order[]>(payload, "GET");
        },

        updateStatus: async (orderId: string, orderStatus: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "updateorderstatus",
                order_id: orderId,
                order_status: orderStatus,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Tags
    tags = {
        list: async (): Promise<any[]> => {
            const payload = { gofor: "tagslist" };
            return this.request<any[]>(payload, "GET");
        },

        delete: async (tagId: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "deletetag",
                tags_id: tagId,
            };
            return this.request<ApiResponse>(payload, "GET");
        },
    };

    // Blogs
    blogs = {
        list: async (): Promise<any[]> => {
            const payload = { gofor: "blogslist" };
            return this.request<any[]>(payload, "GET");
        },

        delete: async (blogId: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "deleteblogs",
                blog_id: blogId,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Users / Profile
    users = {
        get: async (userId: string): Promise<any> => {
            const payload = {
                gofor: "userget",
                user_id: userId,
            };
            return this.request<any>(payload, "GET");
        },
        update: async (userId: string, userData: any): Promise<ApiResponse> => {
            const payload = {
                gofor: "useredit",
                user_id: userId,
                ...userData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Products (keeping for Tea Amor specific functionality)
    products = {
        add: async (productData: {
            product_name: string;
            product_image: string;
            description: string;
            is_featured: number;
            user_ratings: number;
            price: number;
            products_category: { category_id: number }[];
        }): Promise<ApiResponse> => {
            const payload = {
                gofor: "addproducts",
                ...productData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        list: async (): Promise<ApiResponse> => {
            const payload = {
                gofor: "listproducts",
            };
            return this.request<ApiResponse>(payload, "GET");
        },

        update: async (productId: number, productData: {
            product_name: string;
            product_image: string;
            description: string;
            is_featured: number;
            user_ratings: number;
            price: number;
            products_category: { category_id: number }[];
        }): Promise<ApiResponse> => {
            const payload = {
                gofor: "editproducts",
                product_id: productId,
                ...productData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        delete: async (productId: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "deleteproduct",
                product_id: productId,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Categories (Tea Amor specific functionality)
    categories = {
        add: async (categoryData: {
            cat_name: string;
            menu_type: string;
        }): Promise<ApiResponse> => {
            const payload = {
                gofor: "addcategory",
                ...categoryData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        list: async (): Promise<ApiResponse> => {
            const payload = {
                gofor: "listcategories",
            };
            return this.request<ApiResponse>(payload, "GET");
        },

        update: async (categoryId: number, categoryData: {
            cat_name: string;
            menu_type: string;
            status: number;
        }): Promise<ApiResponse> => {
            const payload = {
                gofor: "editcategory",
                category_id: categoryId,
                ...categoryData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        delete: async (categoryId: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "deletecategory",
                category_id: categoryId,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Offers
    offers = {
        add: async (offerData: Offer): Promise<ApiResponse> => {
            const payload = {
                gofor: "addoffer",
                ...offerData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        edit: async (offerData: Offer): Promise<ApiResponse> => {
            const payload = {
                gofor: "editoffer",
                ...offerData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        get: async (offerId: string | number): Promise<Offer> => {
            const payload = {
                gofor: "getoffer",
                offer_id: offerId,
            };
            return this.request<Offer>(payload, "GET");
        },

        list: async (type?: string): Promise<Offer[]> => {
            const payload = {
                gofor: "offerslist",
                type,
            };
            return this.request<Offer[]>(payload, "GET");
        },

        delete: async (offerId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "deleteoffer",
                offer_id: offerId,
            };
            return this.request<ApiResponse>(payload, "GET");
        },
    };

    // Membership Plans
    membership = {
        list: async (): Promise<MembershipPlan[]> => {
            const payload = { gofor: "membershiplist" };
            return this.request<MembershipPlan[]>(payload, "GET");
        },

        getStats: async (): Promise<any> => {
            const payload = { gofor: "membershipstats" };
            return this.request<any>(payload, "GET");
        },

        add: async (planData: MembershipPlan): Promise<ApiResponse> => {
            const payload = {
                gofor: "addmembership",
                ...planData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        edit: async (planData: MembershipPlan): Promise<ApiResponse> => {
            const payload = {
                gofor: "editmembership",
                ...planData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        get: async (planId: string | number): Promise<MembershipPlan> => {
            const payload = {
                gofor: "getmembership",
                plan_id: planId,
            };
            return this.request<MembershipPlan>(payload, "GET");
        },

        delete: async (planId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "deletemembership",
                plan_id: planId,
            };
            return this.request<ApiResponse>(payload, "GET");
        },

        activeList: async (): Promise<MembershipPlan[]> => {
            const payload = { gofor: "activememberships" };
            return this.request<MembershipPlan[]>(payload, "GET");
        },

        buy: async (customerId: string | number, planId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "buymembership",
                customer_id: customerId,
                plan_id: planId,
            };
            return this.request<ApiResponse>(payload, "POST");
        },
    };

    // Members
    members = {
        list: async (): Promise<Member[]> => {
            const payload = { gofor: "memberslist" };
            return this.request<Member[]>(payload, "GET");
        },
    };

    // Expenses
    expenses = {
        addCategory: async (categoryName: string): Promise<ApiResponse> => {
            const payload = {
                gofor: "addexpensecategory",
                category_name: categoryName,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        listCategories: async (): Promise<ExpenseCategory[]> => {
            const payload = { gofor: "expensecategorylist" };
            return this.request<ExpenseCategory[]>(payload, "GET");
        },

        deleteCategory: async (categoryId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "deleteexpensecategory",
                expcategory_id: categoryId,
            };
            return this.request<ApiResponse>(payload, "GET");
        },

        add: async (expenseData: Expense): Promise<ApiResponse> => {
            const payload = {
                gofor: "addexpense",
                ...expenseData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        edit: async (expenseData: Expense): Promise<ApiResponse> => {
            const payload = {
                gofor: "editexpense",
                ...expenseData,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        list: async (): Promise<Expense[]> => {
            const payload = { gofor: "expenselist" };
            return this.request<Expense[]>(payload, "GET");
        },

        get: async (expenseId: string | number): Promise<Expense> => {
            const payload = {
                gofor: "getexpense",
                expense_id: expenseId,
            };
            return this.request<Expense>(payload, "GET");
        },

        delete: async (expenseId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "deleteexpense",
                expense_id: expenseId,
            };
            return this.request<ApiResponse>(payload, "GET");
        },

        dailyReport: async (date: string): Promise<any> => {
            const payload = {
                gofor: "dailyexpensereport",
                expense_date: date,
            };
            return this.request<any>(payload, "GET");
        },
    };

    // Redemptions
    redemptions = {
        list: async (): Promise<Redemption[]> => {
            const payload = { gofor: "redemptionslist" };
            return this.request<Redemption[]>(payload, "GET");
        },

        verify: async (redemptionId: string | number): Promise<ApiResponse> => {
            const payload = {
                gofor: "redemptionverify",
                redemption_id: redemptionId,
            };
            return this.request<ApiResponse>(payload, "POST");
        },

        getStats: async (): Promise<RedemptionStats> => {
            const payload = { gofor: "redemptionstats" };
            return this.request<RedemptionStats>(payload, "GET");
        },
    };
}

// Export a singleton instance
export const api = new ApiService(API_URL);
