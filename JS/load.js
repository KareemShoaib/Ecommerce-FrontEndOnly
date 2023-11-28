
class Item {
    constructor(imagePath, productName, price) {
        this.imagePath = imagePath;
        this.productName = productName;
        this.price = price;
    }
}

function addToCart(productName, price, imagePath) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = new Item(imagePath, productName, price);
    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Broadcast the cart counter update event to other open pages
    broadcastCartCounterUpdate();
}

// Broadcast the cart counter update event to other open pages
function broadcastCartCounterUpdate() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = cartItems.length;

    // Post a message to other windows/tabs
    window.postMessage({ type: 'cartCounterUpdate', cartCounter }, '*');
}