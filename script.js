document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const rsvpButton = document.querySelector('.rsvp-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    let currentCardIndex = 0;
    const cardAnimationDelay = 700; // Verzögerung zwischen den Kartenanimationen in ms
    const cardTransitionDuration = 700; // Dauer der CSS-Transition der Karte in ms

    // --- Intro-Animation ---
    const introDuration = 2000; // 2 Sekunden für "Bald ist es soweit..."

    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.visibility = 'hidden';
        }

        // --- Schritt 1: Carousel Wrapper einblenden ---
        if (carouselWrapper) {
            carouselWrapper.style.opacity = '1';
            carouselWrapper.style.transform = 'translateY(0)';

            // --- Schritt 2: Karten sequenziell einblenden ---
            // Zuerst die erste Karte sofort anzeigen, ohne Verzögerung
            if (cards.length > 0) {
                showNextCard();
            }
        }
    }, introDuration);

    function showNextCard() {
        if (currentCardIndex < cards.length) {
            const cardToShow = cards[currentCardIndex];
            cardToShow.classList.add('show'); // CSS-Klasse für die Animation hinzufügen

            // Nach der Animation der aktuellen Karte, die nächste vorbereiten oder Karussell aktivieren
            setTimeout(() => {
                currentCardIndex++;
                if (currentCardIndex < cards.length) {
                    // Nächste Karte nach Verzögerung anzeigen
                    setTimeout(showNextCard, cardAnimationDelay);
                } else {
                    // --- Schritt 3: Horizontales Scrollen aktivieren ---
                    // Dies ist der Punkt, an dem alle Karten eingeblendet sind
                    cardContainer.style.overflowX = 'scroll'; // Horizontales Scrollen erlauben
                    cardContainer.style.scrollSnapType = 'x mandatory'; // Scroll-Snap aktivieren
                    
                    // --- Scroll-Indikator einblenden ---
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.visibility = 'visible';
                    }
                }
            }, cardTransitionDuration); // Warte, bis die aktuelle Karte fertig animiert ist
        }
    }

    // --- RSVP-Button Animation beim Laden und Klicken ---
    if (rsvpButton) {
        // Die initiale Pop-Animation, sobald der Button sichtbar ist (Teil der Karten-Animation)
        // Man könnte hier einen IntersectionObserver verwenden, um es präziser zu timen,
        // aber für dieses Setup ist es meist ausreichend, es einfach kurz nach dem Laden der Karte zu triggern.
        rsvpButton.addEventListener('click', (event) => {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            rsvpButton.classList.add('clicked');
            setTimeout(() => {
                rsvpButton.classList.remove('clicked');
            }, 300);
        });
    }
});
