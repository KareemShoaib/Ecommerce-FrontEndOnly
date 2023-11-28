document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";

    document.getElementById("signup-link").addEventListener("click", function () {
      document.getElementById("login-form").style.display = "none";
      document.getElementById("signup-form").style.display = "block";
    });

    document.getElementById("loginForm").addEventListener("submit", function (event) {
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