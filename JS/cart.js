// JS/cart.js

window.onload = function () {
    loadCartItems();
    updateTotalPrice(); // Load total price when the page loads
    updateCartCounter(); // Load cart counter when the page loads

    // Listen for cart counter update messages from other pages
    window.addEventListener('message', function (event) {
        if (event.data.type === 'cartCounterUpdate') {
            updateCartCounter(event.data.cartCounter);
        }
    });
};


function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('cart-product');
        productDiv.innerHTML = `
            <img src="${item.imagePath}" alt="${item.productName}">
            <div>
                <p>${item.productName}</p>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(productDiv);
    });

    updateTotalPrice(); // Update total price after loading cart items
}

function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length > 0) {
        localStorage.removeItem('cart');
        alert('Purchase Successful!');
        window.dispatchEvent(new Event('cartUpdated'));
        loadCartItems();
        cartCounter=0;
        updateCartCounter();
    } else {
        alert('Your cart is empty. Add items before checking out.');
    }
}

function removeFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Dispatch the custom event when an item is removed from the cart
    window.dispatchEvent(new Event('cartUpdated'));
    window.dispatchEvent(new Event('cartCounterUpdated'));
    loadCartItems();
}

window.addEventListener('cartUpdated', function () {
    loadCartItems();
});

window.addEventListener('cartCounterUpdated', function () {
    updateCartCounter();
});

function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    for (const item of cart) {
        total += item.price;
    }

    totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
}

function updateCartCounter(cartCounter = null) {
    
    const cartCounterElement = document.getElementById('cartnavbar');
    if (cartCounter !== null) {
        cartCounterElement.textContent = `Cart (${cartCounter})`;
    } else {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartCounterElement.textContent = `Cart (${cartItems.length})`;
    }
}

