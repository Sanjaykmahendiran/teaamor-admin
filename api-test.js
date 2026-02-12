// API Test Script - Run this in browser console to test API connectivity

// Test 1: Check if API URL is loaded
console.log('🔍 Testing API Configuration...');
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL || 'https://teaamor.top/App/api.php');

// Test 2: Test basic connectivity
async function testAPIConnection() {
    console.log('\n📡 Testing API Connection...');

    try {
        const response = await fetch('https://teaamor.top/App/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gofor: 'dashboard'
            })
        });

        console.log('✅ Response Status:', response.status);
        console.log('✅ Response OK:', response.ok);

        const data = await response.json();
        console.log('✅ Response Data:', data);

        return data;
    } catch (error) {
        console.error('❌ API Connection Error:', error);
        console.error('Error Details:', {
            message: error.message,
            name: error.name,
            stack: error.stack
        });
        return null;
    }
}

// Test 3: Test with CORS
async function testCORS() {
    console.log('\n🌐 Testing CORS...');

    try {
        const response = await fetch('https://teaamor.top/App/api.php', {
            method: 'OPTIONS',
        });

        console.log('CORS Headers:', {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        });
    } catch (error) {
        console.error('❌ CORS Test Failed:', error);
    }
}

// Test 4: Test Add Product
async function testAddProduct() {
    console.log('\n📦 Testing Add Product...');

    try {
        const response = await fetch('https://teaamor.top/App/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gofor: 'addproduct',
                product_name: 'Test Product',
                short_description: 'Test Description',
                price: 10,
                category: 'Test Category',
                imgname: 'https://example.com/test.jpg'
            })
        });

        const data = await response.json();
        console.log('✅ Add Product Response:', data);

        return data;
    } catch (error) {
        console.error('❌ Add Product Error:', error);
        return null;
    }
}

// Test 5: Test Add Category
async function testAddCategory() {
    console.log('\n📁 Testing Add Category...');

    try {
        const response = await fetch('https://teaamor.top/App/api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                gofor: 'addcategory',
                category_name: 'Test Category',
                tab_type: 'Menu Items'
            })
        });

        const data = await response.json();
        console.log('✅ Add Category Response:', data);

        return data;
    } catch (error) {
        console.error('❌ Add Category Error:', error);
        return null;
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting API Tests...\n');

    await testAPIConnection();
    await testCORS();
    await testAddCategory();
    await testAddProduct();

    console.log('\n✅ All tests completed!');
    console.log('📋 Check the results above for any errors.');
}

// Auto-run tests
runAllTests();

// Export functions for manual testing
window.apiTest = {
    testConnection: testAPIConnection,
    testCORS: testCORS,
    testAddProduct: testAddProduct,
    testAddCategory: testAddCategory,
    runAll: runAllTests
};

console.log('\n💡 You can also run individual tests:');
console.log('  - apiTest.testConnection()');
console.log('  - apiTest.testCORS()');
console.log('  - apiTest.testAddProduct()');
console.log('  - apiTest.testAddCategory()');
console.log('  - apiTest.runAll()');
