document.addEventListener('DOMContentLoaded', () => {
    const introSections = document.querySelectorAll('.intro-section');
    const body = document.body; // Referenz zum body-Element
    let currentSectionIndex = 0;

    // Setze initial den Overflow auf hidden, damit während der Animation nicht gescrollt werden kann
    body.style.overflow = 'hidden';

    function showNextSection() {
        if (currentSectionIndex < introSections.length) {
            const currentSection = introSections[currentSectionIndex];

            // Entferne alle vorherigen Abschnitte aus dem DOM, um Überlagerungsprobleme zu vermeiden
            if (currentSectionIndex > 0) {
                introSections[currentSectionIndex - 1].remove();
            }

            // Stelle sicher, dass die aktuelle Sektion sichtbar und nicht absolut positioniert ist für die Animation
            // Wir werden die Sektion direkt in den Body einfügen, wenn sie an der Reihe ist
            currentSection.style.position = 'relative'; // Wichtig, damit sie Platz einnimmt
            currentSection.style.opacity = '0'; // Sicherstellen, dass sie unsichtbar ist
            currentSection.style.display = 'flex'; // Wieder auf flex setzen, falls vorher 'none'

            // Füge die Sektion wieder zum Body hinzu, falls sie entfernt wurde
            // Dies ist wichtig, da wir sie oben aus dem DOM entfernen
            if (!body.contains(currentSection)) {
                body.appendChild(currentSection);
            }

            // Timeout um sicherzustellen, dass das Element im DOM ist bevor opacity gesetzt wird
            setTimeout(() => {
                currentSection.style.opacity = '1'; // Einblenden
            }, 50); // Kurze Verzögerung

            // Warte, bis die Animation abgeschlossen ist, und gehe dann zur nächsten Sektion
            setTimeout(() => {
                currentSectionIndex++;
                showNextSection(); // Rufe die Funktion rekursiv für die nächste Sektion auf
            }, 3000); // 3 Sekunden (ca. 1s für Einblenden + 2s Anzeige)

        } else {
            // Alle Intro-Animationen sind durchgelaufen
            // Entferne die letzte Intro-Sektion
            if (introSections.length > 0 && body.contains(introSections[introSections.length - 1])) {
                introSections[introSections.length - 1].remove();
            }

            // Erstelle den vollständigen Infobereich neu oder zeige ihn an
            // Da wir die Intro-Sektionen entfernen, müssen wir den fullInfoSection eventuell neu erstellen oder anhängen
            const fullInfoHtml = `
                <div class="full-info-section visible">
                    <h2>Meine 39. Geburtstagsfeier</h2>
                    <p>Hallo liebe Freunde und Familie,</p>
                    <p>ich möchte meinen 39. Geburtstag gerne mit euch feiern und lade euch herzlich dazu ein!</p>
                    
                    <h3>Wann?</h3>
                    <p>Freitag, 02. August 2025</p>
                    <p>Uhrzeit: 18:00 Uhr</p>

                    <h3>Wo?</h3>
                    <p>Bei mir im Garten</p>
                    <p>[Deine Adresse hier einfügen, z.B. Musterstraße 1, 12345 Musterstadt]</p>
                    <p>
                        <a href="https://www.google.com/maps/search/?api=1&query=[Deine Adresse hier]" target="_blank" class="map-link">Auf Google Maps anzeigen</a>
                    </p>

                    <h3>Was erwartet euch?</h3>
                    <p>Für leckere Speisen und erfrischende Getränke ist bestens gesorgt.</p>
                    <p>Gute Laune und entspanntes Beisammensein stehen im Vordergrund!</p>

                    <h3>Bitte um Rückmeldung!</h3>
                    <p>Damit ich besser planen kann, gib mir bitte bis zum **[Datum, z.B. 20. Juli 2025]** Bescheid, ob du dabei sein kannst.</p>
                    
                    <a href="https://wa.me/DeineTelefonnummer?text=Hallo%20ich%20komme%20gerne%20zu%20deinem%20Geburtstag!" class="whatsapp-button" target="_blank">
                        Ich komme! (WhatsApp)
                    </a>
                    <p class="whatsapp-note">Klicke hier, um mir per WhatsApp zu antworten.</p>
                </div>
            `;
            
            // Füge den vollständigen Infobereich zum Body hinzu
            body.insertAdjacentHTML('beforeend', fullInfoHtml);

            // Scrolle sanft zum Anfang des neu hinzugefügten Bereichs
            const newFullInfoSection = document.
