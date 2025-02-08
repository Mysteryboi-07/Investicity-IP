document.addEventListener("DOMContentLoaded", () => {
  // Select all asset rows with the class "asset-row"
  const assetRows = document.querySelectorAll(".asset-row");

  // Loop through each asset row and attach a click event listener
  assetRows.forEach(row => {
    row.addEventListener("click", () => {
      // Read the asset ID from the data-asset-id attribute
      const assetId = row.dataset.assetId;
      if (assetId) {
        // Redirect to details.html with the asset query parameter
        window.location.href = `details.html?asset=${assetId}`;
      }
    });
  });
});
