const APIKEY = "6796fc41f9d2bb1866181e28";
const BASE_URL = "https://investicity-c8aa.restdb.io/rest/investicity-data";

// Only run the authentication logic on the index page.
if (document.body.id === "index-page") {
  document.addEventListener("DOMContentLoaded", initializeApp); 
}

function initializeApp() {
  // Remove any inline onclicks and use these event listeners instead.
  document.getElementById("signup-link").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior
    toggleForms("signup");
  });
  document.getElementById("login-link").addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms("login");
  });
  document.getElementById("login-form-element").addEventListener("submit", handleLogin);
  document.getElementById("signup-form-element").addEventListener("submit", handleSignup);
}

function toggleForms(formToShow) {
  const loginContainer = document.getElementById("login-form");
  const signupContainer = document.getElementById("signup-form");

  if (formToShow === "login") {
    loginContainer.style.display = "block";
    signupContainer.style.display = "none";
  } else if (formToShow === "signup") {
    signupContainer.style.display = "block";
    loginContainer.style.display = "none";
  }
}

function handleSignup(e) {
  e.preventDefault();
  if (!validateSignupForm()) return;

  const userData = getFormData("signup");
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
  if (!validateForm("login")) return;

  const { username, password } = getFormData("login");
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

function validateSignupForm() {
  // First, validate the basic fields
  if (!validateForm("signup")) return false;
  
  // Then, check that the password and confirm password match
  const password = document.getElementById("signup-password").value.trim();
  const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
  
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }
  
  return true;
}

function toggleButton(buttonId, disable) {
  document.getElementById(buttonId).disabled = disable;
}
