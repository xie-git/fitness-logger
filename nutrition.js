document.addEventListener('DOMContentLoaded', function() {
    const caloricIntakeCtx = document.getElementById('caloricIntakeChart').getContext('2d');
    const macroDistributionCtx = document.getElementById('macroDistributionChart').getContext('2d');

    const caloricIntakeData = {
        labels: ['2024-07-01', '2024-07-02', '2024-07-03', '2024-07-04', '2024-07-05'],
        datasets: [{
            label: 'Daily Caloric Intake',
            data: [2000, 2200, 2100, 2300, 1900],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const macroDistributionData = {
        labels: ['Carbs', 'Protein', 'Fat'],
        datasets: [{
            label: 'Macro Distribution',
            data: [50, 30, 20], // Percentage values
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    };

    const caloricIntakeChart = new Chart(caloricIntakeCtx, {
        type: 'line',
        data: caloricIntakeData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const macroDistributionChart = new Chart(macroDistributionCtx, {
        type: 'pie',
        data: macroDistributionData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        let datasets = ctx.chart.data.datasets;
                        if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
                            let sum = datasets[0].data.reduce((a, b) => a + b, 0);
                            let percentage = Math.round((value / sum) * 100) + '%';
                            return percentage;
                        } else {
                            return percentage;
                        }
                    },
                    color: '#fff',
                }
            }
        },
        plugins: [ChartDataLabels]
    });
});