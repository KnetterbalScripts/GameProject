export class Monster {
    constructor(naam, gezondheid, schade, goudBeloning, xpBeloning, sprite) {
        this.naam = naam;
        this.maxGezondheid = gezondheid;
        this.gezondheid = gezondheid;
        this.schade = schade;
        this.goudBeloning = goudBeloning;
        this.xpBeloning = xpBeloning;
        this.sprite = sprite; // Voeg een sprite toe
    }

    neemSchade(schade) {
        this.gezondheid -= schade;
        console.log(`has received ${schade} damage. Remaining health: ${this.gezondheid}`);
    }

    doeSchade(speler) {
        speler.gezondheid -= this.schade;
        console.log(`has dealt ${this.schade} damage to ${speler.naam}. Remaining health: ${speler.gezondheid}`);
        if (speler.gezondheid <= 0) {
            console.log(`${speler.naam} is verslagen!`);
        }
    }

    isDood() {
        return this.gezondheid <= 0;
    }

    respawn() {
        this.gezondheid = this.maxGezondheid;
        console.log(`${this.naam} has respawned with ${this.gezondheid} health.`);
    }
}

export const kerkers = {
    'Lumbridge Catacombs': [
        new Monster('Giant Rat', 25, 4, 5, 10, 'giant-rat'),
        new Monster('Skeleton', 35, 6, 8, 15, 'skeleton'),
        new Monster('Zombie', 40, 7, 10, 20, 'zombie'),
        new Monster('Cave Bug', 20, 3, 3, 8, 'cave-bug'),
        new Monster('Cave Crawler', 30, 5, 6, 12, 'cave-crawler'),
    ],
    'Edgeville Dungeon': [
        new Monster('Hobgoblin', 50, 10, 15, 30, 'hobgoblin'),
        new Monster('Chaos Druid', 60, 12, 20, 40, 'chaos-druid'),
        new Monster('Black Knight', 80, 15, 25, 50, 'black-knight'),
        new Monster('Hill Giant', 70, 14, 18, 35, 'hill-giant'),
        new Monster('Earth Warrior', 90, 16, 22, 45, 'earth-warrior'),
    ],
    'Taverley Dungeon': [
        new Monster('Poison Scorpion', 70, 14, 20, 45, 'poison-scorpion'),
        new Monster('Blue Dragon', 150, 25, 50, 100, 'blue-dragon'),
        new Monster('Black Demon', 200, 30, 70, 150, 'black-demon'),
        new Monster('Chaos Dwarf', 80, 18, 25, 50, 'chaos-dwarf'),
        new Monster('Hellhound', 120, 22, 40, 80, 'hellhound'),
    ],
    'Brimhaven Dungeon': [
        new Monster('Moss Giant', 100, 18, 30, 60, 'moss-giant'),
        new Monster('Fire Giant', 120, 22, 40, 80, 'fire-giant'),
        new Monster('Steel Dragon', 250, 35, 100, 200, 'steel-dragon'),
        new Monster('Bronze Dragon', 200, 30, 80, 160, 'bronze-dragon'),
        new Monster('Iron Dragon', 220, 32, 90, 180, 'iron-dragon'),
    ],
    'God Wars Dungeon': [
        new Monster('Spiritual Warrior', 180, 28, 60, 120, 'spiritual-warrior'),
        new Monster('Spiritual Mage', 200, 30, 70, 140, 'spiritual-mage'),
        new Monster('Spiritual Ranger', 190, 29, 65, 130, 'spiritual-ranger'),
        new Monster('General Graardor', 300, 40, 150, 300, 'general-graardor'),
        new Monster('Kree\'arra', 350, 45, 200, 400, 'kree-arra'),
        new Monster('Commander Zilyana', 320, 42, 180, 360, 'commander-zilyana'),
        new Monster('K\'ril Tsutsaroth', 340, 44, 190, 380, 'kril-tsutsaroth'),
    ],
    'Wilderness Dungeon': [
        new Monster('Revenant Imp', 50, 12, 20, 40, 'revenant-imp'),
        new Monster('Revenant Goblin', 70, 15, 25, 50, 'revenant-goblin'),
        new Monster('Revenant Knight', 150, 30, 60, 120, 'revenant-knight'),
        new Monster('Revenant Dragon', 300, 50, 150, 300, 'revenant-dragon'),
        new Monster('Chaos Elemental', 400, 60, 200, 400, 'chaos-elemental'),
    ],
    'Ancient Cavern': [
        new Monster('Waterfiend', 120, 25, 40, 80, 'waterfiend'),
        new Monster('Mithril Dragon', 300, 40, 150, 300, 'mithril-dragon'),
        new Monster('Brutal Green Dragon', 250, 35, 100, 200, 'brutal-green-dragon'),
        new Monster('Brutal Red Dragon', 280, 38, 120, 240, 'brutal-red-dragon'),
        new Monster('Brutal Black Dragon', 350, 50, 200, 400, 'brutal-black-dragon'),
    ],
};