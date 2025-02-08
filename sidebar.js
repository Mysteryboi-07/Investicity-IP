document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menu-btn");
    const trendsLink = document.getElementById("trends-link");
  
    // Toggle the sidebar when the menu button is clicked.
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      // When the sidebar is collapsed, remove any active dropdowns.
      if (sidebar.classList.contains("collapsed")) {
        const activeDropdowns = sidebar.querySelectorAll(".dropdown.active");
        activeDropdowns.forEach(dropdown => dropdown.classList.remove("active"));
      }
    });
  
    // Toggle the Trends dropdown.
    trendsLink.addEventListener("click", function(e) {
      // If the sidebar is collapsed, simply navigate to home.html.
      if (sidebar.classList.contains("collapsed")) {
        window.location.href = "home.html";
      } else {
        e.preventDefault();
        // Toggle the active class on the parent <li> element to show/hide the dropdown menu.
        this.parentElement.classList.toggle("active");
      }
    });
  });
  