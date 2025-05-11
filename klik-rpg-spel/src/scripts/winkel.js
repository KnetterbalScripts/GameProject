import { winkelItems } from './items.js';

export class Winkel {
    constructor(speler) {
        this.speler = speler;
        this.items = winkelItems;
    }

    koopItem(index) {
        const item = this.items[index];
        if (this.speler.goud >= item.kosten) {
            this.speler.goud -= item.kosten;
            this.speler.inventory.push(item);
            return true;
        }
        return false;
    }
}