document.addEventListener('DOMContentLoaded', () => {
    const loadButton = document.getElementById('load_load');

    loadButton.addEventListener('click', () => {
        const country = document.getElementById('capitalInput').value;
        const loader = new CountryLoader();

        loader.from('https://restcountries.com/v3.1/capital/', country).run();
    });
});

class CountryLoader {
    url = '';
    country = '';

    from(url, country) {
        this.url = url;
        this.country = country;
        return this;
    }

    async run() {
        const fullUrl = `${this.url}${this.country}`;

        try {
            const response = await fetch(fullUrl);
            if (response.ok) {
                const countries = await response.json();
                displayCountryData(countries);
            } else {
                alert("Brak wyników lub błąd serwera.");
            }
        } catch (error) {
            console.error("Błąd podczas pobierania danych:", error);
            alert("Wystąpił błąd podczas pobierania danych.");
        }
    }
}

function displayCountryData(countries) {
    const tableBody = document.getElementById('countryTable').querySelector('tbody');
    tableBody.innerHTML = ''; // Wyczyść poprzednie wyniki

    countries.forEach(country => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${country.name.common}</td>
            <td>${country.capital ? country.capital[0] : 'N/A'}</td>
            <td>${country.population.toLocaleString()}</td>
            <td>${country.region}</td>
            <td>${country.subregion || 'N/A'}</td>
        `;
        tableBody.appendChild(row);
    });
}

