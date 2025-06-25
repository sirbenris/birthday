document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const centeredCardWrapper = document.querySelector('.centered-card-wrapper');
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const rsvpButton = document.querySelector('.rsvp-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    let currentCardIndex = 0;
    const cardAnimationDelay = 1200; // Verzögerung zwischen dem Einblenden der Karten in ms
    const cardTransitionDuration = 700; // Dauer der CSS-Transition einer Karte in ms

    // --- Intro-Animation ---
    const introDuration = 2000; // 2 Sekunden für "Bald ist es soweit..."

    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.visibility = 'hidden';
        }

        // --- Schritt 1: Wrapper für Karten einblenden ---
        if (centeredCardWrapper) {
            centeredCardWrapper.style.opacity = '1';
            centeredCardWrapper.style.transform = 'translateY(0)';

            // --- Schritt 2: Karten sequenziell übereinander einblenden ---
            // Wir müssen overflow-x für den cardContainer anfangs verstecken
            cardContainer.style.overflowX = 'hidden';

            if (cards.length > 0) {
                showNextCard();
            }
        }
    }, introDuration);

    function showNextCard() {
        if (currentCardIndex < cards.length) {
            const cardToShow = cards[currentCardIndex];
            
            // Wenn es nicht die erste Karte ist, verstecke die vorherige Karte kurz,
            // bevor die nächste erscheint, um den "übereinander" Effekt zu erzeugen.
            if (currentCardIndex > 0) {
                const prevCard = cards[currentCardIndex - 1];
                prevCard.style.opacity = '0'; // Vorherige Karte ausblenden
                // Setze die vorherige Karte nach kurzer Verzögerung auf absolute Position
                // damit sie aus dem Flow genommen wird und die nächste Karte in die Mitte rücken kann
                setTimeout(() => {
                    prevCard.style.position = 'absolute';
                    prevCard.style.zIndex = '-1'; // Optional: Nach hinten schicken
                }, cardTransitionDuration); // Warte, bis die Ausblendung fertig ist
            }

            // Sicherstellen, dass die aktuelle Karte wieder relativ ist und z-index hoch
            cardToShow.style.position = 'relative';
            cardToShow.style.zIndex = '1';
            cardToShow.classList.add('show'); // CSS-Klasse für die Animation hinzufügen

            // Nach der Animation der aktuellen Karte, die nächste vorbereiten oder Karussell aktivieren
            setTimeout(() => {
                currentCardIndex++;
                if (currentCardIndex < cards.length) {
                    // Nächste Karte nach Verzögerung anzeigen
                    setTimeout(showNextCard, cardAnimationDelay);
                } else {
                    // --- Schritt 3: Horizontales Scrollen aktivieren ---
                    // Dies ist der Punkt, an dem alle Karten einzeln eingeblendet sind.
                    // Jetzt werden alle Karten wieder im Flexbox-Flow positioniert und scrollbar gemacht.
                    
                    // Alle Karten wieder auf 'static' setzen und sichtbar machen,
                    // falls sie unsichtbar gemacht wurden (für den 'übereinander' Effekt)
                    cards.forEach(card => {
                        card.style.position = 'static';
                        card.style.opacity = '1';
                        card.style.zIndex = 'auto';
                    });

                    cardContainer.style.overflowX = 'scroll'; // Horizontales Scrollen erlauben
                    cardContainer.style.scrollSnapType = 'x mandatory'; // Scroll-Snap aktivieren
                    
                    // --- Scroll-Indikator einblenden ---
                    if (scrollIndicator) {
                        scrollIndicator.style.opacity = '1';
                        scrollIndicator.style.visibility = 'visible';
                    }

                    // Sicherstellen, dass der Container die volle Breite der Karten einnehmen kann
                    // (optional, falls es noch Layout-Probleme gibt)
                    cardContainer.style.width = 'fit-content'; 
                    centeredCardWrapper.style.justifyContent = 'flex-start'; // Wrapper links ausrichten für das Karussell
                }
            }, cardTransitionDuration); // Warte, bis die aktuelle Karte fertig animiert ist
        }
    }

    // --- RSVP-Button Animation beim Laden und Klicken ---
    if (rsvpButton) {
        // Die initiale Pop-Animation, sobald der Button sichtbar ist (Teil der Karten-Animation)
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
