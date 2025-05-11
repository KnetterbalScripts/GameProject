import { Speler } from './speler.js';
import { Winkel } from './winkel.js';
import { UI } from './ui.js';
import { kerkers, Monster } from './monster.js';
import { Drop } from './droplist.js';

const speler = new Speler();
const winkel = new Winkel(speler); // Initialiseer de winkel
const ui = new UI(speler, winkel); // Initialiseer de UI en geef de winkel door
winkel.ui = ui; // Koppel de UI-instantie aan de winkel

const monster = new Monster('Giant Rat', 25, 4, 5, 10, 'giant-rat');

// Voeg drops toe aan het monster
//monster.dropList.voegDropToe(new Drop('Gold', 100, 10)); // 100% kans op 10 gold
//monster.dropList.voegDropToe(new Drop('Potion', 50, 1)); // 50% kans op 1 potion

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


    // Eventlistener for the heal button
    const healButton = document.getElementById('healButton');
    healButton.addEventListener('click', () => {
        if (speler.gezondheid === speler.maxGezondheid) {
            console.log('Je bent al op volle gezondheid!');
        } else {
            speler.genees();
            ui.updateStatistieken(); // Update de statistieken na genezing
        }
    });

    // Simuleer een gevecht
    if (monster.isDood()) {
        const drops = monster.genereerDrops();
        drops.forEach(drop => {
            console.log(`You received ${drop.hoeveelheid}x ${drop.naam}!`);
            if (drop.naam === 'Gold') {
                speler.goud += drop.hoeveelheid;
            }
            // Voeg andere logica toe voor specifieke items
        });
    }
});