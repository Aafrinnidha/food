
const menu = {

    "Crave Corner": [
        { name: "Cheese Burger", price: 140, emoji: "🍔" },
        { name: "Veg Pizza", price: 160, emoji: "🍕" },
        { name: "French Fries", price: 80, emoji: "🍟" },
        { name: "Pasta", price: 130, emoji: "🍝" },
        { name: "Sandwich", price: 100, emoji: "🥪" },
        { name: "Cold Drink", price: 60, emoji: "🥤" }
    ],

    "Spice Street": [
        { name: "Masala Dosa", price: 80, emoji: "🥞" },
        { name: "Idli", price: 40, emoji: "🍘" },
        { name: "Veg Meals", price: 120, emoji: "🍛" },
        { name: "Fried Rice", price: 110, emoji: "🍚" },
        { name: "Paneer Roll", price: 90, emoji: "🌯" },
        { name: "Fresh Juice", price: 50, emoji: "🧃" }
    ]

};

// Global shopping cart
let cart = [];

// Show food menu
function showFoods(restaurant) {

    document.getElementById("restaurants").hidden = true;
    document.getElementById("foods").hidden = false;
    document.getElementById("confirmation").hidden = true;

    document.getElementById("restaurant-title").textContent =
        restaurant + " - Available Food";

    const foodList = document.getElementById("food-list");

    foodList.innerHTML = "";

    menu[restaurant].forEach(function(food) {

        const card = document.createElement("div");
        card.className = "food-card";

        const info = document.createElement("div");
        info.className = "food-info";

        const name = document.createElement("h3");
        name.textContent = food.emoji + " " + food.name;

        const price = document.createElement("p");
        price.textContent = "Price: ₹" + food.price;

        const button = document.createElement("button");

        button.textContent = "Add to Cart";

        button.onclick = function() {
            addToCart(food, restaurant);
        };

        info.appendChild(name);
        info.appendChild(price);

        card.appendChild(info);
        card.appendChild(button);

        foodList.appendChild(card);

    });

    displayCart();
}


// Add multiple food items to cart
function addToCart(food, restaurant) {

    const existingItem = cart.find(function(item) {

        return item.name === food.name &&
               item.restaurant === restaurant;

    });

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: food.name,
            price: food.price,
            emoji: food.emoji,
            restaurant: restaurant,
            quantity: 1

        });

    }

    displayCart();

    alert(food.name + " added to cart!");

}


// Display all cart items
function displayCart() {

    const cartItems = document.getElementById("cart-items");

    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cart.forEach(function(item, index) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        const card = document.createElement("div");

        card.className = "food-card";

        const info = document.createElement("div");

        info.className = "food-info";

        const name = document.createElement("h3");

        name.textContent = item.emoji + " " + item.name;

        const restaurant = document.createElement("p");

        restaurant.textContent = "Restaurant: " + item.restaurant;

        const price = document.createElement("p");

        price.textContent = "Price: ₹" + item.price;

        const quantity = document.createElement("p");

        quantity.textContent = "Quantity: " + item.quantity;

        const subtotalText = document.createElement("p");

        subtotalText.textContent = "Subtotal: ₹" + subtotal;

        info.appendChild(name);
        info.appendChild(restaurant);
        info.appendChild(price);
        info.appendChild(quantity);
        info.appendChild(subtotalText);

        const controls = document.createElement("div");

        controls.className = "cart-controls";

        const increase = document.createElement("button");

        increase.textContent = "+";

        increase.onclick = function() {

            changeQuantity(index, 1);

        };

        const decrease = document.createElement("button");

        decrease.textContent = "-";

        decrease.onclick = function() {

            changeQuantity(index, -1);

        };

        const remove = document.createElement("button");

        remove.textContent = "Remove";

        remove.className = "remove-btn";

        remove.onclick = function() {

            removeFromCart(index);

        };

        controls.appendChild(increase);
        controls.appendChild(decrease);
        controls.appendChild(remove);

        card.appendChild(info);
        card.appendChild(controls);

        cartItems.appendChild(card);

    });

    // Automatically calculate total
    cartTotal.textContent = total;

}


// Increase or decrease quantity
function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    displayCart();

}


// Remove individual item
function removeFromCart(index) {

    cart.splice(index, 1);

    displayCart();

}


// Clear entire cart
function clearCart() {

    if (cart.length === 0) {

        alert("Your cart is already empty!");

        return;

    }

    if (confirm("Do you want to remove all cart items?")) {

        cart = [];

        displayCart();

    }

}


// Checkout all cart items
function checkout() {

    if (cart.length === 0) {

        alert("Please add items to your cart!");

        return;

    }

    let total = 0;

    let details = "";

    // Loop through EVERY cart item
    cart.forEach(function(item) {

        const subtotal = item.price * item.quantity;

        total += subtotal;

        details += `
            <div class="order-item">

                <h3>${item.emoji} ${item.name}</h3>

                <p>Restaurant: ${item.restaurant}</p>

                <p>Quantity: ${item.quantity}</p>

                <p>Price: ₹${item.price}</p>

                <p>Subtotal: ₹${subtotal}</p>

            </div>
        `;

    });

    const confirmOrder = confirm(

        "Confirm your order?\n\n" +
        "Total Items: " + cart.length +
        "\nTotal Amount: ₹" + total

    );

    if (!confirmOrder) {

        return;

    }

    // Show confirmation page
    document.getElementById("foods").hidden = true;

    document.getElementById("confirmation").hidden = false;

    // Display ALL ordered items
    document.getElementById("order-details").innerHTML =

        "<h3>Order Summary</h3>" +

        details +

        "<h2>Total Amount: ₹" + total + "</h2>";

    // Empty cart after successful confirmation
    cart = [];

    displayCart();

}


// Back to restaurants
function goBack() {

    document.getElementById("foods").hidden = true;

    document.getElementById("restaurants").hidden = false;

}


// Order again
function restartApp() {

    document.getElementById("confirmation").hidden = true;

    document.getElementById("restaurants").hidden = false;

    document.getElementById("foods").hidden = true;

}
