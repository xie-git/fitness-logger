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

    function createMuscleGroupChart(labels, counts) {
        const ctx = document.getElementById('muscleGroupChart').getContext('2d');
    
        const colors = {
            'Chest': 'rgba(255, 99, 132, 0.2)',
            'Back': 'rgba(54, 162, 235, 0.2)',
            'Legs': 'rgba(75, 192, 192, 0.2)',
            'Arms': 'rgba(255, 206, 86, 0.2)',
            'Shoulders': 'rgba(153, 102, 255, 0.2)',
            'Abs': 'rgba(255, 159, 64, 0.2)',
            'Other': 'rgba(201, 203, 207, 0.2)'
        };
    
        const borderColors = {
            'Chest': 'rgba(255, 99, 132, 1)',
            'Back': 'rgba(54, 162, 235, 1)',
            'Legs': 'rgba(75, 192, 192, 1)',
            'Arms': 'rgba(255, 206, 86, 1)',
            'Shoulders': 'rgba(153, 102, 255, 1)',
            'Abs': 'rgba(255, 159, 64, 1)',
            'Other': 'rgba(201, 203, 207, 1)'
        };
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sets per Muscle Group',
                    data: counts,
                    backgroundColor: labels.map(label => colors[label] || colors['Other']),
                    borderColor: labels.map(label => borderColors[label] || borderColors['Other']),
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
                        text: 'Total Sets per Muscle Group',
                        padding: {
                            top: 0, // Adjust the top padding to move the title further from the chart
                            bottom: 0 // You can also adjust the bottom padding if needed
                        },
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

    function createMuscleGroupChartByMonth(muscleGroupDataByMonth) {
        const container = document.getElementById('muscleGroupChartsContainer');
        container.innerHTML = '';
    
        const colors = {
            'Chest': 'rgba(255, 99, 132, 0.2)',
            'Back': 'rgba(54, 162, 235, 0.2)',
            'Legs': 'rgba(75, 192, 192, 0.2)',
            'Arms': 'rgba(255, 206, 86, 0.2)',
            'Shoulders': 'rgba(153, 102, 255, 0.2)',
            'Abs': 'rgba(255, 159, 64, 0.2)',
            'Other': 'rgba(201, 203, 207, 0.2)'
        };
    
        const borderColors = {
            'Chest': 'rgba(255, 99, 132, 1)',
            'Back': 'rgba(54, 162, 235, 1)',
            'Legs': 'rgba(75, 192, 192, 1)',
            'Arms': 'rgba(255, 206, 86, 1)',
            'Shoulders': 'rgba(153, 102, 255, 1)',
            'Abs': 'rgba(255, 159, 64, 1)',
            'Other': 'rgba(201, 203, 207, 1)'
        };
    
        Object.keys(muscleGroupDataByMonth).forEach(yearMonth => {
            const { labels, counts } = muscleGroupDataByMonth[yearMonth];
    
            const chartContainer = document.createElement('div');
            chartContainer.className = 'chart-container';
            container.appendChild(chartContainer);
    
            const canvas = document.createElement('canvas');
            chartContainer.appendChild(canvas);
    
            new Chart(canvas.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: `Total Sets per Muscle Group (${yearMonth})`,
                        data: counts,
                        backgroundColor: labels.map(label => colors[label] || colors['Other']),
                        borderColor: labels.map(label => borderColors[label] || borderColors['Other']),
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
                            text: `Total Sets per Muscle Group (${yearMonth})`,
                            padding: {
                                top: 0, // Adjust the top padding to move the title further from the chart
                                bottom: 20 // You can also adjust the bottom padding if needed
                            },
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
        });
    }

    function createSpecificMuscleSetCountChart(data) {
    const ctx = document.getElementById('specificMuscleSetCountChart').getContext('2d');
        
    const { labels, counts } = processSpecificMuscleSetCounts(data);
    
    const colors = labels.map(() => 'rgba(75, 192, 192, 0.2)');
    const borderColors = labels.map(() => 'rgba(75, 192, 192, 1)');
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Total Sets per Specific Muscle',
                data: counts,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Rotate the chart
            scales: {
                x: { 
                    grid: { 
                        display: false // Remove the grid lines on the x-axis
                    },
                    ticks: {
                        font: {
                            size: 10 // Adjust font size for x-axis labels
                        }
                    }
                },
                y: { 
                    grid: { 
                        display: false // Remove the grid lines on the y-axis
                    },
                    ticks: {
                        autoSkip: false, // Ensure all labels are displayed
                        font: {
                            size: 10 // Adjust font size for x-axis labels
                        }
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
                    align: 'right',
                    offset: -10, // Adjust offset to move labels closer to the bars
                    formatter: function(value) {
                        return value;
                    },
                    color: 'black',
                    font: {
                        weight: 'italic',
                        size: 8 // Set font size for data labels
                    },
                    padding: {
                        top: 5, // Adjust top padding
                        bottom: 5, // Adjust bottom padding
                        right: -5
                    }
                },
                title: {
                    display: true,
                    text: 'Total Sets per Specific Muscle',
                    font: {
                        size: 10, // Set font size for title
                        color: 'black', // Set font color to black
                        align: 'start' // Align title to the left
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
}

function calculateHighestWeights(data) {
    const exercises = [
        'Bench Press',
        'Squat',
        'T Bar',
        'OHP',
        'Incline bench',
        'Incline Dumbbell Press',
        'Lat pulldown'
    ];

    const highestWeights = {};

    exercises.forEach(exercise => {
        const exerciseData = data.filter(row => row['Exercise'] === exercise);
        if (exerciseData.length > 0) {
            const weights = exerciseData.map(row => {
                const weight = parseFloat(row['Weight (lbs)']);
                return weight;
            });
            highestWeights[exercise] = Math.max(...weights);
        } else {
            highestWeights[exercise] = 'N/A';
            console.log(`No data for ${exercise}`);
        }
    });

    return highestWeights;
}


    // Fetch and parse data, then process and create charts
    fetchCSVData().then(data => {
        const parsedData = parseCSV(data);
    
        // Process data for the counters and charts
        const { labels, counts, totalGymSessions, workoutTypeCounts, gymVisitsPerMonth } = processData(parsedData);
        displayCounters({ totalGymSessions, workoutTypeCounts, gymVisitsPerMonth });
        createWorkoutCountChart(labels, counts);
        createWorkoutTypeChart(workoutTypeCounts);
    
        // Process and create muscle group chart
        const { labels: muscleGroupLabels, counts: muscleGroupCounts } = processMuscleGroupData(parsedData);
        createMuscleGroupChart(muscleGroupLabels, muscleGroupCounts);
    
        // Process and create muscle group charts by month
        const muscleGroupDataByMonth = processMuscleGroupDataByMonth(parsedData);
        createMuscleGroupChartByMonth(muscleGroupDataByMonth);
    
        // Process and create specific muscle set count chart
        createSpecificMuscleSetCountChart(parsedData);
    
        // Calculate highest weights
        const highestWeights = calculateHighestWeights(parsedData);
        console.log("Highest Weights:", highestWeights);
    
        // Display highest weights
        const aggregateList = document.getElementById('aggregate-list');
        aggregateList.innerHTML = '';
        for (const [exercise, weight] of Object.entries(highestWeights)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${exercise}: ${weight} lbs`;
            aggregateList.appendChild(listItem);
        }
    });
});

// Attach function to the window object to make it globally accessible
window.createSpecificMuscleSetCountChart = createSpecificMuscleSetCountChart;