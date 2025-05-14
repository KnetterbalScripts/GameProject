import { GameState } from '../utils/GameState.js';
import { Item } from './Item.js';
import { StatsView } from '../components/StatsView.js';

export class Player {
    constructor() {
        const savedGame = GameState.loadGame();

        if (savedGame && savedGame.stats && savedGame.equipment && Array.isArray(savedGame.inventory)) {
            // Load saved data with validation
            this.stats = {
                name: savedGame.stats.name || 'Hero',
                health: savedGame.stats.health || 100,
                maxHealth: savedGame.stats.maxHealth || 100,
                gold: savedGame.stats.gold || 0,
                xp: savedGame.stats.xp || 0,
                level: savedGame.stats.level || 1
            };

            this.equipment = {
                weapon: savedGame.equipment.weapon || {
                    name: "Fists",
                    damage: 1,
                    sprite: "./dist/afbeeldingen/fist.png",
                    isDefault: true
                }
            };

            this.inventory = savedGame.inventory.map(item => new Item({
                name: item.name || '',
                damage: item.damage || 0,
                cost: item.cost || 0,
                sprite: item.sprite || '',
                amount: item.amount || 1
            }));
        } else {
            // Initialize new game
            this.stats = {
                name: 'Hero',
                health: 100,
                maxHealth: 100,
                gold: 10,
                xp: 0,
                level: 1
            };

            this.equipment = {
                weapon: {
                    name: "Fists",
                    damage: 1,
                    sprite: "fist.png",
                    isDefault: true
                }
            };

            this.inventory = [
                new Item({
                    name: 'Bronze Longsword',
                    damage: 5,
                    cost: 25,
                    sprite: 'BronzeLongsword.png',
                    amount: 1
                })
            ];
        }

        this.inventorySize = 28;
        this.uiCallback = null;
    }

    // Combat methods
    attack(monster) {
        const levelBonus = this.calculateLevelBonus();
        const totalDamage = this.calculateDamage(levelBonus);
        monster.takeDamage(totalDamage);
        return totalDamage;
    }

    calculateLevelBonus() {
        return this.stats.level * (2 + Math.floor(Math.random() * 3));
    }

    calculateDamage(levelBonus) {
        const maxDamage = this.equipment.weapon.damage + levelBonus;
        return Math.floor(Math.random() * (maxDamage + 1));
    }

    // Health methods
    heal() {
        this.stats.health = this.stats.maxHealth;
    }

    // Inventory methods
    addItemToInventory(item) {
        const existingItem = this.inventory.find(i => i.name === item.name);

        if (existingItem) {
            existingItem.amount = (existingItem.amount || 1) + (item.amount || 1);
        } else {
            this.inventory.push({
                ...item,
                amount: item.amount || 1,
                getSellPrice: function() {
                    return Math.floor(this.cost * 0.5);
                }
            });
        }

        this.updateUI();
    }

    sellItem(index) {
        const item = this.inventory[index];
        if (item) {
            const sellPrice = Math.floor(item.cost * 0.75);
            this.stats.gold += sellPrice;
            
            if (item.amount > 1) {
                item.amount--;
            } else {
                this.inventory.splice(index, 1);
            }
            
            return sellPrice;
        }
        return 0;
    }

    // Equipment methods
    equipWeapon(weapon) {
        // Don't store the default weapon in inventory
        const oldWeapon = this.equipment.weapon;
        
        // Equip new weapon
        this.equipment.weapon = weapon;
        
        // Update UI
        if (this.uiCallback) {
            this.uiCallback.updateStats();
        }

        return oldWeapon;
    }

    setUiCallback(callback) {
        this.uiCallback = callback;
    }

    // Progress methods
    checkLevelUp() {
        const xpNeeded = this.stats.level * 50;
        while (this.stats.xp >= xpNeeded) {
            this.levelUp();
            // Update UI after level up
            this.updateUI();
        }
    }

    levelUp() {
        this.stats.level++;
        this.stats.xp = this.stats.xp - ((this.stats.level - 1) * 50); // Carry over excess XP
        this.stats.maxHealth += 20;
        this.stats.health = this.stats.maxHealth;
    }

    getXpPercentage() {
        const xpNeeded = this.stats.level * 50;
        return (this.stats.xp / xpNeeded) * 100;
    }

    // Add this method to handle receiving XP
    addXp(amount) {
        this.stats.xp += amount;
        this.checkLevelUp();
        this.updateUI();
    }

    // Movement methods
    goHome() {

        this.heal();
        document.getElementById('homeTab')?.click();
    }

    updateUI() {
        if (this.uiCallback) {
            if (this.uiCallback.updateStats) this.uiCallback.updateStats();
            if (this.uiCallback.updateInventory) this.uiCallback.updateInventory();
        }
    }

    // Add save method
    saveGame() {
        const saved = GameState.saveGame(this);
        if (saved) {
            console.log('Game saved successfully!');
        }
        return saved;
    }

    addGold(amount) {
        console.log('DEBUG: Adding gold');
        console.log('Current gold:', this.stats.gold);
        console.log('Adding:', amount);
        
        this.stats.gold += amount;
        
        console.log('New total:', this.stats.gold);
        
        if (this.uiCallback) {
            this.uiCallback.updateStats();
        }
    }
}