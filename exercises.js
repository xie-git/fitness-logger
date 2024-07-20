document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('exercisesChart').getContext('2d');

    const exercisesData = {
        labels: ['Squats', 'Bench Press', 'Deadlift', 'Pull Ups', 'Rows', 'Lunges'],
        datasets: [{
            label: 'Exercises',
            data: [20, 25, 30, 15, 10, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const exercisesChart = new Chart(ctx, {
        type: 'bar',
        data: exercisesData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});