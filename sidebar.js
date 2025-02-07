document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menu-btn");
    const trendsLink = document.getElementById("trends-link");
  
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  
    trendsLink.addEventListener("click", function (e) {
      if (sidebar.classList.contains("collapsed")) {
        window.location.href = "home.html";
      } else {
        e.preventDefault();
        this.parentElement.classList.toggle("active");
      }
    });
  });
  