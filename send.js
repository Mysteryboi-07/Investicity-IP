document.addEventListener("DOMContentLoaded", () => {
    const transferBtn = document.getElementById("transfer-btn");
    const qrIcon = document.querySelector(".qr-icon");
    const qrModal = document.getElementById("qr-modal");
    const closeQrModal = document.getElementById("close-qr-modal");
    const modalAmount = document.getElementById("modal-amount");
    const amountInput = document.getElementById("amount-input");
    const amountCurrency = document.getElementById("amount-currency");
  
    transferBtn.addEventListener("click", (e) => {
      e.preventDefault();
  
      const recipientId = document.getElementById("recipient-id").value.trim();
      const asset = amountCurrency.value;
      const amount = amountInput.value.trim();
  
      const recipientPattern = /^\d{10}$/;
      if (!recipientId.match(recipientPattern)) {
        alert("Please enter a valid 10-digit Recipient ID.");
        return;
      }
      if (!asset || !amount || parseFloat(amount) <= 0) {
        alert("Please complete all fields with valid values.");
        return;
      }
  
      alert(`Transferring ${amount} ${asset.toUpperCase()} to Recipient ID: ${recipientId}`);
  
      document.getElementById("recipient-id").value = "";
    });
  
    qrIcon.addEventListener("click", () => {
      const assetType = amountCurrency.value;
      modalAmount.textContent = amountInput.value + " " + assetType.toUpperCase();
      qrModal.style.display = "flex"; 
    });
  
    closeQrModal.addEventListener("click", () => {
      qrModal.style.display = "none";
    });
  
    window.addEventListener("click", (e) => {
      if (e.target === qrModal) {
        qrModal.style.display = "none";
      }
    });
  });
  