export class Winkel {
    constructor(speler) {
        this.speler = speler;
        this.ui = null; // De UI-instantie wordt later gekoppeld
        this.items = [
            { naam: 'Rune Scimitar', schade: 10, kosten: 50, sprite: 'RuneScim.png' },
            { naam: 'Dragon Battleaxe', schade: 15, kosten: 100, sprite: 'DBattleaxe.png' },
            { naam: 'Magic Shortbow', schade: 20, kosten: 150, sprite: 'MagicShortbow.png' },
            { naam: 'Trident Of The Swamps', schade: 25, kosten: 200 , sprite: 'ToxicTrident.png' },
            { naam: 'Scythe Of Vitur', schade: 40, kosten: 500, sprite: 'ScytheOfVitur.png' },
            { naam: 'Twisted Bow', schade: 50, kosten: 1000 , sprite: 'Tbow.png' },
            { naam: 'Tumekens\'s Shadow', schade: 70, kosten: 1250, sprite: 'Tumekens.png'},
        ];
    }

    koopItem(index) {
        const item = this.items[index];
        if (item) {
            if (this.speler.goud >= item.kosten) {
                this.speler.goud -= item.kosten;
                this.speler.voegToeAanInventory(item);
                console.log(`You have purchased ${item.naam}!`);
                if (this.ui) {
                    this.ui.toonInventory(); // Update de inventory via de UI-instantie
                    this.ui.updateStatistieken(); // Update de statistieken
                } else {
                    console.error('UI instance is not linked to the shop.');
                }
            } else {
                console.log('Not enough gold!');
            }
        } else {
            console.log('Invalid item!');
        }
    }
}