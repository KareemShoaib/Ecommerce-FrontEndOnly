
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

   
    broadcastCartCounterUpdate();
}


function broadcastCartCounterUpdate() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = cartItems.length;
    window.postMessage({ type: 'cartCounterUpdate', cartCounter }, '*');
}