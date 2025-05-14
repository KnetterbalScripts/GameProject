import { Player } from './core/Player.js';
import { Shop } from './core/Shop.js';
import { UI } from './components/UI.js';

document.addEventListener('DOMContentLoaded', () => {
    // Create core game instances
    const player = new Player();
    const shop = new Shop(player);
    
    // Create and initialize UI
    const ui = new UI(player, shop);
    
    // Set UI callback in shop
    shop.setUiCallback({
        updateStats: () => ui.statsView.render(),
        updateShop: () => ui.shopView.render('shopContainer')
    });
});