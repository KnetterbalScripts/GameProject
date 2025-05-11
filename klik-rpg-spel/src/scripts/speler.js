export class Speler {
    constructor() {
        this.naam = 'Hero';
        this.gezondheid = 100;
        this.maxGezondheid = 100;
        this.goud = 100000;
        this.xp = 0;
        this.level = 1;
        this.wapen = { naam: 'Empty', schade: 2 };
        this.inventory = [{ naam: 'Bronze Longsword', schade: 5, sprite: 'BronzeLongsword.png' }];
    }

    aanval(monster) {
        // Bereken eerst de maximum mogelijke schade
        const levelBonus = this.level * (2 + Math.floor(Math.random() * 3)); // Random getal tussen 2-4
        const maxSchade = this.wapen.schade + levelBonus;
        
        // Neem een random waarde tussen 0 en maxSchade
        const totaleSchade = Math.floor(Math.random() * (maxSchade + 1));
        
        monster.neemSchade(totaleSchade);
        return totaleSchade;
    }

    gaNaarHome() {
        const verlorenGoud = Math.floor(this.goud * 0.25);
        this.goud -= verlorenGoud;
        this.gezondheid = this.maxGezondheid;
        document.getElementById('thuisTab')?.click();
    }

    checkLevelUp() {
        const xpNodig = this.level * 50;
        if (this.xp >= xpNodig) {
            this.level++;
            this.xp -= xpNodig;
            this.maxGezondheid += 20;
            this.gezondheid = this.maxGezondheid;
        }
    }

    genees() {
        this.gezondheid = this.maxGezondheid;
    }

    selecteerWapen(index) {
        if (this.inventory[index]) {
            this.wapen = this.inventory[index];
        }
    }

    getXpPercentage() {
        return Math.min((this.xp / (this.level * 50)) * 100, 100);
    }
}