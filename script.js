//const apiKey = '1wXJbnpK1kCuxMTV542hhRCVDiF4KxNR'; //Mykola
const apiKey = 'Pyc0EElRSlaXuNyibRa8e3sEgRDX54rz'; //Mariia
const apiUrlBase = 'https://api.giphy.com/v1/gifs/search?api_key='; 


document.addEventListener('DOMContentLoaded', () => {
    let offset = 0; 
    const limit = 5;
    const gifContainer = document.getElementById('gifContainer');
    const searchInput = document.getElementById('input');
    const loadGifButton = document.getElementById('loadGif');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const paginationControls = document.getElementById('paginationControls');

    const fetchGIFs = async (searchTerm) => {
        const apiUrl = `${apiUrlBase}${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=${limit}&offset=${offset}&rating=g`;

        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
               
                gifContainer.innerHTML = '';

                if (data.data.length > 0) {
                   
                    data.data.forEach((gif) => {
                        const gifImg = document.createElement('img');
                        gifImg.src = gif.images.original.url;
                        gifImg.style.maxWidth = '100%';
                        gifImg.style.margin = '10px';
                        gifContainer.appendChild(gifImg);
                    });

                    paginationControls.style.display = 'block';
                } else {
                    alert('Nie znaleziono GIF-ów dla podanej frazy.');
                    paginationControls.style.display = 'none';
                }
            } else {
                alert(`Błąd podczas pobierania GIF-ów: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił błąd sieci podczas pobierania GIF-ów.');
        }
    };

    loadGifButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            alert('Wpisz frazę do wyszukiwania!');
            return;
        }
        offset = 0; 
        fetchGIFs(searchTerm);
    });

    nextPageButton.addEventListener('click', () => {
        offset += limit;
        const searchTerm = searchInput.value.trim();
        fetchGIFs(searchTerm);
    });

    prevPageButton.addEventListener('click', () => {
        if (offset >= limit) {
            offset -= limit;
        }
        const searchTerm = searchInput.value.trim();
        fetchGIFs(searchTerm);
    });
});