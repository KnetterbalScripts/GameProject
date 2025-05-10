import { Speler } from './speler.js';
import { Winkel } from './winkel.js';
import { UI } from './ui.js';
import { kerkers } from './monster.js';

const speler = new Speler();
const winkel = new Winkel(speler); // Initialiseer de winkel
const ui = new UI(speler, winkel); // Initialiseer de UI en geef de winkel door
winkel.ui = ui; // Koppel de UI-instantie aan de winkel

document.addEventListener('DOMContentLoaded', () => {
    ui.installeerTabs();
    ui.updateStatistieken();
    ui.toonWinkel();
    ui.toonKerkers(kerkers);
    ui.toonInventory(); // Zorg ervoor dat de inventory wordt weergegeven bij het laden

    const kerkerSelect = document.getElementById('kerkerSelect');
    kerkerSelect.addEventListener('change', () => {
        const geselecteerdeKerker = kerkerSelect.value;
        const monsters = kerkers[geselecteerdeKerker];
        ui.toonMonsters(monsters);
    });

    // Toon monsters van de standaard geselecteerde kerker
    const monsters = kerkers[Object.keys(kerkers)[0]];
    ui.toonMonsters(monsters);

    // Eventlistener voor de genezen-knop
    const geneesKnop = document.getElementById('geneesKnop'); // Correcte ID
    geneesKnop.addEventListener('click', () => {
        if (speler.gezondheid === speler.maxGezondheid) {
            console.log('Je bent al op volle gezondheid!');
        } else {
            speler.genees();
            ui.updateStatistieken(); // Update de statistieken na genezing
        }
    });
});