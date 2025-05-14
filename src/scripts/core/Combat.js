export class Combat {
    constructor(player) {
        this.player = player;
        this.monster = null;
        this.combatView = null;
        this.isActive = false;
        this.combatInterval = null;
        this.currentButton = null;
    }

    setCombatView(view) {
        this.combatView = view;
    }

    setMonster(monster) {
        this.monster = monster;
        this.monster.respawn(); // Reset monster health
    }

    // Combat flow methods
    startCombat(monster) {
        if (this.isActive) return;
        
        this.monster = monster;
        this.monster.respawn();
        this.isActive = true;
        
        if (this.combatView) {
            this.combatView.render('combatContainer');
            this.startAutoCombat();
        }
    }

    startAutoCombat() {
        if (this.combatInterval) return;
        
        this.isActive = true;
        this.combatInterval = setInterval(() => {
            if (!this.isActive) {
                this.stopCombat();
                return;
            }

            // Player attacks
            const playerDamage = this.calculatePlayerDamage();
            this.monster.takeDamage(playerDamage);
            
            if (this.combatView) {
                this.combatView.showHitSplat(this.monster, playerDamage);
                this.combatView.update();
            }

            // Check if monster died
            if (this.monster.isDead()) {
                this.handleVictory();
                this.stopCombat();
                return;
            }

            // Monster counter-attacks after a small delay
            setTimeout(() => {
                if (!this.isActive) return;
                
                const monsterDamage = this.monster.dealDamage();
                this.player.stats.health -= monsterDamage;
                
                if (this.combatView) {
                    this.combatView.showHitSplat(this.player, monsterDamage);
                    this.combatView.update();
                }

                // Check if player died
                if (this.player.stats.health <= 0) {
                    this.handlePlayerDeath();
                    this.stopCombat();
                    return;
                }
            }, 400);
        }, 800);
    }

    stopCombat() {
        if (this.combatInterval) {
            clearInterval(this.combatInterval);
            this.combatInterval = null;
        }
        this.isActive = false;
    }

    // Remove or modify endCombat as it's causing issues
    /*endCombat() {
        this.isActive = false;
        if (this.monster.isDead()) {
            this.handleVictory();
        }
    }*/

    // Attack methods
    playerAttack() {
        if (!this.isActive) return;

        // Player attacks monster
        const playerDamage = this.calculatePlayerDamage();
        this.monster.takeDamage(playerDamage);
        if (this.combatView) {
            this.combatView.showHitSplat(this.monster, playerDamage);
        }

        // Check if monster died
        if (this.monster.isDead()) {
            this.handleVictory();
            return;
        }

        // Monster counter-attacks
        this.monsterAttack();
    }

    monsterAttack() {
        const monsterDamage = this.monster.dealDamage();
        this.player.stats.health -= monsterDamage;
        if (this.combatView) {
            this.combatView.showHitSplat(this.player, monsterDamage);
        }

        if (this.player.stats.health <= 0) {
            this.handlePlayerDeath();
        }
    }

    calculatePlayerDamage() {
        const weaponDamage = this.player.equipment.weapon.damage || 1;
        const levelBonus = Math.floor(this.player.stats.level * 1.5);
        return Math.floor(Math.random() * (weaponDamage + levelBonus));
    }

    // Combat resolution methods
    handleVictory() {
        // Stop combat first
        this.stopCombat();
        
        // Calculate gold drop
        const goldDrop = this.monster.goldDrop;
        const currentGold = this.player.stats.gold;
        
        console.log('DEBUG: Combat Victory');
        console.log('Current gold:', currentGold);
        console.log('Gold drop:', goldDrop);
        
        // Add gold directly
        this.player.stats.gold = currentGold + goldDrop;
        
        console.log('New gold total:', this.player.stats.gold);

        // Add XP
        this.player.addXp(this.monster.xp);
        
        // Show victory screen
        if (this.combatView) {
            this.combatView.showVictoryScreen(this.monster.xp, [{
                item: { type: 'gold', name: 'Gold' },
                amount: goldDrop
            }]);
        }

        // Force UI update
        if (this.player.uiCallback) {
            this.player.uiCallback.updateStats();
        }
    }

    handlePlayerDeath() {
        // Stop combat first
        this.stopCombat();
        
        // Only apply gold penalty on death
        const currentGold = this.player.stats.gold;
        console.log('DEBUG: Player Death');
        console.log('Current gold:', currentGold);
        
        // Calculate and apply penalty
        const newGold = Math.floor(currentGold * 0.75);
        this.player.stats.gold = newGold;
        
        console.log('Gold after penalty:', this.player.stats.gold);
        
        this.player.stats.health = this.player.stats.maxHealth;
        
        if (this.combatView) {
            this.combatView.showDeathScreen();
        }

        // Force UI update
        if (this.player.uiCallback) {
            this.player.uiCallback.updateStats();
        }
    }

    handleDrops(drops) {
        drops.forEach(drop => {
            if (drop.item.type === 'gold') {
                this.player.stats.gold += drop.amount;
                console.log(`Added ${drop.amount} gold`); // Debug log
            } else {
                for (let i = 0; i < drop.amount; i++) {
                    this.player.addItemToInventory(drop.item.clone());
                }
            }
        });
    }

    // Combat status methods
    isPlayerAlive() {
        return this.player.stats.health > 0;
    }

    isMonsterAlive() {
        return this.monster.health > 0;
    }

    getCombatStatus() {
        return {
            playerHealth: this.player.stats.health,
            playerMaxHealth: this.player.stats.maxHealth,
            monsterHealth: this.monster.health,
            monsterMaxHealth: this.monster.maxHealth,
            isActive: this.isActive
        };
    }

    resetCombat() {
        // Reset monster health
        this.monster.health = this.monster.maxHealth;
        
        // Reset combat state
        this.isActive = true;
        
        // Reset player health if needed
        if (this.player.stats.health <= 0) {
            this.player.stats.health = this.player.stats.maxHealth;
        }
    }
}