document.addEventListener("DOMContentLoaded", () => {
    const sendForm = document.getElementById("send-form");
    const toggleQRBtn = document.getElementById("toggle-qr-btn");
    const qrCodeContainer = document.getElementById("qr-code-container");
  
    // Handle form submission
    sendForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Retrieve form data
      const recipientId = document.getElementById("recipient-id").value.trim();
      const asset = document.getElementById("asset-select").value;
      const amount = document.getElementById("send-amount").value;
  
      // Basic validation
      if (!recipientId || !asset || !amount || parseFloat(amount) <= 0) {
        alert("Please complete all fields with valid values.");
        return;
      }
  
      // In a real application, you would send this data to your API.
      // For this demo, we simply alert the transaction details.
      alert(`Sending ${amount} of ${asset.toUpperCase()} to Recipient ID: ${recipientId}`);
  
      // Reset the form after submission
      sendForm.reset();
    });
  
    // Handle QR Code toggle
    toggleQRBtn.addEventListener("click", () => {
      if (qrCodeContainer.style.display === "none") {
        qrCodeContainer.style.display = "block";
        toggleQRBtn.textContent = "Hide QR Code";
      } else {
        qrCodeContainer.style.display = "none";
        toggleQRBtn.textContent = "Show QR Code";
      }
    });
  });  