export class ShopView {
    constructor(shop, player) {
        this.shop = shop;
        this.player = player;
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="shop-container">
                <div class="shop-header">
                    <h2>Shop</h2>
                    <div class="player-gold">Gold: ${this.player.stats.gold}</div>
                </div>
                
                <!-- Shop Section -->
                <h3>Buy Items</h3>
                <div class="shop-content">
                    ${this.createItemTable()}
                </div>
                
                <!-- Inventory Section -->
                <h3>Your Items (Click to sell)</h3>
                <div class="inventory-section">
                    ${this.createInventoryGrid()}
                </div>
            </div>
        `;

        this.setupEventListeners();
    }

    createItemTable() {
        return `
            <table class="shop-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Damage</th>
                        <th>Cost</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.shop.items.map(item => `
                        <tr>
                            <td>
                                <div class="item-cell">
                                    <img src="./dist/afbeeldingen/${item.sprite}" alt="${item.name}">
                                    <span>${item.name}</span>
                                </div>
                            </td>
                            <td>${item.damage}</td>
                            <td>${item.cost}</td>
                            <td>
                                <button class="buy-button" data-item="${item.name}" 
                                    ${this.player.stats.gold < item.cost ? 'disabled' : ''}>
                                    Buy
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    createInventoryGrid() {
        return `
            <div class="inventory-grid">
                ${this.player.inventory.map((item, index) => `
                    <div class="inventory-item" data-index="${index}">
                        <div class="sprite-container">
                            <img src="./dist/afbeeldingen/${item.sprite}" alt="${item.name}">
                            ${item.amount > 1 ? `<span class="item-amount">${item.amount}</span>` : ''}
                        </div>
                        <div class="sell-price">${item.getSellPrice()} gold</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    setupEventListeners() {
        // Buy buttons
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemName = e.target.dataset.item;
                const item = this.shop.items.find(i => i.name === itemName);
                if (item && this.player.stats.gold >= item.cost) {
                    this.player.stats.gold -= item.cost;
                    this.player.addItemToInventory(item.clone());
                    this.updateGame();
                }
            });
        });

        // Sell items
        document.querySelectorAll('.inventory-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                const inventoryItem = this.player.inventory[index];
                if (inventoryItem) {
                    // Sell only one item from the stack
                    this.player.stats.gold += inventoryItem.getSellPrice();
                    
                    if (inventoryItem.amount > 1) {
                        inventoryItem.amount--;
                    } else {
                        this.player.inventory.splice(index, 1);
                    }
                    
                    this.updateGame();
                }
            });
        });
    }

    updateGame() {
        // Update the shop view
        this.render(document.querySelector('.tab:not([style*="none"])').id);
        
        // Update player stats
        if (this.shop.uiCallback) {
            this.shop.uiCallback.updateStats();
        }
    }
}