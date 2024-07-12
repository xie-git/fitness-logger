// dataProcessing.js

async function fetchCSVData() {
    const response = await fetch('https://xie-fitness-logger-web.s3.amazonaws.com/combined_data_cleaned.csv');
    const data = await response.text();
    return data;
}

function parseCSV(data) {
    const parsedData = Papa.parse(data, { header: true });
    return parsedData.data;
}

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

function processMuscleGroupData(data) {
    const muscleGroupCounts = {};

    data.forEach((row) => {
        if (row['Muscle Group']) {
            const muscleGroup = row['Muscle Group'];
            if (!muscleGroupCounts[muscleGroup]) {
                muscleGroupCounts[muscleGroup] = 0;
            }
            muscleGroupCounts[muscleGroup]++;
        }
    });

    const labels = Object.keys(muscleGroupCounts);
    const counts = Object.values(muscleGroupCounts);

    return { labels, counts };
}

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

// Attach functions to the window object
window.fetchCSVData = fetchCSVData;
window.parseCSV = parseCSV;
window.processData = processData;
window.processMuscleGroupData = processMuscleGroupData;
window.displayCounters = displayCounters;
