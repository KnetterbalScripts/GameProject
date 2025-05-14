export class Item {
    constructor(config) {
        this.name = config.name;
        this.damage = config.damage || 0;
        this.cost = config.cost || 0;
        // Remove .png if it's already in the sprite name
        this.sprite = config.sprite.endsWith('.png') ? 
            config.sprite : 
            config.sprite + '.png';
        this.amount = config.amount || 1;
    }

    getSellPrice() {
        return Math.floor(this.cost * 0.5);
    }

    clone() {
        const cloned = new Item({
            name: this.name,
            damage: this.damage,
            cost: this.cost,
            sprite: this.sprite,
            amount: this.amount
        });
        return cloned;
    }
}

// Predefined shop items
export const shopItems = [
    new Item({
        name: 'Bronze Longsword',
        damage: 5,
        cost: 25,
        sprite: 'BronzeLongsword' // Remove .png from here
    }),
    new Item({
        name: 'Rune Scimitar',
        damage: 10,
        cost: 50,
        sprite: 'RuneScim'
    }),
    new Item({
        name: 'Dragon Battleaxe',
        damage: 15,
        cost: 100,
        sprite: 'DBattleaxe'
    }),
    new Item({
        name: 'Magic Shortbow',
        damage: 20,
        cost: 150,
        sprite: 'MagicShortbow'
    }),
    new Item({
        name: 'Trident Of The Swamps',
        damage: 25,
        cost: 200,
        sprite: 'ToxicTrident'
    }),
    new Item({
        name: 'Scythe Of Vitur',
        damage: 40,
        cost: 500,
        sprite: 'ScytheOfVitur'
    }),
    new Item({
        name: 'Twisted Bow',
        damage: 50,
        cost: 1000,
        sprite: 'Tbow'
    }),
    new Item({
        name: 'Tumekens\'s Shadow',
        damage: 70,
        cost: 1250,
        sprite: 'Tumekens'
    })
];

// Supplies/resources that can be dropped by monsters
export const supplies = [
    new Item({
        name: 'Dragonhide',
        cost: 10,
        sprite: 'Dragonhide',
        type: 'supply'
    }),
    new Item({
        name: 'Rune Ore',
        cost: 15,
        sprite: 'RuneOre',
        type: 'supply'
    }),
    new Item({
        name: 'Magic Logs',
        cost: 20,
        sprite: 'MagicLogs',
        type: 'supply'
    }),
    new Item({
        name: 'Dragon Bones',
        cost: 25,
        sprite: 'DragonBones',
        type: 'supply'
    })
];