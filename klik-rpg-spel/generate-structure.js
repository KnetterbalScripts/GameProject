const fs = require('fs');
const path = require('path');

// Structuurdefinitie
const structuur = {
    'klik-rpg-spel': {
        src: {
            'index.html': '',
            styles: {
                'stijlen.css': '',
            },
            scripts: {
                'hoofd.js': '',
                'speler.js': '',
                'monster.js': '',
                'winkel.js': '',
                'ui.js': '',
                'spel.js': '',
            },
        },
        assets: {
            afbeeldingen: {},
            audio: {},
        },
        'package.json': '',
        'README.md': '',
    },
};

// Functie om de structuur te genereren
function maakStructuur(basisPad, structuur) {
    for (const naam in structuur) {
        const itemPad = path.join(basisPad, naam);
        if (typeof structuur[naam] === 'object') {
            // Maak map
            if (!fs.existsSync(itemPad)) {
                fs.mkdirSync(itemPad);
                console.log(`Map gemaakt: ${itemPad}`);
            }
            // Recursief aanroepen
            maakStructuur(itemPad, structuur[naam]);
        } else {
            // Maak bestand
            if (!fs.existsSync(itemPad)) {
                fs.writeFileSync(itemPad, structuur[naam]);
                console.log(`Bestand gemaakt: ${itemPad}`);
            }
        }
    }
}

// Startpunt
maakStructuur(__dirname, structuur);