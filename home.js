document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menu-btn");
  
    menuBtn.addEventListener("click", () => {
      // Toggle the "collapsed" class on the sidebar.
      sidebar.classList.toggle("collapsed");
    });
  });