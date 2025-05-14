export class DungeonView {
    constructor(player, dungeons, combat) {
        this.player = player;
        this.dungeons = dungeons;
        this.combat = combat;
        this.selectedDungeon = dungeons[0]; // Default to first dungeon
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = this.createDungeonHTML();
        this.setupEventListeners();
    }

    createDungeonHTML() {
        return `
            <div class="dungeon-content">
                <div class="dungeon-header">
                    <h2>Select Dungeon:</h2>
                    <select id="dungeonSelect">
                        ${this.dungeons.map((dungeon, index) => `
                            <option value="${index}" ${dungeon.name === this.selectedDungeon.name ? 'selected' : ''}>
                                ${dungeon.name}
                            </option>
                        `).join('')}
                    </select>
                </div>
                
                <div class="monster-list">
                    ${this.selectedDungeon.monsters.map(monster => `
                        <div class="monster-container ${monster.type === 'boss' ? 'boss' : ''}">
                            <img src="./dist/afbeeldingen/${monster.sprite}.png" alt="${monster.name}">
                            <div class="monster-info">
                                <h3>${monster.name}</h3>
                                <p>Level ${Math.floor(monster.health/10)}</p>
                                <p>Health: ${monster.health}</p>
                                <p>Damage: ${monster.damage}</p>
                                <p>Rewards: ${monster.goldDrop} gold, ${monster.xp} XP</p>
                            </div>
                            <button class="fight-button" data-monster="${monster.name}">Fight!</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // Dungeon selection
        const dungeonSelect = document.getElementById('dungeonSelect');
        if (dungeonSelect) {
            dungeonSelect.addEventListener('change', (e) => {
                const selectedIndex = parseInt(e.target.value);
                this.selectedDungeon = this.dungeons[selectedIndex];
                this.render('dungeonContainer');
            });
        }

        // Fight buttons
        const fightButtons = document.querySelectorAll('.fight-button');
        fightButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const monsterName = e.target.dataset.monster;
                const monster = this.selectedDungeon.monsters.find(m => m.name === monsterName);
                if (monster) {
                    this.combat.startCombat(monster);
                }
            });
        });
    }
}