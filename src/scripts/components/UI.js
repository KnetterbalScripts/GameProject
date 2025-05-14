import { InventoryView } from './InventoryView.js';
import { ShopView } from './ShopView.js';
import { StatsView } from './StatsView.js';
import { DungeonView } from './DungeonView.js';
import { CombatView } from './CombatView.js';
import { Combat } from '../core/Combat.js';
import { dungeons } from '../core/Monster.js';
import { GameState } from '../utils/GameState.js'; // Add this import

export class UI {
    constructor(player, shop) {
        this.player = player;
        this.shop = shop;
        
        // Create views
        this.statsView = new StatsView(player);
        this.inventoryView = new InventoryView(player);
        this.shopView = new ShopView(shop, player);
        this.combat = new Combat(player);
        this.combatView = new CombatView(this.combat);
        this.dungeonView = new DungeonView(player, dungeons, this.combat);
        
        // Set up UI callbacks
        player.setUiCallback({
            updateStats: () => {
                this.statsView.render();
            },
            updateInventory: () => {
                this.renderInventories();
            }
        });
        
        // Set combat view reference
        this.combat.setCombatView(this.combatView);
        
        // Initialize layout and tabs
        this.initializeLayout();
        this.setupTabs();
        this.switchTab('home'); // This should now properly show the inventory
    }

    renderInventories() {
        // Always try to render both inventories
        const inventoryContainer = document.getElementById('inventoryContainer');
        const shopContainer = document.getElementById('shopContainer');

        if (inventoryContainer) {
            this.inventoryView.render('inventoryContainer');
        }
        if (shopContainer && !shopContainer.style.display) {
            this.shopView.render('shopContainer');
        }
    }

    initializeLayout() {
        const statsContainer = document.getElementById('statsContainer');
        statsContainer.innerHTML = StatsView.createStaticElements();

        // Add save/clear buttons functionality
        const saveButton = document.getElementById('saveButton');
        const clearSaveButton = document.getElementById('clearSaveButton');

        saveButton.addEventListener('click', () => {
            if (GameState.saveGame(this.player)) {
                alert('Game saved successfully!');
            } else {
                alert('Failed to save game');
            }
        });

        clearSaveButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to start a new game? This will delete your current progress.')) {
                GameState.clearSave();
                location.reload();
            }
        });
    }

    setupTabs() {
        const tabs = document.querySelectorAll('nav button');
        tabs.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all tabs
                tabs.forEach(tab => tab.classList.remove('active'));
                // Add active class to clicked tab
                e.target.classList.add('active');
                
                const tabName = button.getAttribute('data-tab');
                this.switchTab(tabName);
            });
        });
    }

switchTab(tabName) {
    // Hide all tabs first
    document.querySelectorAll('.tab').forEach(tab => {
        tab.style.display = 'none';
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}Container`);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        
        // Render appropriate content
        switch(tabName) {
            case 'home':
                this.inventoryView.render('inventoryContainer');
                break;
            case 'dungeon':
                this.dungeonView.render('dungeonContainer');
                break;
            case 'shop':
                this.shopView.render('shopContainer');
                break;
        }
        
        // Always update stats
        this.statsView.render();
    }
}

    render(containerId) {
        // Update stats view
        this.statsView.render();
        
        // Update specific container
        const container = document.getElementById(containerId);
        if (!container) return;

        switch(containerId) {
            case 'inventoryContainer':
                this.inventoryView.render(containerId);
                break;
            case 'shopContainer':
                this.shopView.render(containerId);
                break;
            case 'dungeonContainer':
                this.dungeonView.render(containerId);
                break;
        }
    }

    // Combat related methods
    startCombat(monster) {
        this.combat.setMonster(monster);
        this.combatView.render('combatContainer');
    }

    showHitSplat(target, damage) {
        this.combatView.showHitSplat(target, damage);
    }

    showVictoryScreen(xp, drops) {
        this.combatView.showVictoryScreen(xp, drops);
        this.statsView.render(); // Update stats after combat
    }

    showDeathScreen() {
        this.combatView.showDeathScreen();
        this.statsView.render(); // Update stats after death
    }
}