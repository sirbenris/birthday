document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.querySelector('.intro-overlay');
    const contentWrapper = document.querySelector('.content-wrapper');
    const sections = document.querySelectorAll('.section'); // Alle Abschnitte, die animiert werden sollen
    const rsvpYesButton = document.getElementById('whatsapp-yes-button');
    const rsvpNoButton = document.getElementById('whatsapp-no-button');
    const greetingElement = document.getElementById('greeting');

    const introDuration = 2500; // Dauer des Intro-Overlays in ms
    const sectionAnimationDelay = 600; // Verzögerung zwischen den Einblendungen der Sektionen in ms

    // --- Funktion zur persönlichen Begrüßung ---
    function getGuestNameFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        let name = urlParams.get('name');
        if (name) {
            // Optional: Namen decodieren und nur den ersten Teil verwenden
            name = decodeURIComponent(name.split(' ')[0]);
            return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // Erster Buchstabe groß, Rest klein
        }
        return null;
    }

    const guestName = getGuestNameFromUrl();
    if (guestName) {
        greetingElement.textContent = `Hallo ${guestName}!`;
    } else {
        greetingElement.textContent = `Hallo Freund!`; // Standardbegrüßung
    }

    // --- Intro-Overlay ausblenden und Hauptinhalt einblenden ---
    setTimeout(() => {
        if (introOverlay) {
            introOverlay.style.opacity = '0';
            introOverlay.style.visibility = 'hidden';
            // Nach dem Ausblenden des Overlays, zeige den Haupt-Content-Wrapper
            if (contentWrapper) {
                contentWrapper.style.opacity = '1';
                contentWrapper.style.transform = 'translateY(0)';
                
                // Nun die einzelnen Sektionen nacheinander einfliegen lassen
                animateSectionsSequentially(0);
            }
        }
    }, introDuration);

    // --- Funktion zum sequenziellen Einfliegen der Sektionen ---
    function animateSectionsSequentially(index) {
        if (index < sections.length) {
            const section = sections[index];
            section.classList.add('show');

            // Setze den Timeout für die nächste Sektion
            setTimeout(() => {
                animateSectionsSequentially(index + 1);
            }, sectionAnimationDelay);
        } else {
            // Alle Sektionen sind eingeflogen, jetzt Scrollen aktivieren
            document.body.style.overflowY = 'auto';
        }
    }

    // --- WhatsApp-Links generieren und Event Listener hinzufügen ---
    // Ersetze 'DEINE_TELEFONNUMMER' mit deiner Nummer im internationalen Format (ohne +, Klammern, Leerzeichen)
    // Beispiel: Deutschland +49 176 12345678 -> 4917612345678
    const yourPhoneNumber = '49123456789'; // <<< HIER DEINE NUMMER ANPASSEN!

    // Text für Zusage
    const yesMessage = encodeURIComponent(`Hallo Ben, ich komme gerne zu deinem Geburtstag am 26.07.2025!`);
    const yesWhatsappLink = `https://wa.me/${yourPhoneNumber}?text=${yesMessage}`;

    // Text für Absage
    const noMessage = encodeURIComponent(`Hallo Ben, vielen Dank für die Einladung, aber ich kann leider nicht zu deinem Geburtstag am 26.07.2025 kommen.`);
    const noWhatsappLink = `https://wa.me/${yourPhoneNumber}?text=${noMessage}`;

    if (rsvpYesButton) {
        rsvpYesButton.href = yesWhatsappLink;
        rsvpYesButton.addEventListener('click', (event) => {
            // Optionale Vibration bei Klick auf Mobilgeräten
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            rsvpYesButton.classList.add('clicked');
            setTimeout(() => {
                rsvpYesButton.classList.remove('clicked');
            }, 300);
        });
    }

    if (rsvpNoButton) {
        rsvpNoButton.href = noWhatsappLink;
        rsvpNoButton.addEventListener('click', (event) => {
            if ('vibrate' in navigator) {
                navigator.vibrate(50);
            }
            rsvpNoButton.classList.add('clicked');
            setTimeout(() => {
                rsvpNoButton.classList.remove('clicked');
            }, 300);
        });
    }
});
