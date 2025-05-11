export class Speler {
    constructor() {
        this.naam = 'Hero';
        this.gezondheid = 100;
        this.maxGezondheid = 100;
        this.goud = 0;
        this.xp = 0;
        this.level = 1;
        this.wapen = {naam: 'Empty', schade:2}; // Voorbeeldwapen
        this.inventory = [{ naam: 'Bronze Longsword', schade: 5, sprite: 'BronzeLongsword.png' }]; // Inventory voor wapens
    }

    genees() {
        this.gezondheid = this.maxGezondheid;
        console.log(`${this.naam} is fully healed!`);
    }

    aanval(monster) {
        const totaleSchade = this.wapen.schade + Math.floor(this.level * Math.random(2, 4));
        monster.neemSchade(totaleSchade);
        console.log(`${this.naam} attacked ${monster.naam} and dealt ${totaleSchade} damage!`);

        if (monster.isDood()) {
            this.goud += monster.goudBeloning;
            this.xp += monster.xpBeloning;
            console.log(`${monster.naam} is defeated! Gold: ${this.goud}, XP: ${this.xp}`);
            this.checkLevelUp();
        } else {
            console.log(`${monster.naam} has ${monster.gezondheid} health remaining.`);
        }

        // Controleer of de speler is verslagen
        if (this.gezondheid <= 0) {
            this.gezondheid = 0; // Zorg ervoor dat de gezondheid niet onder 0 gaat
            this.gaNaarHome(); // Direct naar huis sturen
        }
    }

    gaNaarHome() {
        console.log(`${this.naam} has been defeated and is returning home.`);

        // Verlies 25% van het goud
        const verlorenGoud = Math.floor(this.goud * 0.25);
        this.goud -= verlorenGoud;
        console.log(`You lost 25% of your gold (${verlorenGoud}). Remaining gold: ${this.goud}.`);

        // Herstel gezondheid
        this.gezondheid = this.maxGezondheid;

        // Simuleer een klik op de "Home"-tab
        const thuisTab = document.getElementById('thuisTab');
        if (thuisTab) {
            thuisTab.click(); // Simuleer een klik op de "Home"-tab
        }
    }

    checkLevelUp() {
        const xpNodig = this.level * 50;
        if (this.xp >= xpNodig) {
            this.level++;
            this.xp -= xpNodig;
            this.maxGezondheid += 20;
            this.gezondheid = this.maxGezondheid;
            console.log(`Congratulations! ${this.naam} is now level ${this.level}`);
        }
    }

    voegToeAanInventory(item) {
        this.inventory.push(item);
        console.log(`${item.naam} has been added to your inventory.`);
    }

    selecteerWapen(index) {
        if (this.inventory[index]) {
            this.wapen = this.inventory[index];
            console.log(`You have selected ${this.wapen.naam} as your active weapon.`);
        } else {
            console.log('Invalid weapon!');
        }
    }

    getXpPercentage() {
        const xpNodig = this.level * 50;
        return Math.min((this.xp / xpNodig) * 100, 100); // Zorg ervoor dat het percentage niet boven 100% gaat
    }
}