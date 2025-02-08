document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // Parse Asset from URL and Update Asset Details
    // -------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const assetId = urlParams.get("asset") || "btc"; // default to Bitcoin if not provided
  
    const assetNameElem = document.getElementById("asset-name");
    const assetPriceElem = document.getElementById("asset-price");
    const assetLogoElem = document.getElementById("asset-logo");
    const modalTitleElem = document.getElementById("modal-title");
  
    // Set default price range; adjust these values based on asset type.
    let minPrice = 10000;
    let maxPrice = 30000;
  
    if (assetId === "btc") {
      assetNameElem.textContent = "Bitcoin";
      assetPriceElem.textContent = "97038.12";
      assetLogoElem.src = "Images/btc-logo.png";
      modalTitleElem.textContent = "Trade Bitcoin";
      minPrice = 95000;
      maxPrice = 98500;
    } else if (assetId === "eth") {
      assetNameElem.textContent = "Ethereum";
      assetPriceElem.textContent = "$2,642.80";
      assetLogoElem.src = "Images/eth-logo.png";
      modalTitleElem.textContent = "Trade Ethereum";
      minPrice = 2450;
      maxPrice = 2650;
    } else if (assetId === "vine") {
      assetNameElem.textContent = "Vine";
      assetPriceElem.textContent = "$1,213.28";
      assetLogoElem.src = "Images/vine-logo.png";
      modalTitleElem.textContent = "Trade Vine";
      minPrice = 1200;
      maxPrice = 1350;
    } else if (assetId === "toshi") {
        assetNameElem.textContent = "Toshi";
        assetPriceElem.textContent = "$7,204.95";
        assetLogoElem.src = "Images/toshi-logo.png";
        modalTitleElem.textContent = "Trade Toshi";
        minPrice = 7000;
        maxPrice = 7350;
    } else if (assetId === "trump") {
        assetNameElem.textContent = "Trump";
        assetPriceElem.textContent = "$1,694.22";
        assetLogoElem.src = "Images/trump-logo.png";
        modalTitleElem.textContent = "Trade Trump";
        minPrice = 1680;
        maxPrice = 2000;
    } else if (assetId === "ufd") {
        assetNameElem.textContent = "Unicorn Fart Dust";
        assetPriceElem.textContent = "$5,454.26";
        assetLogoElem.src = "Images/ufd-logo.png";
        modalTitleElem.textContent = "Trade Unicorn Fart Dust";
        minPrice = 5250;
        maxPrice = 5550;
    } else if (assetId === "xcn") {
        assetNameElem.textContent = "Chain";
        assetPriceElem.textContent = "$2,852.63";
        assetLogoElem.src = "Images/xcn-logo.png";
        modalTitleElem.textContent = "Trade Chain";
        minPrice = 2750;
        maxPrice = 3050;
    } else if (assetId === "fartboy") {
        assetNameElem.textContent = "FARTBOY";
        assetPriceElem.textContent = "$1,574.32";
        assetLogoElem.src = "Images/fartboy-logo.png";
        modalTitleElem.textContent = "Trade FARTBOY";
        minPrice = 1450;
        maxPrice = 1650;
    } else if (assetId === "igp") {
        assetNameElem.textContent = "IguanaPasta";
        assetPriceElem.textContent = "$84,631.71";
        assetLogoElem.src = "Images/igp-logo.png";
        modalTitleElem.textContent = "Trade IguanaPasta";
        minPrice = 83500;
        maxPrice = 85000;
    }

    const now = new Date();
    // Calculate the start time (30 minutes before now)
    const startTime = new Date(now.getTime() - 30 * 60000);
    // Generate an array of 30 labels, each one minute apart
    const timeLabels = [];
    const dataCount = 30; // Number of data points (and labels)
    for (let i = 0; i < dataCount; i++) {
      let labelTime = new Date(startTime.getTime() + i * 60000);
      let hours = labelTime.getHours();
      let minutes = labelTime.getMinutes();
      // Format hours and minutes as two-digit strings
      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      timeLabels.push(`${hours}:${minutes}`);
    }
  
    // -------------------------
    // Generate Random Price Data within the Specified Range
    // -------------------------
    let dataPoints = [];
    for (let i = 0; i < dataCount; i++) {
      let randomPrice = (Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2);
      dataPoints.push(randomPrice);
    }
  
    // Optional: Store the chart data in sessionStorage (if needed for the session)
    const chartData = { labels: timeLabels, data: dataPoints };
    sessionStorage.setItem("assetChartData", JSON.stringify(chartData));

    const currentPriceStr = assetPriceElem.textContent;
    const currentPrice = parseFloat(currentPriceStr.replace(/[^0-9.]/g, ""));
    // Ensure the chartData array has the expected length and override the last element
    if (chartData.data.length >= dataCount) {
      chartData.data[dataCount - 1] = currentPrice;
    } else {
      // If for some reason the length is less, push the price at the end
      chartData.data.push(currentPrice);
    }
  
    // Save the updated chartData back to sessionStorage
    sessionStorage.setItem("assetChartData", JSON.stringify(chartData));

    // -------------------------
    // Initialize Chart.js Graph
    // -------------------------
    const ctx = document.getElementById('assetChart').getContext('2d');
    const assetChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Asset Price ($)',
          data: chartData.data,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
          fill: true,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price ($)'
            },
            min: minPrice,
            max: maxPrice
          }
        }
      }
    });
  
    // -------------------------
    // Modal Functionality for the Trade Button
    // -------------------------
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
  });  