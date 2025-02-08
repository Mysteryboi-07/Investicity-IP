document.addEventListener("DOMContentLoaded", () => {
    // Parse the query parameter to get the asset id
    const urlParams = new URLSearchParams(window.location.search);
    const assetId = urlParams.get("asset") || "btc"; // Default to "btc" if not provided
  
    // In a complete implementation, you would fetch the asset data based on assetId.
    // For this demo, we use static values.
    const assetNameElem = document.getElementById("asset-name");
    const assetPriceElem = document.getElementById("asset-price");
    const assetLogoElem = document.getElementById("asset-logo");
    const modalTitleElem = document.getElementById("modal-title");
  
    if (assetId === "btc") {
      assetNameElem.textContent = "Bitcoin";
      assetPriceElem.textContent = "$40,050";
      assetLogoElem.src = "Images/btc-logo.png";
      modalTitleElem.textContent = "Trade Bitcoin";
    } else if (assetId === "eth") {
      assetNameElem.textContent = "Ethereum";
      assetPriceElem.textContent = "$2,500";
      assetLogoElem.src = "Images/eth-logo.png";
      modalTitleElem.textContent = "Trade Ethereum";
    }
    // Add additional asset conditions as needed
  
    // Modal logic for the "Trade" button
    const tradeButton = document.getElementById("trade-button");
    const modal = document.getElementById("trade-modal");
    const closeModal = document.getElementById("close-modal");
  
    tradeButton.addEventListener("click", () => {
      modal.style.display = "block";
    });
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  
    // Optionally, add event listeners for the "buy-asset" and "sell-asset" buttons
  });
  