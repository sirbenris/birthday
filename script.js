document.addEventListener('DOMContentLoaded', () => {
    const introSections = document.querySelectorAll('.intro-section');
    const fullInfoSection = document.querySelector('.full-info-section');
    let currentSectionIndex = 0;

    function showNextSection() {
        if (currentSectionIndex < introSections.length) {
            // Blende die aktuelle Sektion ein
            introSections[currentSectionIndex].classList.add('visible');

            // Warte eine Sekunde und blende dann die nächste Sektion ein
            setTimeout(() => {
                // Wenn es nicht die erste Sektion ist, blende die vorherige aus,
                // damit immer nur eine sichtbar ist
                if (currentSectionIndex > 0) {
                    introSections[currentSectionIndex - 1].classList.remove('visible');
                    introSections[currentSectionIndex - 1].style.display = 'none'; // Verstecke sie komplett
                }
                currentSectionIndex++;
                showNextSection(); // Rufe die Funktion rekursiv für die nächste Sektion auf
            }, 3000); // Jede Animation dauert 3 Sekunden (1s Einblenden + 2s Anzeige)
        } else {
            // Alle Intro-Animationen sind durchgelaufen
            // Verstecke die letzte Intro-Sektion nach ihrer Animation
            if (introSections.length > 0) {
                introSections[introSections.length - 1].classList.remove('visible');
                introSections[introSections.length - 1].style.display = 'none';
            }

            // Zeige den vollständigen Infobereich an und lass ihn sanft erscheinen
            fullInfoSection.classList.remove('hidden');
            setTimeout(() => {
                fullInfoSection.classList.add('visible');
                // Scrolle optional nach unten, um den Anfang des scrollbaren Bereichs zu zeigen
                window.scrollTo({
                    top: fullInfoSection.offsetTop,
                    behavior: 'smooth'
                });
            }, 500); // Kurze Verzögerung, bevor der volle Bereich einblendet
        }
    }

    // Starte die Sequenz
    showNextSection();
});
