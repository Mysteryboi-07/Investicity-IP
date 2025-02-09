document.addEventListener("DOMContentLoaded", () => {
  const assetRows = document.querySelectorAll(".asset-row");

  assetRows.forEach(row => {
    row.addEventListener("click", () => {
      const assetId = row.dataset.assetId;
      if (assetId) {
        window.location.href = `details.html?asset=${assetId}`;
      }
    });
  });
});
