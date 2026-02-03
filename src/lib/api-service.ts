const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
if (typeof window !== "undefined") {
    console.log("API Service Initialized with Base URL:", API_BASE_URL || "(relative path)");
}

// Helpers
const getAuthToken = () => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("auth_token");
    }
    return null;
};

const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
    }
};

const removeAuthToken = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
    }
};

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

const fetchClient = async (endpoint: string, options: FetchOptions = {}) => {
    const token = getAuthToken();

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config: RequestInit = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Initial handling of unauthenticated requests
        if (response.status === 401) {
            removeAuthToken();
            // Optionally redirect to login if not already there
            if (typeof window !== "undefined" && window.location.pathname !== "/") {
                window.location.href = "/";
            }
            throw new Error("Unauthorized");
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
        }

        // Attempt to parse JSON
        try {
            return await response.json();
        } catch {
            return null; // For empty successful responses
        }

    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
};

// --- API Service ---

export const api = {
    // Authentication
    auth: {
        login: async (username: string, password: string) => {
            // POST ?gofor=alogin with username, password
            const data = await fetchClient("?gofor=alogin", {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });
            if (data && data.token) {
                setAuthToken(data.token);
            }
            return data;
        },
        logout: () => {
            removeAuthToken();
            if (typeof window !== "undefined") {
                window.location.href = "/";
            }
        },
        getToken: getAuthToken,
    },

    // Dashboard
    dashboard: () => fetchClient("?gofor=dashboard"),

    // Orders
    orders: {
        list: () => fetchClient("?gofor=orderslist"),
        get: (order_id: string | number) => fetchClient(`?gofor=getorder&order_id=${order_id}`),
        updateStatus: (order_id: string | number, order_status: string) =>
            fetchClient("?gofor=updateorderstatus", {
                method: "POST",
                body: JSON.stringify({ order_id, order_status }),
            }),
    },

    // Customers
    customers: {
        list: () => fetchClient("?gofor=customerslist"),
        inactiveList: () => fetchClient("?gofor=inactivecustomerslist"),
        get: (customer_id: string | number) => fetchClient(`?gofor=customersget&customer_id=${customer_id}`),
        wishlist: (customer_id: string | number) => fetchClient(`?gofor=wishlist&customer_id=${customer_id}`),
        addresses: (customer_id: string | number) => fetchClient(`?gofor=addresslist&customer_id=${customer_id}`),
        orders: (customer_id: string | number) => fetchClient(`?gofor=vieworders&customer_id=${customer_id}`),
    },

    // Branches
    branches: {
        list: () => fetchClient("?gofor=brancheslist"),
        get: (branch_id: string | number) => fetchClient(`?gofor=getbranch&branch_id=${branch_id}`),
        add: (data: { branch_name: string; location: string; map_link: string; contact_number: string }) =>
            fetchClient("?gofor=addbranches", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        edit: (branch_id: string | number, data: { branch_name: string; location: string; map_link: string; contact_number: string }) =>
            fetchClient("?gofor=editbranches", {
                method: "POST",
                body: JSON.stringify({ branch_id, ...data }),
            }),
        delete: (branch_id: string | number) =>
            fetchClient("?gofor=deletebranch", {
                method: "POST",
                body: JSON.stringify({ branch_id }),
            }),
    },

    // Blogs & Case Studies
    blogs: {
        list: () => fetchClient("?gofor=blogslist"),
        delete: (blog_id: string | number) =>
            fetchClient("?gofor=deleteblogs", {
                method: "POST",
                body: JSON.stringify({ blog_id }),
            }),
        getCaseStudy: (case_study_id: string | number) => fetchClient(`?gofor=getcasestudy&case_study_id=${case_study_id}`),
        addCaseStudy: (data: any) =>
            fetchClient("?gofor=addcasestudy", {
                method: "POST",
                body: JSON.stringify(data),
            }),
        editCaseStudy: (case_study_id: string | number, data: any) =>
            fetchClient("?gofor=editcasestudy", {
                method: "POST",
                body: JSON.stringify({ case_study_id, ...data }),
            }),
    },

    // Tags
    tags: {
        list: () => fetchClient("?gofor=tagslist"),
        delete: (tags_id: string | number) =>
            fetchClient("?gofor=deletetag", {
                method: "POST",
                body: JSON.stringify({ tags_id }),
            }),
    },

    // Users
    users: {
        get: (user_id: string | number) => fetchClient(`?gofor=userget&user_id=${user_id}`),
    },

    // Utilities
    utils: {
        uploadImage: async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);

            const token = getAuthToken();
            const headers: Record<string, string> = {};
            if (token) headers["Authorization"] = `Bearer ${token}`;

            const response = await fetch(`${API_BASE_URL}?gofor=image_upload`, {
                method: "POST",
                headers,
                body: formData,
            });

            if (!response.ok) throw new Error("Image upload failed");
            return await response.json();
        }
    }
};
