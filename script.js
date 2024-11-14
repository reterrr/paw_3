const apiToken = 'orjuxPLsZXxMSaRahvLoIFZvMwzAHdVJ'; // Replace with your NOAA API token
const baseUrl = 'https://www.ncei.noaa.gov/cdo-web/api/v2/';

document.addEventListener('DOMContentLoaded', () => {
    const loadDataButton = document.getElementById('loadData');
    
    loadDataButton.addEventListener('click', () => {
        const selectedEndpoint = document.getElementById('endpointSelect').value;
        fetchData(selectedEndpoint);
    });
});

async function fetchData(endpoint) {
    const apiUrl = `${baseUrl}${endpoint}`;
    
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'token': apiToken
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayData(endpoint, data.results);
        } else {
            console.error('Błąd podczas pobierania danych:', response.statusText);
            alert('Błąd podczas pobierania danych.');
        }
    } catch (error) {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas pobierania danych.');
    }
}

function displayData(endpoint, results) {
    const tableBody = document.getElementById('resultsTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear previous results

    results.forEach(item => {
        const row = document.createElement('tr');

        // Customize columns based on the endpoint
        let additionalInfo = '';
        if (endpoint === 'locations') {
            additionalInfo = item.country || 'N/A';
        } else if (endpoint === 'datasets') {
            additionalInfo = item.uid || 'N/A';
        } else {
            additionalInfo = item.description || 'N/A';
        }

        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name || 'N/A'}</td>
            <td>${additionalInfo}</td>
        `;
        tableBody.appendChild(row);
    });
}

