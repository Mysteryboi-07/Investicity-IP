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
  
    // -------------------------------
    // 2. Chart.js Market Trend Graph
    // -------------------------------
    
    const ctx = document.getElementById('marketChart').getContext('2d');
    
    const marketChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '10:00', '10:01', '10:02', '10:03', '10:04', 
          '10:05', '10:06', '10:07', '10:08', '10:09', 
          '10:10', '10:11', '10:12', '10:13', '10:14',
          '10:15', '10:16', '10:17', '10:18', '10:19',
          '10:20', '10:21', '10:22', '10:23', '10:24',
          '10:25', '10:26', '10:27', '10:28', '10:29'
        ],
        datasets: [{
          label: 'IguanaPasta',
          data: [
            1643, 1621, 1619, 1627, 1633, 
            1585, 1590, 1581, 1556, 1540, 
            1538, 1542, 1539, 1545, 1653,
            1587, 1566, 1691, 1727, 1733,
            1741, 1702, 1698, 1724, 1736,
            1760, 1783, 1801, 1765, 1822
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
    
    function incrementTime(timeStr) {
      let [hours, minutes] = timeStr.split(':').map(Number);
      minutes++;
      if (minutes >= 60) {
        minutes = 0;
        hours++;
        if (hours >= 24) {
          hours = 0;
        }
      }
      const hoursStr = hours < 10 ? '0' + hours : hours;
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      return `${hoursStr}:${minutesStr}`;
    }

    setInterval(() => {
      let lastDataPoint = marketChart.data.datasets[0].data[marketChart.data.datasets[0].data.length - 1];
      let newValue = lastDataPoint * (0.995 + Math.random() * 0.01);
      
      marketChart.data.datasets[0].data.shift();
      marketChart.data.labels.shift();
      
      let lastLabel = marketChart.data.labels[marketChart.data.labels.length - 1];
      let newLabel = incrementTime(lastLabel);
      
      marketChart.data.datasets[0].data.push(newValue);
      marketChart.data.labels.push(newLabel);
      
      marketChart.update();
    }, 60000);
  });
  