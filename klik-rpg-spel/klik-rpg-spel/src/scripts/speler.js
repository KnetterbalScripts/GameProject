export class Speler {
    constructor() {
        this.naam = 'Held';
        this.gezondheid = 100;
        this.maxGezondheid = 100;
        this.goud = 5000;
        this.xp = 0;
        this.level = 1;
        this.wapen = { naam: 'Vuisten', schade: 5 };
        this.inventory = []; // Inventory voor wapens
    }

    genees() {
        this.gezondheid = this.maxGezondheid;
        console.log(`${this.naam} is volledig genezen!`);
    }

    aanval(monster) {
        const totaleSchade = this.wapen.schade + Math.floor(this.level * Math.random(2,4));;
        monster.neemSchade(totaleSchade);
        console.log(`${this.naam} heeft ${monster.naam} aangevallen en ${totaleSchade} schade toegebracht!`);
        if (monster.isDood()) {
            this.goud += monster.goudBeloning;
            this.xp += monster.xpBeloning;
            console.log(`${monster.naam} is verslagen! Goud: ${this.goud}, XP: ${this.xp}`);
            this.checkLevelUp();
        } else {
            console.log(`${monster.naam} heeft nog ${monster.gezondheid} gezondheid over.`);
        }
        return this.gezondheid;
    }

    checkLevelUp() {
        const xpNodig = this.level * 50;
        if (this.xp >= xpNodig) {
            this.level++;
            this.xp -= xpNodig;
            this.maxGezondheid += 20;
            this.gezondheid = this.maxGezondheid;
            console.log(`Gefeliciteerd! ${this.naam} is nu level ${this.level}`);
        }
    }

    voegToeAanInventory(item) {
        this.inventory.push(item);
        console.log(`${item.naam} is toegevoegd aan je inventory.`);
    }

    selecteerWapen(index) {
        if (this.inventory[index]) {
            this.wapen = this.inventory[index];
            console.log(`Je hebt ${this.wapen.naam} geselecteerd als je actieve wapen.`);
        } else {
            console.log('Ongeldig wapen!');
        }
    }

    getXpPercentage() {
        const xpNodig = this.level * 50;
        return Math.min((this.xp / xpNodig) * 100, 100); // Zorg ervoor dat het percentage niet boven 100% gaat
    }
}