const API_URL = "https://teaamor.top/App/api.php";

export const fetchOrders = async (status) => {
    try {
        const url = status === "ALL"
            ? `${API_URL}?gofor=orderslist`
            : `${API_URL}?gofor=orderslist&order_status=${status}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch orders failed:", error);
        throw error;
    }
};

export const placeOrder = async (orderData) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...orderData,
                gofor: "placeorder" // Assuming the gofor parameter is needed based on previous patterns
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Place order failed:", error);
        throw error;
    }
};
