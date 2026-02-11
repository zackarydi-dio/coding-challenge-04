// Retail Discount Engine - Dynamic Pricing Rules and Inventory Cycling

// Step 2: Create an array of 5 products with name, category, price, and inventory count
const products = [
  { name: "Laptop", category: "electronics", price: 999.99, inventory: 15 },
  { name: "T-Shirt", category: "apparel", price: 29.99, inventory: 50 },
  { name: "Milk", category: "groceries", price: 3.99, inventory: 100 },
  { name: "Dishwasher Detergent", category: "household", price: 8.99, inventory: 75 },
  { name: "Headphones", category: "electronics", price: 149.99, inventory: 30 }
];

console.log("=== INITIAL PRODUCTS ===");
console.log(products);

// Step 3: Use for...of loop to cycle through each product and apply category-based discounts with switch statement
// Step 4: Apply additional customer-based discount using if...else if chain

console.log("\n=== APPLYING DISCOUNTS ===");

// Define customer types for testing
const customerTypes = ["regular", "student", "senior"];

// Step 5: Simulate checkout process for 3 customers using a for loop
console.log("\n=== CHECKOUT PROCESS FOR 3 CUSTOMERS ===\n");

for (let customerNum = 1; customerNum <= 3; customerNum++) {
  // Assign customer type and calculate total for this customer
  const customerType = customerTypes[customerNum - 1];
  let customerTotal = 0;

  console.log(`--- Customer ${customerNum} (${customerType}) ---`);

  // Create a copy of products for this customer's shopping session
  const productsForCustomer = JSON.parse(JSON.stringify(products));

  // for...of loop to iterate through each product and apply discounts
  for (const product of productsForCustomer) {
    // Step 3: Switch statement for category-based discount
    let categoryDiscount = 0;
    switch (product.category) {
      case "electronics":
        categoryDiscount = 0.20; // 20% off
        break;
      case "apparel":
        categoryDiscount = 0.15; // 15% off
        break;
      case "groceries":
      case "household":
        categoryDiscount = 0.10; // 10% off
        break;
      default:
        categoryDiscount = 0; // No discount
    }

    // Calculate price after category discount
    const priceAfterCategoryDiscount = product.price * (1 - categoryDiscount);

    // Step 4: if...else if chain for additional customer-based discount
    let customerDiscount = 0;
    if (customerType === "student") {
      customerDiscount = 0.05; // 5% extra off
    } else if (customerType === "senior") {
      customerDiscount = 0.07; // 7% extra off
    }
    // Otherwise: no extra discount (default is 0)

    // Calculate final price with both discounts
    const finalPrice = priceAfterCategoryDiscount * (1 - customerDiscount);

    // Add to customer total (assuming 1 quantity per product for this checkout)
    customerTotal += finalPrice;

    // Reduce inventory count by 1 for each product purchased
    product.inventory -= 1;
  }

  // Display customer number and total cost
  console.log(`Total Cost: $${customerTotal.toFixed(2)}`);
  console.log();

  // After each customer, update the main products array inventory
  for (let i = 0; i < products.length; i++) {
    products[i].inventory = productsForCustomer[i].inventory;
  }
}

// Step 6: Use for...in to log each key/value pair for a single product after discounts
console.log("=== PRODUCT DETAILS USING for...in ===\n");
const singleProduct = products[0]; // Laptop
console.log("Laptop Product Details:");
for (const key in singleProduct) {
  console.log(`${key}: ${singleProduct[key]}`);
}

// Step 7: Use Object.entries() and destructuring to log all product info after inventory is updated
console.log("\n=== ALL PRODUCTS AFTER INVENTORY UPDATES ===\n");
for (const product of products) {
  // Using Object.entries() with destructuring
  const entries = Object.entries(product);
  console.log(`Product: ${product.name}`);
  for (const [key, value] of entries) {
    console.log(`  ${key}: ${value}`);
  }
  console.log();
}

console.log("=== DISCOUNT ENGINE COMPLETE ===");
