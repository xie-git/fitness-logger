document.addEventListener('DOMContentLoaded', function () {
    loadCachedInsights();
});

async function loadCachedInsights() {
    const insightsContent = document.getElementById('insights-content');
    insightsContent.innerHTML = 'Loading insights...';

    try {
        const response = await fetch('https://uwdfkk5ual.execute-api.us-east-1.amazonaws.com/prod/insights', {
            method: 'GET', // Use GET to fetch cached insights
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        displayInsights(data.insights);
    } catch (error) {
        insightsContent.innerHTML = 'Failed to load insights. Please try again later.';
        console.error('Error fetching AI insights:', error);
    }
}

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
        displayInsights(data.insights);
    } catch (error) {
        insightsContent.innerHTML = 'Failed to load insights. Please try again later.';
        console.error('Error fetching AI insights:', error);
    }
}

function displayInsights(insights) {
    const insightsContent = document.getElementById('insights-content');
    insightsContent.innerHTML = '';

    const bulletPoints = insights.split('\n').filter(point => point.trim() !== '');
    bulletPoints.forEach(point => {
        const p = document.createElement('p');
        p.textContent = point.replace(/^- /, ''); // Remove the leading bullet point character
        insightsContent.appendChild(p);
    });
}

async function refreshInsights() {
    const insightsContent = document.getElementById('insights-content');
    insightsContent.innerHTML = 'Loading insights...';

    await fetchAIInsights();
}