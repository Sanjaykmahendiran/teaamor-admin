// Test script for Product and Category APIs
// This script demonstrates how to use the updated API endpoints

const API_URL = "https://teaamor.top/App/api.php";

// Helper function to make API requests
async function apiRequest(payload) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
}

// Test 1: Add Category
async function testAddCategory() {
    console.log("\n=== Test 1: Add Category ===");

    const payload = {
        gofor: "addcategory",
        cat_name: "Milk Tea",
        menu_type: "Main Menu"
    };

    console.log("Request:", JSON.stringify(payload, null, 2));

    try {
        const response = await apiRequest(payload);
        console.log("Response:", JSON.stringify(response, null, 2));
        return response.category_id;
    } catch (error) {
        console.error("Test failed:", error.message);
        return null;
    }
}

// Test 2: Edit Category
async function testEditCategory(categoryId) {
    console.log("\n=== Test 2: Edit Category ===");

    const payload = {
        gofor: "editcategory",
        category_id: categoryId || 1,
        cat_name: "Milk Tea (Updated)",
        menu_type: "Main Item",
        status: 1
    };

    console.log("Request:", JSON.stringify(payload, null, 2));

    try {
        const response = await apiRequest(payload);
        console.log("Response:", JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error("Test failed:", error.message);
        return null;
    }
}

// Test 3: Add Product
async function testAddProduct(categoryId) {
    console.log("\n=== Test 3: Add Product ===");

    const payload = {
        gofor: "addproducts",
        product_name: "Masala Tea",
        product_image: "https://teaamor.top/uploads/masala-tea.jpg",
        description: "Traditional Indian masala tea with aromatic spices",
        is_featured: 1,
        user_ratings: 4.6,
        price: 25,
        products_category: [
            {
                category_id: categoryId || 1
            }
        ]
    };

    console.log("Request:", JSON.stringify(payload, null, 2));

    try {
        const response = await apiRequest(payload);
        console.log("Response:", JSON.stringify(response, null, 2));
        return response.product_id;
    } catch (error) {
        console.error("Test failed:", error.message);
        return null;
    }
}

// Test 4: Edit Product
async function testEditProduct(productId, categoryId) {
    console.log("\n=== Test 4: Edit Product ===");

    const payload = {
        gofor: "editproducts",
        product_id: productId || 1,
        product_name: "Ginger Tea",
        product_image: "https://teaamor.top/uploads/ginger-tea.jpg",
        description: "Strong ginger tea for cold & digestion",
        is_featured: 1,
        user_ratings: 4.8,
        price: 30,
        products_category: [
            {
                category_id: categoryId || 1
            }
        ]
    };

    console.log("Request:", JSON.stringify(payload, null, 2));

    try {
        const response = await apiRequest(payload);
        console.log("Response:", JSON.stringify(response, null, 2));
        return response;
    } catch (error) {
        console.error("Test failed:", error.message);
        return null;
    }
}

// Test 5: Add Product with Multiple Categories
async function testAddProductMultipleCategories() {
    console.log("\n=== Test 5: Add Product with Multiple Categories ===");

    const payload = {
        gofor: "addproducts",
        product_name: "Chai Latte",
        product_image: "https://teaamor.top/uploads/chai-latte.jpg",
        description: "Creamy chai latte with perfect blend of spices",
        is_featured: 1,
        user_ratings: 4.7,
        price: 35,
        products_category: [
            { category_id: 1 },
            { category_id: 2 }
        ]
    };

    console.log("Request:", JSON.stringify(payload, null, 2));

    try {
        const response = await apiRequest(payload);
        console.log("Response:", JSON.stringify(response, null, 2));
        return response.product_id;
    } catch (error) {
        console.error("Test failed:", error.message);
        return null;
    }
}

// Run all tests
async function runAllTests() {
    console.log("╔════════════════════════════════════════════════════════╗");
    console.log("║   Tea Amor API Test Suite - Product & Category APIs   ║");
    console.log("╚════════════════════════════════════════════════════════╝");

    let categoryId = null;
    let productId = null;

    // Test 1: Add Category
    categoryId = await testAddCategory();

    // Test 2: Edit Category
    if (categoryId) {
        await testEditCategory(categoryId);
    } else {
        console.log("\nSkipping Edit Category test (no category ID from previous test)");
        await testEditCategory(1); // Use default ID
    }

    // Test 3: Add Product
    productId = await testAddProduct(categoryId || 1);

    // Test 4: Edit Product
    if (productId) {
        await testEditProduct(productId, categoryId || 1);
    } else {
        console.log("\nSkipping Edit Product test (no product ID from previous test)");
        await testEditProduct(1, categoryId || 1); // Use default ID
    }

    // Test 5: Add Product with Multiple Categories
    await testAddProductMultipleCategories();

    console.log("\n╔════════════════════════════════════════════════════════╗");
    console.log("║                   Tests Completed                      ║");
    console.log("╚════════════════════════════════════════════════════════╝\n");
}

// Individual test functions for manual testing
async function quickTestAddProduct() {
    console.log("Quick Test: Add Product");
    return await testAddProduct(1);
}

async function quickTestEditProduct() {
    console.log("Quick Test: Edit Product");
    return await testEditProduct(1, 1);
}

async function quickTestAddCategory() {
    console.log("Quick Test: Add Category");
    return await testAddCategory();
}

async function quickTestEditCategory() {
    console.log("Quick Test: Edit Category");
    return await testEditCategory(1);
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        apiRequest,
        testAddCategory,
        testEditCategory,
        testAddProduct,
        testEditProduct,
        testAddProductMultipleCategories,
        runAllTests,
        quickTestAddProduct,
        quickTestEditProduct,
        quickTestAddCategory,
        quickTestEditCategory
    };
}

// Run tests if executed directly
if (typeof require !== 'undefined' && require.main === module) {
    runAllTests();
}

// For browser testing, expose functions globally
if (typeof window !== 'undefined') {
    window.TeaAmorAPITests = {
        runAllTests,
        quickTestAddProduct,
        quickTestEditProduct,
        quickTestAddCategory,
        quickTestEditCategory
    };

    console.log("\n📝 API Test functions are available:");
    console.log("   - TeaAmorAPITests.runAllTests()");
    console.log("   - TeaAmorAPITests.quickTestAddProduct()");
    console.log("   - TeaAmorAPITests.quickTestEditProduct()");
    console.log("   - TeaAmorAPITests.quickTestAddCategory()");
    console.log("   - TeaAmorAPITests.quickTestEditCategory()");
}
