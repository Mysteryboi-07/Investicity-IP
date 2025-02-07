document.addEventListener("DOMContentLoaded", () => {
    // Function to increment the time labels on the chart.
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
  
    // Get the context of the canvas element where the chart will be drawn.
    const ctx = document.getElementById('marketChart').getContext('2d');
  
    // Initialize the Chart.js line chart.
    const marketChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [
          '10:00', '10:01', '10:02', '10:03', '10:04', 
          '10:05', '10:06', '10:07', '10:08', '10:09', 
          '10:10', '10:11', '10:12', '10:13'
        ],
        datasets: [{
          label: 'IguanaPasta',
          data: [
            1543, 1521, 1519, 1527, 1533, 
            1525, 1530, 1528, 1535, 1540, 
            1538, 1542, 1539, 1545
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
  
    // Update the chart every 60 seconds.
    setInterval(() => {
      // Calculate a new value based on the last data point.
      let newValue = marketChart.data.datasets[0].data[marketChart.data.datasets[0].data.length - 1] * (0.995 + Math.random() * 0.01);
      
      // Remove the oldest data point.
      marketChart.data.datasets[0].data.shift();
      marketChart.data.labels.shift();
     
      // Create a new label by incrementing the last label.
      let lastLabel = marketChart.data.labels[marketChart.data.labels.length - 1];
      let newLabel = incrementTime(lastLabel);
      
      // Add the new data point and label to the chart.
      marketChart.data.datasets[0].data.push(newValue);
      marketChart.data.labels.push(newLabel);
    
      // Update the chart to reflect the changes.
      marketChart.update();
    }, 60000);
  });  