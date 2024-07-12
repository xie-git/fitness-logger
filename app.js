// app.js

document.addEventListener('DOMContentLoaded', function () {
    function createWorkoutCountChart(labels, counts) {
        const ctx = document.getElementById('workoutCountChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Workout Days per Month',
                    data: counts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { 
                        grid: { 
                            display: false // Remove the grid lines on the x-axis
                        }
                    },
                    y: { 
                        beginAtZero: true,
                        grid: { 
                            display: false // Remove the grid lines on the y-axis
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Optional: Hide the legend
                    },
                    tooltip: {
                        enabled: true // Optional: Enable tooltips
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: function(value) {
                            return value;
                        },
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: 10 // Set font size to 10
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gym Sessions per Month',
                        font: {
                            size: 10, // Set font size to 10
                            color: 'black', // Set font color to black
                            align: 'start' // Align title to the left
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }

    function createWorkoutTypeChart(workoutTypeCounts) {
        const ctx = document.getElementById('workoutTypeChart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Push', 'Pull', 'Legs'],
                datasets: [{
                    label: 'Workout Type Counts',
                    data: [workoutTypeCounts.Push, workoutTypeCounts.Pull, workoutTypeCounts.Legs],
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: { 
                        grid: { 
                            display: false // Remove the grid lines on the x-axis
                        }
                    },
                    y: { 
                        beginAtZero: true,
                        grid: { 
                            display: false // Remove the grid lines on the y-axis
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Optional: Hide the legend
                    },
                    tooltip: {
                        enabled: true // Optional: Enable tooltips
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: function(value) {
                            return value;
                        },
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: 10 // Set font size to 10
                        }
                    },
                    title: {
                        display: true,
                        text: 'Push, Pull, and Leg Days Count',
                        font: {
                            size: 10, // Set font size to 10
                            color: 'black', // Set font color to black
                            align: 'start' // Align title to the left
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }

    // Fetch and parse data, then process and create charts
    fetchCSVData().then(data => {
        const parsedData = parseCSV(data);

        // Process data for the counters and charts
        const { labels, counts, totalGymSessions, workoutTypeCounts, gymVisitsPerMonth } = processData(parsedData);
        displayCounters({ totalGymSessions, workoutTypeCounts, gymVisitsPerMonth });
        createWorkoutCountChart(labels, counts);
        createWorkoutTypeChart(workoutTypeCounts);
    });
});
