export class Monster {
    constructor(naam, gezondheid, schade, goudBeloning, xpBeloning, sprite, soort) {
        this.naam = naam;
        this.maxGezondheid = gezondheid;
        this.gezondheid = gezondheid;
        this.schade = schade;
        this.goudBeloning = goudBeloning;
        this.xpBeloning = xpBeloning;
        this.sprite = sprite;
        this.soort = soort;
    }

    neemSchade(schade) {
        this.gezondheid -= schade;
    }

doeSchade(speler) {
    // Random schade tussen 0 en monster.schade
    const totaleSchade = Math.floor(Math.random() * (this.schade + 1));
    speler.gezondheid -= totaleSchade;
    return totaleSchade;
}

    isDood() {
        return this.gezondheid <= 0;
    }

    respawn() {
        this.gezondheid = this.maxGezondheid;
    }
}

export const kerkers = {
    'Lumbridge Catacombs': [
        new Monster('Giant Rat', 25, 4, 5, 10, 'giant-rat', 'normal'),
        new Monster('Skeleton', 35, 6, 8, 15, 'skeleton', 'normal'),
        new Monster('Zombie', 40, 7, 10, 20, 'zombie', 'normal'),
        new Monster('Cave Bug', 20, 3, 3, 8, 'cave-bug', 'normal'),
        new Monster('Cave Crawler', 30, 5, 6, 12, 'cave-crawler', 'normal'),
    ],
    'Edgeville Dungeon': [
        new Monster('Hobgoblin', 50, 10, 15, 30, 'hobgoblin', 'normal'),
        new Monster('Chaos Druid', 60, 12, 20, 40, 'chaos-druid', 'normal'),
        new Monster('Black Knight', 80, 15, 25, 50, 'black-knight', 'normal'),
        new Monster('Hill Giant', 70, 14, 18, 35, 'hill-giant', 'normal'),
        new Monster('Earth Warrior', 90, 16, 22, 45, 'earth-warrior', 'normal'),
    ],
    'Taverley Dungeon': [
        new Monster('Poison Scorpion', 70, 14, 20, 45, 'poison-scorpion', 'normal'),
        new Monster('Blue Dragon', 150, 25, 50, 100, 'blue-dragon', 'normal'),
        new Monster('Black Demon', 200, 30, 70, 150, 'black-demon', 'normal'),
        new Monster('Chaos Dwarf', 80, 18, 25, 50, 'chaos-dwarf', 'normal'),
        new Monster('Hellhound', 120, 22, 40, 80, 'hellhound', 'normal'),
    ],
    'Brimhaven Dungeon': [
        new Monster('Moss Giant', 100, 18, 30, 60, 'moss-giant', 'normal'),
        new Monster('Fire Giant', 120, 22, 40, 80, 'fire-giant', 'normal'),
        new Monster('Steel Dragon', 250, 35, 100, 200, 'steel-dragon', 'normal'),
        new Monster('Bronze Dragon', 200, 30, 80, 160, 'bronze-dragon', 'normal'),
        new Monster('Iron Dragon', 220, 32, 90, 180, 'iron-dragon', 'normal'),
    ],
    'God Wars Dungeon': [
        new Monster('General Graardor', 300, 40, 150, 300, 'general-graardor', 'boss'),
        new Monster('Kree\'arra', 350, 45, 200, 400, 'kree-arra', 'boss'),
        new Monster('Commander Zilyana', 320, 42, 180, 360, 'commander-zilyana', 'boss'),
        new Monster('K\'ril Tsutsaroth', 340, 44, 190, 380, 'kril-tsutsaroth', 'boss'),
    ],
    'Bosses': [
        new Monster('Zulrah', 800, 60, 300, 600, 'zulrah', 'boss'),
        new Monster('Vorkath', 900, 70, 400, 800, 'vorkath', 'boss'),
        new Monster('The Nightmare', 1000, 80, 500, 1000, 'the-nightmare', 'boss'),
        new Monster('Kraken', 1200, 90, 600, 1200, 'kraken', 'boss'),
        new Monster('Cerberus', 1500, 100, 700, 1500, 'cerberus', 'boss'),
    ],
};