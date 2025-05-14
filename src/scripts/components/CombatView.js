export class CombatView {
    constructor(combat) {
        this.combat = combat;
    }

    render(containerId) {
        // Save the original content to restore later
        this.originalContent = document.body.innerHTML;
        
        // Create combat overlay
        const overlay = document.createElement('div');
        overlay.id = 'combatOverlay';
        overlay.innerHTML = this.createCombatLayout();
        document.body.appendChild(overlay);
        
        this.setupEventListeners();
        this.update();
    }

    createCombatLayout() {
        return `
            <div class="combat-fullscreen">
                <div class="combat-header">
                    
                    <button id="fleeButton" class="flee-button">
                        <img src="./dist/afbeeldingen/flee-icon.png" alt="Flee">
                    </button>
                </div>
                
                <div class="combat-scene">
                    <div class="player-section">
                        <div class="character-container">
                            <img src="./dist/afbeeldingen/player.png" class="player-sprite">
                            <div id="playerHealthBar" class="health-bar-container">
                                <div class="health-bar"></div>
                                <span class="health-percentage"></span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="battle-indicator">VS</div>
                    
                    <div class="monster-section">
                        <div class="character-container">
                            <img id="monsterSprite" src="" alt="Monster" class="monster-sprite">
                            <div id="monsterHealthBar" class="health-bar-container">
                                <div class="health-bar"></div>
                                <span class="health-percentage"></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="combat-controls">
                    <button id="attackButton" class="attack-button">Attack!</button>
                </div>
                
                <div id="combatLog" class="combat-log"></div>
            </div>
        `;
    }

    exitCombat() {
        const overlay = document.getElementById('combatOverlay');
        if (overlay) {
            overlay.classList.add('fade-out');
            setTimeout(() => {
                overlay.remove();
                this.combat.stopCombat();
            }, 500);
        }
    }

    setupEventListeners() {
        document.getElementById('attackButton').addEventListener('click', () => {
            const status = this.combat.getCombatStatus();
            
            // Only allow attack when combat is not active
            if (!status.isActive) {
                // Reset combat state and start new round
                this.combat.resetCombat();
                this.combat.startAutoCombat();
                
                // Clear combat log
                const log = document.getElementById('combatLog');
                if (log) log.innerHTML = '';
                
                // Update UI
                this.update();
            }
        });

        document.getElementById('fleeButton').addEventListener('click', () => {
            // Just stop combat and exit, no penalties
            this.combat.stopCombat();
            this.exitCombat();
            this.combat.player.goHome();
        });
    }

    update() {
        const status = this.combat.getCombatStatus();
        this.updateHealthBars(status);
        this.updateSprites();
        this.updateButtons(status);
    }

    updateHealthBars(status) {
        // Update player health
        const playerBar = document.querySelector('#playerHealthBar .health-bar');
        const playerText = document.querySelector('#playerHealthBar .health-percentage');
        const playerPercentage = (status.playerHealth / status.playerMaxHealth) * 100;
        
        playerBar.style.width = `${playerPercentage}%`;
        playerText.textContent = `${status.playerHealth}/${status.playerMaxHealth}`;

        // Update monster health
        const monsterBar = document.querySelector('#monsterHealthBar .health-bar');
        const monsterText = document.querySelector('#monsterHealthBar .health-percentage');
        const monsterPercentage = (status.monsterHealth / status.monsterMaxHealth) * 100;
        
        monsterBar.style.width = `${monsterPercentage}%`;
        monsterText.textContent = `${status.monsterHealth}/${status.monsterMaxHealth}`;
    }

    updateSprites() {
        const monsterSprite = document.getElementById('monsterSprite');
        monsterSprite.src = `./dist/afbeeldingen/${this.combat.monster.sprite}.png`;
        monsterSprite.width = 50;
        monsterSprite.height = 50;  
        monsterSprite.alt = this.combat.monster.name;
    }

    updateButtons(status) {
        const attackButton = document.getElementById('attackButton');
        const fleeButton = document.getElementById('fleeButton');

        // Disable attack button during active combat
        attackButton.disabled = status.isActive;
        // Enable flee button during active combat
        fleeButton.disabled = !status.isActive;
    }

    showHitSplat(target, damage) {
        const section = target === this.combat.player ? 'player-section' : 'monster-section';
        const container = document.querySelector(`.${section}`);
        if (!container) return;

        const hitSplat = document.createElement('div');
        hitSplat.classList.add('hit-splat');
        
        // Determine color based on damage
        const spriteType = damage > 0 ? 'red' : 'blue';
        
        hitSplat.innerHTML = `
            <img src="./dist/afbeeldingen/hitsplat-${spriteType}.png" alt="hitsplat">
            <span>${Math.abs(damage)}</span>
        `;
        
        // Random position
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        hitSplat.style.transform = `translate(-50%, -50%) translate(${randomX}px, ${randomY}px)`;
        
        container.appendChild(hitSplat);
        setTimeout(() => hitSplat.remove(), 1000);
    }

    showVictoryScreen(xp, drops) {
        const log = document.getElementById('combatLog');
        if (!log) return;

        log.innerHTML = `
            <div class="victory-message">
                <h3>Victory!</h3>
                <p>You gained ${xp} XP</p>
                ${this.createDropsList(drops)}
                <p>Click Attack to fight again or Flee to return!</p>
            </div>
        `;

        // Enable attack button for new combat
        const attackButton = document.getElementById('attackButton');
        if (attackButton) attackButton.disabled = false;
    }

    createDropsList(drops) {
        // Make sure drops is always an array
        if (!drops || !Array.isArray(drops)) {
            return '';
        }

        return `
            <div class="drops-list">
                <h4>Drops:</h4>
                <ul>
                    ${drops.map(drop => `
                        <li>${drop.amount}x ${drop.item.name}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    showDeathScreen() {
        const log = document.getElementById('combatLog');
        if (!log) return;

        log.innerHTML = `
            <div class="death-message">
                <h3>You Died!</h3>
                <p>You lost 25% of your gold and returned home.</p>
                <p>Click Attack to try again or Flee to return!</p>
            </div>
        `;

        // Enable attack button for new combat
        const attackButton = document.getElementById('attackButton');
        if (attackButton) attackButton.disabled = false;
    }
}