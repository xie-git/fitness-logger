document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('timeSeriesChart').getContext('2d');

    const timeSeriesData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
            label: 'Time Series',
            data: [10, 20, 15, 30, 25, 40],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const timeSeriesChart = new Chart(ctx, {
        type: 'line',
        data: timeSeriesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});