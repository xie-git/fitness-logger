document.addEventListener('DOMContentLoaded', function() {
    fetchCSVData().then(data => {
        const parsedData = parseCSV(data);
        const { labels, counts } = calculateMuscleGroupSets(parsedData);

        createMuscleGroupPieChart(labels, counts);
    });
});

// Function to fetch CSV data
async function fetchCSVData() {
    const response = await fetch('data/combined_data_cleaned.csv');
    const data = await response.text();
    return data;
}

// Function to parse CSV data
function parseCSV(data) {
    const parsed = Papa.parse(data, { header: true });
    return parsed.data;
}

// Function to calculate the total sets per muscle group
function calculateMuscleGroupSets(data) {
    const muscleGroupCounts = {};

    data.forEach(row => {
        const muscleGroup = row['Muscle Group'];
        if (muscleGroup) {
            if (!muscleGroupCounts[muscleGroup]) {
                muscleGroupCounts[muscleGroup] = 0;
            }
            muscleGroupCounts[muscleGroup] += 1;
        }
    });

    const labels = Object.keys(muscleGroupCounts);
    const counts = Object.values(muscleGroupCounts);

    return { labels, counts };
}

// Function to create the pie chart
function createMuscleGroupPieChart(labels, counts) {
    const ctx = document.getElementById('muscleGroupPieChart').getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: counts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: true
                },
                title: {
                    display: true,
                    text: 'Distribution of Sets per Muscle Group',
                    font: {
                        size: 14,
                        color: 'black',
                        align: 'start'
                    }
                },
                datalabels: {
                    formatter: (value, ctx) => {
                        const datapoints = ctx.chart.data.datasets[0].data;
                        const total = datapoints.reduce((total, datapoint) => total + datapoint, 0);
                        const percentage = (value / total * 100).toFixed(2) + '%';
                        const label = ctx.chart.data.labels[ctx.dataIndex];
                        return label + ': ' + percentage;
                    },
                    color: 'black',
                    font: {
                        weight: 'bold',
                        size: 10
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}