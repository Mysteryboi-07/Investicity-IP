const APIKEY = "6796fc41f9d2bb1866181e28";
const BASE_URL = "https://investicity-c8aa.restdb.io/rest/investicity-data";

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  const signupButton = document.getElementById("signup-btn");
  const loginButton = document.getElementById("login-btn");

  console.log("Signup Button: ", signupButton);
  console.log("Login Button: ", loginButton);

  if (signupButton && loginButton) {
    signupButton.addEventListener("click", handleSignup);
    loginButton.addEventListener("click", handleLogin);
  }
}


function handleSignup(e) {
  e.preventDefault();
  if (!validateForm("signup-form")) return;

  const userData = getFormData("signup-form");
  toggleButton("signup-btn", true);

  const settings = createSettings("POST", userData);
  
  fetch(BASE_URL, settings)
    .then(response => response.json())
    .then(() => {
      alert("Signup successful!");
      window.location.href = "home.html";
    })
    .catch(() => alert("Signup failed. Please try again."))
    .finally(() => toggleButton("signup-btn", false));
}

function handleLogin(e) {
  e.preventDefault();
  if (!validateForm("login-form")) return;

  const { username, password } = getFormData("login-form");
  toggleButton("login-btn", true);

  const settings = createSettings("GET");
  
  fetch(BASE_URL, settings)
    .then(response => response.json())
    .then(users => {
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        alert("Login successful!");
        window.location.href = "home.html";
      } else {
        alert("Invalid username or password.");
      }
    })
    .catch(() => alert("Login failed. Please try again."))
    .finally(() => toggleButton("login-btn", false));
}

function createSettings(method, body = null) {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "x-apikey": APIKEY,
      "Cache-Control": "no-cache"
    },
    body: body ? JSON.stringify(body) : null
  };
}

function getFormData(type) {
  const prefix = type === "signup" ? "signup" : "login";
  return {
    username: document.getElementById(`${prefix}-username`).value.trim(),
    password: document.getElementById(`${prefix}-password`).value.trim()
  };
}

function validateForm(type) {
  const prefix = type === "signup" ? "signup" : "login";
  const fields = ["username", "password"];
  
  for (let field of fields) {
    const value = document.getElementById(`${prefix}-${field}`).value.trim();
    if (!value) {
      alert(`Please fill in the ${field} field.`);
      return false;
    }
  }
  return true;
}

function toggleButton(buttonId, disable) {
  document.getElementById(buttonId).disabled = disable;
}
