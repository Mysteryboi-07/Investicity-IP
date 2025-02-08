document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("assets-tbody");
  if (tbody) {
    tbody.addEventListener("click", (e) => {
      let target = e.target;
      // Traverse up to the table row element
      while (target && target.tagName !== "TR") {
        target = target.parentElement;
      }
      if (target && target.dataset.assetId) {
        const assetId = target.dataset.assetId;
        // Redirect to the asset details page, passing the asset id as a query parameter
        window.location.href = `details.html?asset=${assetId}`;
      }
    });
  }
});
