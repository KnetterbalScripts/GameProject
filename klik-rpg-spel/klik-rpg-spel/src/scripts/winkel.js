export class Winkel {
    constructor(speler) {
        this.speler = speler;
        this.ui = null; // De UI-instantie wordt later gekoppeld
        this.items = [
            { naam: 'Zwaard', schade: 10, kosten: 50 },
            { naam: 'Bijl', schade: 15, kosten: 100 },
            { naam: 'Boog', schade: 20, kosten: 150 },
            { naam: 'Magische Staf', schade: 25, kosten: 200 },
            { naam: 'Necro Staf', schade: 40, kosten: 500 },
            { naam: 'Twisted Bow', schade: 50, kosten: 1000 },
            { naam: 'Tumekens Shadow', schade: 70, kosten: 1250 },
        ];
    }

    koopItem(index) {
        const item = this.items[index];
        if (item) {
            if (this.speler.goud >= item.kosten) {
                this.speler.goud -= item.kosten;
                this.speler.voegToeAanInventory(item);
                console.log(`${item.naam} is toegevoegd aan je inventory.`);
                console.log(`Je hebt ${item.naam} gekocht!`);
                if (this.ui) {
                    this.ui.toonInventory(); // Update de inventory via de UI-instantie
                    this.ui.updateStatistieken(); // Update de statistieken
                } else {
                    console.error('UI-instantie is niet gekoppeld aan de winkel.');
                }
            } else {
                console.log('Niet genoeg goud!');
            }
        } else {
            console.log('Ongeldig item!');
        }
    }
}