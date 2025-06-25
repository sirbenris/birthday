document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const container = document.querySelector('.container');
    const rsvpButton = document.querySelector('.rsvp-button');

    // Intro-Animation
    // Warte 2.5 Sekunden, dann blende das Overlay aus und zeige den Container
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.visibility = 'hidden';
            // Nach dem Ausblenden des Overlays, zeige den Hauptcontainer
            if (container) {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }
        }
    }, 2500); // 2.5 Sekunden Dauer des Intros

    // RSVP-Button Animation beim Laden und Klicken
    if (rsvpButton) {
        // Optionale kleine Animation beim Laden, um Aufmerksamkeit zu erregen
        rsvpButton.style.transition = 'none'; // Temporär Transition deaktivieren
        rsvpButton.style.transform = 'scale(1.02)'; // Leichter Pop
        setTimeout(() => {
            rsvpButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
            rsvpButton.style.transform = 'scale(1)'; // Zurück zur Normalgröße
        }, 100);

        // Fügt bei Klick eine kurze visuelle Rückmeldung hinzu
        rsvpButton.addEventListener('click', (event) => {
            // Eine kleine Vibration auf unterstützten mobilen Geräten
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Vibrates for 50ms
            }

            // Kurze visuelle Rückmeldung
            rsvpButton.classList.add('clicked'); // CSS-Klasse für Klick-Effekt
            setTimeout(() => {
                rsvpButton.classList.remove('clicked');
            }, 300);
        });
    }

    // Intersection Observer für schrittweise Einblendungen (wie zuvor)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionsToAnimate = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-more, .fade-in-delay-final');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        // Initial alle Elemente verstecken, die per Intersection Observer animiert werden sollen
        // Das wird durch die CSS-Eigenschaften 'opacity: 0' und 'transform: translateY(20px)' gesteuert,
        // und nur Elemente mit delay werden beobachtet, da '.fade-in' sofort sichtbar ist.
        if (!section.classList.contains('fade-in')) {
             section.style.opacity = '0';
             section.style.transform = 'translateY(20px)';
        }
        observer.observe(section);
    });
});
