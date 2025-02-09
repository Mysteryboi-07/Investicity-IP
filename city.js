document.addEventListener("DOMContentLoaded", () => {
    const buyEsbBtn = document.getElementById("buy-esb-btn");
    
    if (buyEsbBtn) {
      buyEsbBtn.addEventListener("click", () => {
        // 1. Change the overhead city image in the left column.
        const cityPhoto = document.querySelector(".city-photo");
        if (cityPhoto) {
          cityPhoto.src = "Images/city-built.png";
        }
        
        // 2. Alert the user that the city has been built.
        alert("Empire State Building Constructed.");
        
        // 3. Show the badge modal popup.
        const badgeModal = document.getElementById("badge-modal");
        if (badgeModal) {
          badgeModal.style.display = "flex";
        }
        
        // 4. When the user clicks the confirm button in the modal:
        const confirmBadgeBtn = document.getElementById("confirm-badge-btn");
        confirmBadgeBtn.addEventListener("click", () => {
          // Hide the badge modal.
          if (badgeModal) {
            badgeModal.style.display = "none";
          }
          
          // Update the right column.
          const cityDetails = document.querySelector(".city-details");
          if (cityDetails) {
            // Update the city info text.
            const cityInfo = cityDetails.querySelector(".city-info");
            if (cityInfo) {
              cityInfo.innerHTML = "City# ??<br>???";
            }
            // Remove the ESB preview image.
            const esbPreview = cityDetails.querySelector(".esb-preview");
            if (esbPreview) {
              esbPreview.remove();
            }
            // Remove the buy button.
            const buyButton = document.getElementById("buy-esb-btn");
            if (buyButton) {
              buyButton.remove();
            }
            // Append new content: a Lottie animation and a message.
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
  