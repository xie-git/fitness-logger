document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch CSV data from S3
    async function fetchCSVData() {
        const response = await fetch('https://xie-fitness-logger-web.s3.amazonaws.com/combined_data_cleaned.csv');
        const data = await response.text();
        console.log('CSV Data:', data); // Log the raw CSV data
        return data;
    }

    // Parse CSV data
    function parseCSV(data) {
        const parsedData = Papa.parse(data, { header: true });
        console.log('Parsed Data:', parsedData.data); // Log the parsed data
        return parsedData.data;
    }

    // Process data to count gym visits per month
    function processData(data) {
        const gymVisitsPerDay = {};

        data.forEach((row, index) => {
            console.log(`Processing row ${index}:`, row); // Log each row
            if (row.Date) {
                const date = new Date(row.Date);
                if (isNaN(date.getTime())) {
                    console.log(`Invalid Date: ${row.Date}`); // Log invalid dates
                    return;
                }
                const dateString = date.toISOString().split( 'T')[0];

                if (!gymVisitsPerDay[dateString]) {
                    gymVisitsPerDay[dateString] = 0;
                }
                gymVisitsPerDay[dateString]++;
            } else {
                console.log(`Missing Date in row ${index}`); // Log missing date
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

        const labels = Object.keys(gymVisitsPerMonth).sort();
        const counts = labels.map(label => gymVisitsPerMonth[label]);

        console.log('Labels:', labels); // Log the labels
        console.log('Counts:', counts); // Log the counts

        return { labels, counts };
    }

    // Create Chart.js chart for workout count each month
    function createChart(labels, counts) {
        const ctx = document.getElementById('workoutCountChart').getContext('2d');
    
        // Dictionary to map month numbers to month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        // Convert year-month format to month name and year
        const formattedLabels = labels.map(label => {
            const [year, month] = label.split('-');
            return `${monthNames[parseInt(month) - 1]} ${year}`;
        });
    
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: formattedLabels,
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
                            size: 20
                        }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    }
    
    

    // Fetch and parse data, then process and create chart
    fetchCSVData().then(data => {
        const parsedData = parseCSV(data);
        const { labels, counts } = processData(parsedData);
        createChart(labels, counts);
    });
});
