export class StatsView {
    constructor(player) {
        this.player = player;
    }

    render() {
        this.updateStats();
        this.updateHealthBar();
        this.updateXpBar();
    }

    updateStats() {
        // Update gold display
        const goldDisplay = document.getElementById('goldDisplay');
        goldDisplay.textContent = `Gold: ${this.player.stats.gold}`;

        // Update level display
        const levelDisplay = document.getElementById('levelDisplay');
        levelDisplay.textContent = `Level: ${this.player.stats.level}`;

        // Update weapon display
        const weaponDisplay = document.getElementById('weaponDisplay');
        const weaponSprite = document.getElementById('weaponSprite');
        weaponDisplay.textContent = `${this.player.equipment.weapon.name} (${this.player.equipment.weapon.damage} Damage)`;
        
        if (this.player.equipment.weapon.sprite) {
            weaponSprite.src = `./dist/afbeeldingen/${this.player.equipment.weapon.sprite}`;
            weaponSprite.width = 50;
            weaponSprite.height = 50;
            weaponSprite.alt = this.player.equipment.weapon.name;
        }
    }

    updateHealthBar() {
        const healthBar = document.getElementById('healthBar');
        const healthPercentage = (this.player.stats.health / this.player.stats.maxHealth) * 100;
        healthBar.style.width = `${healthPercentage}%`;

        // Update health text
        const healthText = document.getElementById('healthPercentage');
        healthText.textContent = `${Math.floor(healthPercentage)}% (${this.player.stats.health}/${this.player.stats.maxHealth})`;
    }

    updateXpBar() {
        const xpBar = document.getElementById('xpBar');
        const xpPercentage = this.player.getXpPercentage();
        xpBar.style.width = `${xpPercentage}%`;

        // Update XP text
        const xpText = document.getElementById('xpPercentage');
        const xpNeeded = this.player.stats.level * 50;
        xpText.textContent = `${Math.floor(xpPercentage)}% (${this.player.stats.xp}/${xpNeeded} XP)`;
    }

    static createStaticElements() {
        return `
            <div class="stats-header">
                <span id="goldDisplay"></span>
                <span id="levelDisplay"></span>
                <div class="stats-buttons">
                    <button id="saveButton" class="game-button">Save Game</button>
                    <button id="clearSaveButton" class="game-button warning">New Game</button>
                </div>
            </div>
            <div id="statsContainer">
                <div class="stats-header">
                    <div id="goldDisplay"></div>
                    <div id="levelDisplay"></div>
                </div>
                
                <div id="weaponContainer">
                    <div id="weaponDisplay"></div>
                    <img id="weaponSprite" alt="weapon">
                </div>
                
                <div class="bar-container">
                    <label>Health:</label>
                    <div id="healthBarContainer" class="progress-bar">
                        <div id="healthBar" class="progress-fill health"></div>
                        <span id="healthPercentage" class="progress-text"></span>
                    </div>
                </div>
                
                <div class="bar-container">
                    <label>Experience:</label>
                    <div id="xpBarContainer" class="progress-bar">
                        <div id="xpBar" class="progress-fill xp"></div>
                        <span id="xpPercentage" class="progress-text"></span>
                    </div>
                </div>
            </div>
        `;
    }
}