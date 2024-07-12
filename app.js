document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch CSV data from S3
    async function fetchCSVData() {
        const response = await fetch('https://xie-fitness-logger-web.s3.amazonaws.com/combined_data_cleaned.csv');
        const data = await response.text();
        return data;
    }

    // Parse CSV data
    function parseCSV(data) {
        const parsedData = Papa.parse(data, { header: true });
        return parsedData.data;
    }

    // Process data to count gym visits per month and workout types
    function processData(data) {
        const gymVisitsPerDay = {};
        const workoutTypeCounts = { Push: 0, Pull: 0, Legs: 0 };

        data.forEach((row) => {
            if (row.Date) {
                const date = new Date(row.Date);
                const dateString = date.toISOString().split('T')[0];
                if (!gymVisitsPerDay[dateString]) {
                    gymVisitsPerDay[dateString] = 0;
                }
                gymVisitsPerDay[dateString]++;

                // Count workout types
                if (row['Exercise Day']) {
                    workoutTypeCounts[row['Exercise Day']]++;
                }
            }
        });

        const gymVisitsPerMonth = {};

        Object.keys(gymVisitsPerDay).forEach(dateString => {
            const [year, month] = dateString.split('-');
            const yearMonth = `${year}-${month}`;
            if (!gymVisitsPerMonth[yearMonth]) {
                gymVisitsPerMonth[yearMonth] = 0;
            }
            gymVisitsPerMonth[yearMonth]++;
        });

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const labels = Object.keys(gymVisitsPerMonth).sort().map(key => {
            const [year, month] = key.split('-');
            return `${monthNames[parseInt(month) - 1]} ${year}`;
        });
        const counts = Object.values(gymVisitsPerMonth);

        return { labels, counts, workoutTypeCounts };
    }

    // Create Chart.js chart for workout count each month
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
                            weight: 'bold'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Gym Sessions per Month',
                        font: {
                            size: 10 // Adjust the font size here
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }

    // Create Chart.js chart for workout type counts
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
                            weight: 'bold'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Exercise Day Count',
                        font: {
                            size: 10 // Adjust the font size here
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
        const { labels, counts, workoutTypeCounts } = processData(parsedData);
        console.log(labels, counts, workoutTypeCounts); // Debugging line
        createWorkoutCountChart(labels, counts);
        createWorkoutTypeChart(workoutTypeCounts);
    });
});
