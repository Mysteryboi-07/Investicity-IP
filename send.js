document.addEventListener("DOMContentLoaded", () => {
    // Get references to elements
    const transferBtn = document.getElementById("transfer-btn");
    const qrIcon = document.querySelector(".qr-icon");
    const qrModal = document.getElementById("qr-modal");
    const closeQrModal = document.getElementById("close-qr-modal");
    const modalAmount = document.getElementById("modal-amount");
    const amountInput = document.getElementById("amount-input");
    const amountCurrency = document.getElementById("amount-currency");
  
    // Handle Transfer Button Click (Form Submission)
    transferBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      // Retrieve form values
      const recipientId = document.getElementById("recipient-id").value.trim();
      const asset = amountCurrency.value;
      const amount = amountInput.value.trim();
  
      // Validate Recipient ID (must be 10 digits) and that asset & amount are valid
      const recipientPattern = /^\d{10}$/;
      if (!recipientId.match(recipientPattern)) {
        alert("Please enter a valid 10-digit Recipient ID.");
        return;
      }
      if (!asset || !amount || parseFloat(amount) <= 0) {
        alert("Please complete all fields with valid values.");
        return;
      }
  
      // For demonstration, simply alert the transfer details
      alert(`Transferring ${amount} ${asset.toUpperCase()} to Recipient ID: ${recipientId}`);
  
      // Optionally, clear the recipient field after successful submission
      document.getElementById("recipient-id").value = "";
    });
  
    // Handle QR Code Icon Click: show the modal with the amount and asset type
    qrIcon.addEventListener("click", () => {
      const assetType = amountCurrency.value; // Get the selected asset type (e.g., 'btc')
      // Set modal text to display both the amount and asset type (uppercase)
      modalAmount.textContent = amountInput.value + " " + assetType.toUpperCase();
      qrModal.style.display = "flex";  // Use flex to center the modal content
    });
  
    // Handle Close Button Click in the QR Modal
    closeQrModal.addEventListener("click", () => {
      qrModal.style.display = "none";
    });
  
    // Close modal if clicking outside the modal content
    window.addEventListener("click", (e) => {
      if (e.target === qrModal) {
        qrModal.style.display = "none";
      }
    });
  });
  