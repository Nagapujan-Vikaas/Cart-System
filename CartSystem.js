let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, quantity){
    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        cart[index].quantity += quantity;
    } else {
        cart.push({name, price, quantity});
    }

    displayCart();
}

function removeFromCart(name){
    cart = cart.filter(item => item.name !== name);
    displayCart();
}

function updateQuantity(name, quantity){
    quantity = parseInt(quantity);

    const index = cart.findIndex(item => item.name === name);

    if(index !== -1){
        cart[index].quantity = quantity;

        if(quantity <= 0){
            removeFromCart(name);
        }
    }

    displayCart();
}

function displayCart(){
    const container = document.getElementById("cartItems");
    const totalItems = document.getElementById("totalItems");
    const totalPrice = document.getElementById("totalPrice");
    const cartCount = document.getElementById("cartCount");

    container.innerHTML = "";

    if(cart.length === 0){
        container.innerHTML = "<p class='text-center'>Cart is empty</p>";
        totalItems.textContent = 0;
        totalPrice.textContent = "0.00";
        cartCount.textContent = 0;
        return;
    }

    let itemCount = 0;
    let totalCost = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        itemCount += item.quantity;
        totalCost += itemTotal;

        const div = document.createElement("div");

        div.classList.add("d-flex","justify-content-between","align-items-center","mb-2");

        div.innerHTML = `
            <div>
                <small>${item.name}</small><br>
                <small>₹${item.price} x ${item.quantity}</small>
            </div>

            <div>
                <input type="number" value="${item.quantity}" min="1"
                style="width:50px"
                onchange="updateQuantity('${item.name}', this.value)">
                
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.name}')">X</button>
            </div>
        `;

        container.appendChild(div);
    });

    totalItems.textContent = itemCount;
    totalPrice.textContent = totalCost.toFixed(2);
    cartCount.textContent = itemCount;

    localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout(){
    if(cart.length === 0){
        alert("Cart is empty!");
        return;
    }

    alert("Order placed successfully!");

    cart = [];
    localStorage.removeItem("cart");
    displayCart();
}

displayCart();
