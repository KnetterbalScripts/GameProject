import { supplies } from "../items";
export class Drop {
    constructor(naam, kans, hoeveelheid) {
        this.naam = naam; // Naam van het item (bijv. "Gold", "Potion", "Sword")
        this.kans = kans; // Dropkans in procenten (bijv. 50 betekent 50%)
        this.hoeveelheid = hoeveelheid; // Hoeveelheid van het item
    }
}

export class DropList {
    constructor() {
        this.drops = []; // Lijst van mogelijke drops
    }

    voegDropToe(drop) {
        this.drops.push(drop); // Voeg een drop toe aan de lijst
    }

    genereerDrops() {
        const gegenereerdeDrops = [];
        this.drops.forEach(drop => {
            if (Math.random() * 100 < drop.kans) {
                gegenereerdeDrops.push(drop);
            }
        });
        return gegenereerdeDrops; // Retourneer de lijst van gegenereerde drops
    }
}