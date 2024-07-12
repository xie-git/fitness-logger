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

    // Process data to count gym visits and workout types
    function processData(data) {
        const gymVisitsPerDay = {};
        const workoutTypeCounts = { Push: 0, Pull: 0, Legs: 0 };
        const uniqueDays = new Set();

        data.forEach((row) => {
            if (row.Date && row['Exercise Day']) {
                const date = new Date(row.Date);
                const dateString = date.toISOString().split('T')[0];
                if (!gymVisitsPerDay[dateString]) {
                    gymVisitsPerDay[dateString] = 0;
                }
                gymVisitsPerDay[dateString]++;

                if (!uniqueDays.has(dateString)) {
                    uniqueDays.add(dateString);
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

        return { labels, counts, totalGymSessions: Object.keys(gymVisitsPerDay).length, workoutTypeCounts, gymVisitsPerMonth };
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

    // Display the counters at the top of the page
    function displayCounters(stats) {
        const countersDiv = document.getElementById('counters');

        const startDate = new Date('2024-04-04');
        const endDate = new Date();
        const totalMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + 1;
        const totalWeeks = Math.ceil((endDate - startDate) / (7 * 24 * 60 * 60 * 1000));

        const avgGymSessionsPerMonth = (stats.totalGymSessions / totalMonths).toFixed(2);
        const avgGymSessionsPerWeek = (stats.totalGymSessions / totalWeeks).toFixed(2);
        const avgPushDaysPerMonth = (stats.workoutTypeCounts.Push / totalMonths).toFixed(2);
        const avgPullDaysPerMonth = (stats.workoutTypeCounts.Pull / totalMonths).toFixed(2);
        const avgLegDaysPerMonth = (stats.workoutTypeCounts.Legs / totalMonths).toFixed(2);

        countersDiv.innerHTML = `
            <table>
                <tr><td>Total Number of Gym Sessions:</td><td>${stats.totalGymSessions}</td></tr>
                <tr><td>Total Number of Pull Days:</td><td>${stats.workoutTypeCounts.Pull}</td></tr>
                <tr><td>Total Number of Push Days:</td><td>${stats.workoutTypeCounts.Push}</td></tr>
                <tr><td>Total Number of Leg Days:</td><td>${stats.workoutTypeCounts.Legs}</td></tr>
                <tr><td>Average Gym Sessions per Month:</td><td>${avgGymSessionsPerMonth}</td></tr>
                <tr><td>Average Gym Sessions per Week:</td><td>${avgGymSessionsPerWeek}</td></tr>
                <tr><td>Average Pull Days per Month:</td><td>${avgPullDaysPerMonth}</td></tr>
                <tr><td>Average Push Days per Month:</td><td>${avgPushDaysPerMonth}</td></tr>
                <tr><td>Average Leg Days per Month:</td><td>${avgLegDaysPerMonth}</td></tr>
            </table>
        `;
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
