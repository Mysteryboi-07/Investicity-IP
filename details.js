document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const assetId = urlParams.get("asset") || "btc";
  
    const assetNameElem = document.getElementById("asset-name");
    const assetPriceElem = document.getElementById("asset-price");
    const assetLogoElem = document.getElementById("asset-logo");
    const modalTitleElem = document.getElementById("modal-title");
    let minPrice = 83500;
    let maxPrice = 85000;
  
    if (assetId === "btc") {
      assetNameElem.textContent = "Bitcoin";
      assetPriceElem.textContent = "$97,038.12";
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
      maxPrice = 2750;
    } else if (assetId === "vine") {
      assetNameElem.textContent = "Vine";
      assetPriceElem.textContent = "$1,213.28";
      assetLogoElem.src = "Images/vine-logo.png";
      modalTitleElem.textContent = "Trade Vine";
      minPrice = 1200;
      maxPrice = 1350;
    } else if (assetId === "igp") {
      assetNameElem.textContent = "IguanaPasta";
      assetPriceElem.textContent = "$84,631.71";
      assetLogoElem.src = "Images/igp-logo.png";
      modalTitleElem.textContent = "Trade IguanaPasta";
      minPrice = 83500;
      maxPrice = 85000;
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
      assetNameElem.textContent = "UFD";
      assetPriceElem.textContent = "$5,454.26";
      assetLogoElem.src = "Images/ufd-logo.png";
      modalTitleElem.textContent = "Trade UFD";
      minPrice = 5250;
      maxPrice = 5550;
    } else if (assetId === "xcn") {
      assetNameElem.textContent = "XCN";
      assetPriceElem.textContent = "$2,852.63";
      assetLogoElem.src = "Images/xcn-logo.png";
      modalTitleElem.textContent = "Trade XCN";
      minPrice = 2750;
      maxPrice = 3050;
    } else if (assetId === "fartboy") {
      assetNameElem.textContent = "FARTBOY";
      assetPriceElem.textContent = "$1,547.32";
      assetLogoElem.src = "Images/fartboy-logo.png";
      modalTitleElem.textContent = "Trade FARTBOY";
      minPrice = 1450;
      maxPrice = 1650;
    }
  
    const now = new Date();
    const startTime = new Date(now.getTime() - 30 * 60000);
    const dataCount = 30;
    const timeLabels = [];
    for (let i = 0; i < dataCount; i++) {
      let labelTime = new Date(startTime.getTime() + i * 60000);
      let hours = labelTime.getHours();
      let minutes = labelTime.getMinutes();
      if (hours < 10) { hours = "0" + hours; }
      if (minutes < 10) { minutes = "0" + minutes; }
      timeLabels.push(`${hours}:${minutes}`);
    }

    let chartData;
    if (assetId === "igp") {
      const storedData = sessionStorage.getItem("igpChartData");
      if (storedData) {
        chartData = JSON.parse(storedData);
        chartData.labels = timeLabels;
      } else {
        const dataPoints = [];
        for (let i = 0; i < dataCount; i++) {
          let randomPrice = parseFloat((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));
          dataPoints.push(randomPrice);
        }
        const currentPrice = parseFloat(assetPriceElem.textContent.replace(/[^0-9.]/g, ""));
        dataPoints[dataCount - 1] = currentPrice;
        chartData = { labels: timeLabels, data: dataPoints };
        sessionStorage.setItem("igpChartData", JSON.stringify(chartData));
      }
    } else {
      const storageKey = assetId + "ChartData";
      let storedData = sessionStorage.getItem(storageKey);
      if (storedData) {
        chartData = JSON.parse(storedData);
        chartData.labels = timeLabels;
      } else {
        const dataPoints = [];
        for (let i = 0; i < dataCount; i++) {
          let randomPrice = parseFloat((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));
          dataPoints.push(randomPrice);
        }
        const currentPrice = parseFloat(assetPriceElem.textContent.replace(/[^0-9.]/g, ""));
        dataPoints[dataCount - 1] = currentPrice;
        chartData = { labels: timeLabels, data: dataPoints };
        sessionStorage.setItem(storageKey, JSON.stringify(chartData));
      }
    }
  
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
          x: { title: { display: true, text: 'Time' } },
          y: {
            title: { display: true, text: 'Price ($)' },
            min: minPrice,
            max: maxPrice
          }
        }
      }
    });
  
    function incrementTime(timeStr) {
      let [hours, minutes] = timeStr.split(':').map(Number);
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        if (hours >= 24) { hours = 0; }
      }
      let hoursStr = hours < 10 ? '0' + hours : hours;
      let minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return `${hoursStr}:${minutesStr}`;
    }
  
    setInterval(() => {
      let newValue = parseFloat((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));
      assetChart.data.datasets[0].data.shift();
      assetChart.data.labels.shift();
      const lastLabel = assetChart.data.labels[assetChart.data.labels.length - 1];
      const newLabel = incrementTime(lastLabel);
      assetChart.data.datasets[0].data.push(newValue);
      assetChart.data.labels.push(newLabel);
      assetChart.update();
      if (assetId === "igp") {
        sessionStorage.setItem("igpChartData", JSON.stringify({
          labels: assetChart.data.labels,
          data: assetChart.data.datasets[0].data
        }));
      } else {
        sessionStorage.setItem("assetChartData", JSON.stringify({
          labels: assetChart.data.labels,
          data: assetChart.data.datasets[0].data
        }));
      }
    }, 60000);
  
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
  