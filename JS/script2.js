try{
document.addEventListener('DOMContentLoaded', function () {
    var shopWithMeText = document.getElementById('shopWithMe');
    document.getElementById('decreaseFontSize').addEventListener('click', function () {
        var currentSize = window.getComputedStyle(shopWithMeText).fontSize;
        shopWithMeText.style.fontSize = (parseFloat(currentSize) * 0.8) + 'px';
    });

    
    document.getElementById('changeColor').addEventListener('click', function () {
        shopWithMeText.style.color = 'blue'; 
    });

   
    document.getElementById('changeFontFamily').addEventListener('click', function () {
        shopWithMeText.style.fontFamily = 'Arial, sans-serif';
    });

  
    document.getElementById('hideText').addEventListener('click', function () {
        shopWithMeText.style.display = 'none';
    });

    document.getElementById('appText').addEventListener('click', function () {
        shopWithMeText.style.display = 'block';
    })

    
    document.getElementById('makeBold').addEventListener('click', function () {
        shopWithMeText.style.fontWeight = 'bold';
    });

   
    document.getElementById('makeItalic').addEventListener('click', function () {
        shopWithMeText.style.fontStyle = 'italic';
    });


    document.getElementById('reset').addEventListener('click', function () {
        shopWithMeText.style.fontSize = '70px';
        shopWithMeText.style.color = ''; 
        shopWithMeText.style.fontFamily = ''; 
        shopWithMeText.style.display = ''; 
        shopWithMeText.style.fontWeight = ''; 
        shopWithMeText.style.fontStyle = ''; 
    });
});
}
catch(e){}

try{
   
    const qAndA = [
      { question: "What is the capital of France?", answer: "Paris" },
      { question: "What is the largest planet in our solar system?", answer: "Jupiter" },
      { question: "How many continents are there?", answer: "7" }
      
    ];
  
  
    let currentQuestionIndex = 0;
  
 
    function displayQuestion() {
      const questionBox = document.getElementById('questionBox');
      questionBox.innerText = qAndA[currentQuestionIndex].question;
    }
  
   
    function checkAnswer() {

      const userAnswerInput = document.getElementById('userAnswer');
      const userAnswer = userAnswerInput.value.toLowerCase();
  
  
      if (userAnswer === qAndA[currentQuestionIndex].answer.toLowerCase()) {
        displayResult("Correct! Well done.");
      } else {
        displayResult("Sorry, that's not correct. Try again.");
      }
  
      userAnswerInput.value = '';
  
   
      currentQuestionIndex++;
  
 
      if (currentQuestionIndex < qAndA.length) {
        displayQuestion();
      } else {
        displayResult("Game Over. You've completed all questions!");
      }
    }
  

    function displayResult(message) {
      document.getElementById('result').innerText = message;
    }
  
    displayQuestion();
}

catch(e){}





try{
document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const showLoginForm = queryParams.get("show") === "login";
  
    if (showLoginForm) {
      document.getElementById("login-form").style.display = "block";
      document.getElementById("signup-form").style.display = "none";
    }
  });
}
catch(e){}
    try{
    document.getElementById("login-form").style.display = "none";
      document.getElementById("signup-form").style.display = "block";
    }

    catch(e){

    }
  
    try{
      document.getElementById("signup-link").addEventListener("click", function () {
        document.getElementById("login-form").style.display = "none";
        document.getElementById("signup-form").style.display = "block";
        
      });
    }

    catch(e){}
  
      try{document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        
  
    
        const userExists = users.some(user => user.username === username && user.password === password);
  
        if (userExists) {
          alert("Login successful!");
         
          window.location.href = "Clothes.html";
        } else {
          alert("Invalid username or password.");
        }
      });
      }

      catch(e){

      }
  
      try{
      document.getElementById("signupForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const newUsername = document.getElementById("newUsername").value;
        const newPassword = document.getElementById("newPassword").value;
  
        if (newPassword.length < 4) {
          alert('Invalid password. Password must be at least 4 characters.');
          return;
      }
  
      if (!/^[a-zA-Z]+$/.test(newUsername)) {
        alert('Invalid name. Please enter a name with only alphabets.');
        return;
    }
  
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
     
        users.push({ username: newUsername, password: newPassword });
  
     
        localStorage.setItem("users", JSON.stringify(users));
  
    
        document.getElementById("signupForm").reset();
        document.getElementById("login-form").style.display = "block";
        document.getElementById("signup-form").style.display = "none";
  
      });
    }
    catch(e){}


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



window.onload = function () {
    loadCartItems();
    updateTotalPrice();
    updateCartCounter(); 
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

    updateTotalPrice();
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

window.addEventListener('message', function (event) {
    if (event.data.type === 'cartCounterUpdate') {
        const cartCounterElement = document.getElementById('cartnavbar');
        cartCounterElement.textContent = `Cart (${event.data.cartCounter})`;
    }
});

    