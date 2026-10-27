
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
        button.textContent = "Order Now";

        button.onclick = function() {
            placeOrder(restaurant, food);
        };

        info.appendChild(name);
        info.appendChild(price);

        card.appendChild(info);
        card.appendChild(button);

        foodList.appendChild(card);
    });
}

function placeOrder(restaurant, food) {
    const confirmOrder = confirm(
        "Confirm your order?\n\n" +
        "Restaurant: " + restaurant + "\n" +
        "Food: " + food.name + "\n" +
        "Price: ₹" + food.price
    );

    if (!confirmOrder) {
        return;
    }

    document.getElementById("foods").hidden = true;
    document.getElementById("confirmation").hidden = false;

    document.getElementById("order-details").innerHTML =
        "<strong>Restaurant:</strong> " + restaurant + "<br>" +
        "<strong>Food:</strong> " + food.emoji + " " + food.name + "<br>" +
        "<strong>Total Price:</strong> ₹" + food.price;
}

function goBack() {
    document.getElementById("foods").hidden = true;
    document.getElementById("restaurants").hidden = false;
}

function restartApp() {
    document.getElementById("confirmation").hidden = true;
    document.getElementById("restaurants").hidden = false;
}
