const initialProducts = [
    { name: "Laptop", category: "electronics", price: 1200, inventory: 5 },
    { name: "T-Shirt", category: "apparel", price: 30, inventory: 20 },
    { name: "Milk", category: "groceries", price: 4, inventory: 50 },
    { name: "Vacuum", category: "household", price: 150, inventory: 8 },
    { name: "Book", category: "education", price: 25, inventory: 15 }
];

const customerType = "student";
const checkoutCycles = 3;

function getCategoryDiscountRate(category) {
    switch (category) {
        case "electronics":
            return 0.20;
        case "apparel":
            return 0.15;
        case "groceries":
        case "household":
            return 0.10;
        default:
            return 0;
    }
}

function getCustomerDiscountRate(type) {
    if (type === "student") {
        return 0.05;
    }

    if (type === "senior") {
        return 0.07;
    }

    return 0;
}

function calculateDiscountedPrice(price, discountRate) {
    return price * (1 - discountRate);
}

function createProductCatalog(products) {
    return products.map((product) => ({
        ...product,
        discountedPrice: calculateDiscountedPrice(
            product.price,
            getCategoryDiscountRate(product.category)
        )
    }));
}

function simulateCheckout(catalog, cycles, customerDiscountRate) {
    const report = [];
    const inventory = catalog.map((product) => ({ ...product }));

    for (let cycle = 1; cycle <= cycles; cycle += 1) {
        const itemsPurchased = inventory.filter((product) => product.inventory > 0);

        if (itemsPurchased.length === 0) {
            report.push(`Cycle ${cycle}: no inventory remaining.`);
            continue;
        }

        const totalBeforeCustomerDiscount = itemsPurchased.reduce((sum, product) => {
            sum += product.discountedPrice;
            product.inventory -= 1;
            return sum;
        }, 0);

        const finalTotal = calculateDiscountedPrice(totalBeforeCustomerDiscount, customerDiscountRate);
        report.push(`Cycle ${cycle}: ${itemsPurchased.length} item(s) purchased, total $${finalTotal.toFixed(2)}.`);
    }

    return report;
}

function formatInventoryReport(catalog) {
    return catalog.map((product) => {
        return `- ${product.name} (${product.category}): $${product.discountedPrice.toFixed(2)}, inventory ${product.inventory}`;
    });
}

function renderReport(lines) {
    const reportElement = typeof document !== "undefined" && document.getElementById("report");
    const formattedText = lines.join("\n");

    if (reportElement) {
        reportElement.textContent = formattedText;
    }

    console.log(formattedText);
}

function runSimulation() {
    const catalog = createProductCatalog(initialProducts);
    const customerDiscountRate = getCustomerDiscountRate(customerType);
    const summaryLines = [
        `Customer type: ${customerType}`,
        "Category discounts and inventory simulation:",
        "",
        "Initial inventory and discounted prices:",
        ...formatInventoryReport(catalog),
        "",
        ...simulateCheckout(catalog, checkoutCycles, customerDiscountRate)
    ];

    renderReport(summaryLines);
}

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", runSimulation);
} else {
    runSimulation();
}
