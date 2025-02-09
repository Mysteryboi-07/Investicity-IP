document.addEventListener("DOMContentLoaded", () => {
    const storedUsername = localStorage.getItem("username");
    const storedUserID = localStorage.getItem("userID");
    const storedNetWorth = localStorage.getItem("netWorth");
    const storedDailyChange = localStorage.getItem("dailyChange");
    
    const userNameElem = document.querySelector(".user-name");
    const userIDElem = document.querySelector(".user-id");
    if (storedUsername && userNameElem) {
      userNameElem.textContent = storedUsername;
    }
    if (storedUserID && userIDElem) {
      userIDElem.textContent = "ID: " + storedUserID;
    }
    
    const walletOverview = document.querySelector(".wallet-overview");
    if (walletOverview) {
      const netWorthElem = walletOverview.querySelector("p:nth-of-type(1)");
      const dailyChangeElem = walletOverview.querySelector("p:nth-of-type(2)");
      if (storedNetWorth && netWorthElem) {
        netWorthElem.textContent = "$" + parseFloat(storedNetWorth)
          .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      if (storedDailyChange && dailyChangeElem) {
        dailyChangeElem.innerHTML = storedDailyChange;
        if (storedDailyChange.trim().charAt(0) === "+") {
          dailyChangeElem.classList.add("positive");
          dailyChangeElem.classList.remove("negative");
        } else {
          dailyChangeElem.classList.add("negative");
          dailyChangeElem.classList.remove("positive");
        }
      }
    }
    const minPrice = 83500;
    const maxPrice = 85000;
    
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
      const currentPrice = dataPoints[dataCount - 1];
      dataPoints[dataCount - 1] = currentPrice;
      chartData = { labels: timeLabels, data: dataPoints };
      sessionStorage.setItem("igpChartData", JSON.stringify(chartData));
    }
    
    const ctx = document.getElementById('marketChart').getContext('2d');
    const marketChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'IguanaPasta Price ($)',
          data: chartData.data,
          borderColor: '#4CAF50',
          backgroundColor: 'rgba(76,175,80,0.2)',
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
      marketChart.data.datasets[0].data.shift();
      marketChart.data.labels.shift();
      const lastLabel = marketChart.data.labels[marketChart.data.labels.length - 1];
      const newLabel = incrementTime(lastLabel);
      marketChart.data.datasets[0].data.push(newValue);
      marketChart.data.labels.push(newLabel);
      marketChart.update();
      chartData.data = marketChart.data.datasets[0].data;
      chartData.labels = marketChart.data.labels;
      sessionStorage.setItem("igpChartData", JSON.stringify(chartData));
    }, 60000);
  });
  