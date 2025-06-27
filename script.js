document.addEventListener('DOMContentLoaded', () => {
    const animatedItems = document.querySelectorAll('.animated-item');
    
    // Funktion zum Einblenden der Elemente mit Verzögerung
    function revealItemsSequentially(items) {
        items.forEach((item, index) => {
            const delay = parseInt(item.dataset.delay) || (index * 500); // Standardverzögerung 500ms pro Element
            setTimeout(() => {
                item.classList.add('is-visible');
            }, delay);
        });
    }

    // Starte die Animation
    revealItemsSequentially(animatedItems);
});
