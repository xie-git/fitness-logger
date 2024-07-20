document.addEventListener('DOMContentLoaded', function () {
    fetchAIInsights();
});

async function fetchAIInsights() {
    const insightsContent = document.getElementById('insights-content');
    insightsContent.innerHTML = 'Loading insights...';

    try {
        const response = await fetch('https://uwdfkk5ual.execute-api.us-east-1.amazonaws.com/prod/insights', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        insightsContent.innerHTML = data.insights;
    } catch (error) {
        insightsContent.innerHTML = 'Failed to load insights. Please try again later.';
        console.error('Error fetching AI insights:', error);
    }
}