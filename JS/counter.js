window.addEventListener('message', function (event) {
    if (event.data.type === 'cartCounterUpdate') {
        const cartCounterElement = document.getElementById('cartnavbar');
        cartCounterElement.textContent = `Cart (${event.data.cartCounter})`;
    }
});