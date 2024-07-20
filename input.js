document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('exercise-form');
    const responseDiv = document.getElementById('response');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const weight = document.getElementById('weight').value;
        const reps = document.getElementById('reps').value;
        const exercise = document.getElementById('exercise').value;

        const inputData = {
            weight: weight,
            reps: reps,
            exercise: exercise
        };

        try {
            const response = await fetch('https://your-api-endpoint/your-lambda-function', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputData)
            });

            const result = await response.json();
            responseDiv.innerHTML = 'Data successfully added: ' + JSON.stringify(result);
        } catch (error) {
            responseDiv.innerHTML = 'Error: ' + error.message;
        }
    });
});