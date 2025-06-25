document.addEventListener('DOMContentLoaded', () => {
    const rsvpButton = document.querySelector('.rsvp-button');

    if (rsvpButton) {
        // Optionale kleine Animation beim Laden, um Aufmerksamkeit zu erregen
        rsvpButton.style.transition = 'none'; // Temporär Transition deaktivieren
        rsvpButton.style.transform = 'scale(1.05)';
        setTimeout(() => {
            rsvpButton.style.transition = 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
            rsvpButton.style.transform = 'scale(1)';
        }, 100);

        // Fügt bei Klick eine kurze visuelle Rückmeldung hinzu
        rsvpButton.addEventListener('click', (event) => {
            // Eine kleine Vibration auf unterstützten mobilen Geräten
            if ('vibrate' in navigator) {
                navigator.vibrate(50); // Vibrates for 50ms
            }

            // Kurze visuelle Rückmeldung
            rsvpButton.classList.add('clicked');
            setTimeout(() => {
                rsvpButton.classList.remove('clicked');
            }, 300);
        });
    }

    // Optional: Beobachter für Elemente, die beim Scrollen eingeblendet werden sollen
    // Aktuell nutzen wir statische Delays, aber für komplexere Animationen wäre das hier der Startpunkt
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionsToAnimate = document.querySelectorAll('.fade-in-delay, .fade-in-delay-more, .fade-in-delay-final');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Animation nur einmal abspielen
            }
        });
    }, observerOptions);

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });
});