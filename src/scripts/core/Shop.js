import { shopItems } from './Item.js';

export class Shop {
    constructor(player) {
        this.player = player;
        this.items = shopItems;
        this.ui = null;
    }

    // UI callback setup
    setUiCallback(callback) {
        this.ui = callback;
    }

    // Transaction methods
    buyItem(index) {
        const item = this.items[index];
        if (!this.canAfford(item)) return false;

        this.processTransaction(item);
        this.updateUI();
        return true;
    }

    canAfford(item) {
        return this.player.stats.gold >= item.cost;
    }

    processTransaction(item) {
        this.player.stats.gold -= item.cost;
        const newItem = item.clone();
        this.player.addItemToInventory(newItem);
    }

    // UI update
    updateUI() {
        if (this.ui) {
            this.ui.updateStats();
            this.ui.updateShop();
        }
    }
}