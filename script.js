const apiKey = '1wxJbnpK1kCuxMTV542hhRCVDiF4KxNR'; // Replace with your GIPHY API key
const apiUrl = `https://api.giphy.com/v1/gifs/?api_key=${apiKey}&rating=g`;
const searchInput = document.getElementById("input").value;

document.addEventListener('DOMContentLoaded', () => {
    const loadGifButton = document.getElementById('loadGif');
    const gifContainer = document.getElementById('gifContainer');
    const gifImage = document.getElementById('randomGif');

    loadGifButton.addEventListener('click', async () => {
        try {
            const response = await fetch(apiUrl);
            
            if (response.ok) {
                const data = await response.json();
                const gifUrl = data.data.images.original.url;
                
                // Update the image source to display the GIF
                gifImage.src = gifUrl;
                gifImage.style.display = 'block';
            } else {
                console.error('Błąd podczas pobierania GIF-a:', response.statusText);
                alert('Błąd podczas pobierania GIF-a.');
            }
        } catch (error) {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas pobierania GIF-a.');
        }
    });
});

