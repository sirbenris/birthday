document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const cardContainer = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const rsvpButton = document.querySelector('.rsvp-button');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Schritt 1: Intro-Animation
    // Dauer des Intro-Textes "Bald ist es soweit..."
    const introDuration = 2000; // 2 Sekunden

    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.visibility = 'hidden';
        }

        // Schritt 2: Haupt-Container einblenden (als Basis für die Karten)
        if (cardContainer) {
            cardContainer.style.opacity = '1';
            cardContainer.style.transform = 'translateY(0)';

            // Schritt 3: Karten nacheinander einblenden
            // Wir müssen overflow-y für den Body temporär auf hidden setzen,
            // um zu verhindern, dass die Seite während der Karten-Animation scrollt
            document.body.style.overflowY = 'hidden';

            cards.forEach((card, index) => {
                // Jede Karte mit einer Verzögerung einblenden
                const delay = index * 400; // 0.4 Sekunden Verzögerung pro Karte
                setTimeout(() => {
                    card.classList.add('show');
                }, delay);
            });

            // Schritt 4: Scrollen aktivieren, nachdem alle Karten sichtbar sind
            // und den Scroll-Indikator einblenden
            const totalAnimationTime = (cards.length - 1) * 400 + 700; // Letzte Kartenverzögerung + deren Transition
            setTimeout(() => {
                document.body.style.overflowY = 'auto'; // Scrollen erlauben
                if (scrollIndicator) {
                     scrollIndicator.style.opacity = '1';
                     scrollIndicator.style.visibility = 'visible';
                }
            }, totalAnimationTime + 500); // Zusätzliche kleine Verzögerung nach der letzten Karte
        }
    }, introDuration);


    // RSVP-Button Animation beim Laden und Klicken (wie zuvor)
    if (rsvpButton) {
        // Optionale kleine Animation beim Laden, um Aufmerksamkeit zu erregen
        // Diese wird ausgeführt, sobald der Button selbst sichtbar wird (durch die Karten-Animation)
        rsvpButton.style.transition = 'none';
        rsvpButton.style.transform = 'scale(1.02)';
        setTimeout(() => {
            rsvpButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
            rsvpButton.style.transform = 'scale(1)';
        }, 100);

        // Fügt bei Klick eine kurze visuelle Rückmeldung hinzu
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

    // Für die Einblendung der Karten selbst nutzen wir die CSS-Animationen
    // Die `.fade-in-card` Klasse hat bereits die `transition` Eigenschaften.
    // Die JavaScript-Logik fügt nur die `show` Klasse hinzu.
});
