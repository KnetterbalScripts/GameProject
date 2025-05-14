export class InventoryView {
    constructor(player) {
        this.player = player;
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = `
            <div class="inventory-grid">
                ${this.createInventoryItems()}
            </div>
        `;

        this.setupEventListeners();
    }

    createInventoryItems() {
        return this.player.inventory.map((item, index) => `
            <div class="inventory-item" data-index="${index}">
                <div class="sprite-container">
                    ${item.sprite ? `
                        <img src="./dist/afbeeldingen/${item.sprite}" alt="${item.name}">
                        ${item.amount > 1 ? `
                            <span class="item-amount">${item.amount}</span>
                        ` : ''}
                    ` : ''}
                </div>
                <span class="item-name">${item.name}</span>
            </div>
        `).join('');
    }

    setupEventListeners() {
        const items = document.querySelectorAll('.inventory-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = e.currentTarget.dataset.index;
                this.handleItemClick(index);
            });
        });
    }

    handleItemClick(index) {
        const item = this.player.inventory[index];
        if (item && item.damage) { // If item has damage, it's a weapon
            // Create a new item object instead of using clone
            const itemToEquip = {
                name: item.name,
                damage: item.damage,
                cost: item.cost,
                sprite: item.sprite,
                amount: 1
            };
            
            // Store current equipped weapon before equipping new one
            const oldWeapon = this.player.equipment.weapon;
            
            // Remove one item from stack or whole stack if amount is 1
            if (item.amount > 1) {
                item.amount--;
            } else {
                this.player.inventory.splice(index, 1);
            }
            
            // Equip new weapon
            this.player.equipWeapon(itemToEquip);
            
            // Only add old weapon to inventory if it's not the default fists
            if (oldWeapon && !oldWeapon.isDefault) {
                this.player.addItemToInventory(oldWeapon);
            }
            
            // Force update both inventories and stats
            this.player.updateUI();
        }
    }
}