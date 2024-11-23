//const apiKey = '1wXJbnpK1kCuxMTV542hhRCVDiF4KxNR'; //Mykola
const apiKey = 'Pyc0EElRSlaXuNyibRa8e3sEgRDX54rz'; //Mariia
const apiUrlBase = 'https://api.giphy.com/v1/gifs/search?api_key='; 


document.addEventListener('DOMContentLoaded', () => {
    const loadGifButton = document.getElementById('loadGif');
    const gifContainer = document.getElementById('gifContainer');
    const gifImage = document.getElementById('randomGif');
    const searchInput = document.getElementById('input');

    loadGifButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim(); // Pobranie frazy z pola tekstowego
        if (!searchTerm) {
            alert('Wpisz frazę do wyszukiwania!');
            return;
        }

        
        const apiUrl = `${apiUrlBase}${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=1&rating=g`;

        try {
            const response = await fetch(apiUrl);

            if (response.ok) {
                const data = await response.json();
                if (data.data.length > 0) {
                    const gifUrl = data.data[0].images.original.url;

                 
                    gifImage.src = gifUrl;
                    gifImage.style.display = 'block';
                } else {
                    alert('Nie znaleziono GIF-ów dla podanej frazy.');
                    gifImage.style.display = 'none';
                }
            } else {
                console.error('Błąd odpowiedzi API:', response.statusText);
                alert(`Błąd podczas pobierania GIF-a: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Błąd sieci:', error);
            alert('Wystąpił błąd sieci podczas pobierania GIF-a.');
        }
    });
});
