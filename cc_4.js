const products = [
    { name: "Laptop", category: "electronics", price: 1200, inventory: 5 },
    { name: "T-Shirt", category: "apparel", price: 30, inventory: 20 },
    { name: "Milk", category: "groceries", price: 4, inventory: 50 },
    { name: "Vacuum", category: "household", price: 150, inventory: 8 },
    { name: "Book", category: "education", price: 25, inventory: 15 }
];

for (const product of products) {
    let discountRate = 0;

    switch (product.category) {
        case "electronics":
            discountRate = 0.20;
            break;
        case "apparel":
            discountRate = 0.15;
            break;
        case "groceries":
        case "household":
            discountRate = 0.10;
            break;
        default:
            discountRate = 0;
            break;
    }

    product.discountedPrice = product.price - (product.price * discountRate);
}

let customerType = "student";
let extraDiscount = 0;

if (customerType === "student") {
    extraDiscount = 0.05;
} else if (customerType === "senior") {
    extraDiscount = 0.07;
} else {
    extraDiscount = 0;
}

for (let i = 1; i <= 3; i++) {
    let cartTotal = 0;

    for (const product of products) {
        if (product.inventory > 0) {
            cartTotal += product.discountedPrice;
            product.inventory--;
        }
    }

    cartTotal = cartTotal - (cartTotal * extraDiscount);

    console.log(`Customer ${i} total: $${cartTotal.toFixed(2)}`);
}

for (const key in products[0]) {
    console.log(`${key}: ${products[0][key]}`);
}

for (const product of products) {
    for (const [key, value] of Object.entries(product)) {
        console.log(`${key}: ${value}`);
    }
}
