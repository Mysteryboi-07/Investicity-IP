document.addEventListener("DOMContentLoaded", () => {
    const buyEsbBtn = document.getElementById("buy-esb-btn");
    
    if (buyEsbBtn) {
      buyEsbBtn.addEventListener("click", () => {
        const cityPhoto = document.querySelector(".city-photo");
        if (cityPhoto) {
          cityPhoto.src = "Images/city-built.png";
        }
        
        alert("Empire State Building Constructed.");
        
        const badgeModal = document.getElementById("badge-modal");
        if (badgeModal) {
          badgeModal.style.display = "flex";
        }
        
        const confirmBadgeBtn = document.getElementById("confirm-badge-btn");
        confirmBadgeBtn.addEventListener("click", () => {
          if (badgeModal) {
            badgeModal.style.display = "none";
          }
          
          const cityDetails = document.querySelector(".city-details");
          if (cityDetails) {
            const cityInfo = cityDetails.querySelector(".city-info");
            if (cityInfo) {
              cityInfo.innerHTML = "City# ??<br>???";
            }
            const esbPreview = cityDetails.querySelector(".esb-preview");
            if (esbPreview) {
              esbPreview.remove();
            }
            const buyButton = document.getElementById("buy-esb-btn");
            if (buyButton) {
              buyButton.remove();
            }
            const updateContainer = document.createElement("div");
            updateContainer.classList.add("city-update");
            updateContainer.innerHTML = `
              <dotlottie-player src="https://lottie.host/f74074cf-83f9-422b-900e-9a85aa156f47/FZnKCag3cc.json" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>
              <p class="end-message">You've reached the end of the current content</p>
            `;
            cityDetails.appendChild(updateContainer);
          }
        }, { once: true });
      });
    }
  });
  