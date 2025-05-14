import { supplies } from './Item.js';

export class Monster {
    constructor(config) {
        this.name = config.name;
        this.health = config.health;
        this.maxHealth = config.health;
        this.damage = config.damage;
        this.goldDrop = config.goldDrop;
        this.xp = config.xp;
        this.sprite = config.sprite;
        this.type = config.type || 'normal';
        this.drops = config.drops || [];
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
        return this.health <= 0;
    }

    isDead() {
        return this.health <= 0;
    }

    dealDamage() {
        return Math.floor(Math.random() * (this.damage + 1));
    }

    getHealthPercentage() {
        return (this.health / this.maxHealth) * 100;
    }

    respawn() {
        this.health = this.maxHealth;
    }
}

export const dungeons = [
    {
        name: 'Lumbridge Catacombs',
        monsters: [
            new Monster({ name: 'Giant Rat', health: 25, damage: 4, goldDrop: 5, xp: 10, sprite: 'giant-rat', type: 'normal' }),
            new Monster({ name: 'Skeleton', health: 35, damage: 6, goldDrop: 8, xp: 15, sprite: 'skeleton', type: 'normal' }),
            new Monster({ name: 'Zombie', health: 40, damage: 7, goldDrop: 10, xp: 20, sprite: 'zombie', type: 'normal' }),
            new Monster({ name: 'Cave Bug', health: 20, damage: 3, goldDrop: 3, xp: 8, sprite: 'cave-bug', type: 'normal' }),
            new Monster({ name: 'Cave Crawler', health: 30, damage: 5, goldDrop: 6, xp: 12, sprite: 'cave-crawler', type: 'normal' })
        ]
    },
    {
        name: 'Edgeville Dungeon',
        monsters: [
            new Monster({ name: 'Hobgoblin', health: 50, damage: 10, goldDrop: 15, xp: 30, sprite: 'hobgoblin', type: 'normal' }),
            new Monster({ name: 'Chaos Druid', health: 60, damage: 12, goldDrop: 20, xp: 40, sprite: 'chaos-druid', type: 'normal' }),
            new Monster({ name: 'Black Knight', health: 80, damage: 15, goldDrop: 25, xp: 50, sprite: 'black-knight', type: 'normal' }),
            new Monster({ name: 'Hill Giant', health: 70, damage: 14, goldDrop: 18, xp: 35, sprite: 'hill-giant', type: 'normal' }),
            new Monster({ name: 'Earth Warrior', health: 90, damage: 16, goldDrop: 22, xp: 45, sprite: 'earth-warrior', type: 'normal' })
        ]
    },
    {
        name: 'Taverley Dungeon',
        monsters: [
            new Monster({ name: 'Poison Scorpion', health: 70, damage: 14, goldDrop: 20, xp: 45, sprite: 'poison-scorpion', type: 'normal' }),
            new Monster({ name: 'Blue Dragon', health: 150, damage: 25, goldDrop: 50, xp: 100, sprite: 'blue-dragon', type: 'normal' }),
            new Monster({ name: 'Black Demon', health: 200, damage: 30, goldDrop: 70, xp: 150, sprite: 'black-demon', type: 'normal' }),
            new Monster({ name: 'Chaos Dwarf', health: 80, damage: 18, goldDrop: 25, xp: 50, sprite: 'chaos-dwarf', type: 'normal' }),
            new Monster({ name: 'Hellhound', health: 120, damage: 22, goldDrop: 40, xp: 80, sprite: 'hellhound', type: 'normal' })
        ]
    },
    {
        name: 'Brimhaven Dungeon',
        monsters: [
            new Monster({ name: 'Moss Giant', health: 100, damage: 18, goldDrop: 30, xp: 60, sprite: 'moss-giant', type: 'normal' }),
            new Monster({ name: 'Fire Giant', health: 120, damage: 22, goldDrop: 40, xp: 80, sprite: 'fire-giant', type: 'normal' }),
            new Monster({ name: 'Steel Dragon', health: 250, damage: 35, goldDrop: 100, xp: 200, sprite: 'steel-dragon', type: 'normal' }),
            new Monster({ name: 'Bronze Dragon', health: 200, damage: 30, goldDrop: 80, xp: 160, sprite: 'bronze-dragon', type: 'normal' }),
            new Monster({ name: 'Iron Dragon', health: 220, damage: 32, goldDrop: 90, xp: 180, sprite: 'iron-dragon', type: 'normal' })
        ]
    },
    {
        name: 'God Wars Dungeon',
        monsters: [
            new Monster({ name: 'General Graardor', health: 300, damage: 40, goldDrop: 150, xp: 300, sprite: 'general-graardor', type: 'boss' }),
            new Monster({ name: 'Kree\'arra', health: 350, damage: 45, goldDrop: 200, xp: 400, sprite: 'kree-arra', type: 'boss' }),
            new Monster({ name: 'Commander Zilyana', health: 320, damage: 42, goldDrop: 180, xp: 360, sprite: 'commander-zilyana', type: 'boss' }),
            new Monster({ name: 'K\'ril Tsutsaroth', health: 340, damage: 44, goldDrop: 190, xp: 380, sprite: 'kril-tsutsaroth', type: 'boss' })
        ]
    },
    {
        name: 'Elite Bosses',
        monsters: [
            new Monster({ name: 'Zulrah', health: 800, damage: 60, goldDrop: 300, xp: 600, sprite: 'zulrah', type: 'boss' }),
            new Monster({ name: 'Vorkath', health: 900, damage: 70, goldDrop: 400, xp: 800, sprite: 'vorkath', type: 'boss' }),
            new Monster({ name: 'The Nightmare', health: 1000, damage: 80, goldDrop: 500, xp: 1000, sprite: 'the-nightmare', type: 'boss' }),
            new Monster({ name: 'Kraken', health: 1200, damage: 90, goldDrop: 600, xp: 1200, sprite: 'kraken', type: 'boss' }),
            new Monster({ name: 'Cerberus', health: 1500, damage: 100, goldDrop: 700, xp: 1500, sprite: 'cerberus', type: 'boss' })
        ]
    }
];