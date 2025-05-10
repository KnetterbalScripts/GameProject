export class UI {
    constructor(speler, winkel) {
        this.speler = speler;
        this.winkel = winkel;
    }

    installeerTabs() {
        const tabs = document.querySelectorAll('nav button');
        const inhoud = document.querySelectorAll('.tab');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                inhoud.forEach(i => i.classList.remove('actief'));
                inhoud[index].classList.add('actief');
            });
        });
    }

    updateStatistieken() {
        document.getElementById('goudWeergave').textContent = `Goud: ${this.speler.goud}`;
        document.getElementById('gezondheidWeergave').textContent = `Gezondheid: ${this.speler.gezondheid}/${this.speler.maxGezondheid}`;
        document.getElementById('xpWeergave').textContent = `XP: ${this.speler.xp}`;
        document.getElementById('levelWeergave').textContent = `Level: ${this.speler.level}`;
        document.getElementById('wapenWeergave').textContent = `Wapen: ${this.speler.wapen.naam} (Schade: ${this.speler.wapen.schade})`;

        // Update de health bar
        const healthBar = document.getElementById('healthBar');
        const healthPercentage = (this.speler.gezondheid / this.speler.maxGezondheid) * 100;
        healthBar.style.width = `${healthPercentage}%`;
        document.getElementById('healthPercentage').textContent = `${Math.floor(healthPercentage)}%`;

        // Update de XP-balk
        const xpBar = document.getElementById('xpBar');
        const xpPercentage = this.speler.getXpPercentage();
        xpBar.style.width = `${xpPercentage}%`;
        document.getElementById('xpPercentage').textContent = `${Math.floor(xpPercentage)}%`;
    }

    toonWinkel() {
        const winkelDiv = document.getElementById('winkelItems');
        winkelDiv.innerHTML = '';
        this.winkel.items.forEach((item, index) => {
            const knop = document.createElement('button');
            knop.textContent = `${item.naam} - Kosten: ${item.kosten} goud`;
            knop.addEventListener('click', () => this.winkel.koopItem(index));
            winkelDiv.appendChild(knop);
        });
    }

    toonKerkers(kerkers) {
        const kerkerSelect = document.getElementById('kerkerSelect');
        kerkerSelect.innerHTML = '';
        Object.keys(kerkers).forEach(kerkerNaam => {
            const optie = document.createElement('option');
            optie.value = kerkerNaam;
            optie.textContent = kerkerNaam;
            kerkerSelect.appendChild(optie);
        });

        kerkerSelect.addEventListener('change', () => {
            const geselecteerdeKerker = kerkerSelect.value;
            this.toonMonsters(kerkers[geselecteerdeKerker]);
        });
    }

    toonMonsters(monsters) {
        const monsterDiv = document.getElementById('monsterLijst');
        monsterDiv.innerHTML = '';
        monsters.forEach((monster, index) => {
            const monsterContainer = document.createElement('div');
            monsterContainer.classList.add('monster-container');

            // Voeg de sprite toe
            const monsterSprite = document.createElement('div');
            monsterSprite.classList.add('sprite', monster.sprite); // Gebruik de sprite-naam
            monsterContainer.appendChild(monsterSprite);

            const monsterInfo = document.createElement('p');
            monsterInfo.textContent = `${monster.naam} - Gezondheid: ${monster.gezondheid}/${monster.maxGezondheid}`;

            const healthBarContainer = document.createElement('div');
            healthBarContainer.classList.add('health-bar-container');

            const healthBar = document.createElement('div');
            healthBar.classList.add('health-bar');
            const percentage = (monster.gezondheid / monster.maxGezondheid) * 100;
            healthBar.style.width = `${percentage}%`;

            healthBarContainer.appendChild(healthBar);

            const aanvalKnop = document.createElement('button');
            aanvalKnop.textContent = 'Aanvallen';
            aanvalKnop.addEventListener('click', () => {
                this.speler.aanval(monster);
                if (monster.isDood()) {
                    this.speler.goud += monster.goudBeloning;
                    this.speler.xp += monster.xpBeloning;
                    console.log(`${monster.naam} is verslagen! Goud: ${this.speler.goud}, XP: ${this.speler.xp}`);
                    this.speler.checkLevelUp();
                    monster.respawn();
                } else {
                    monster.doeSchade(this.speler);
                }
                this.toonMonsters(monsters);
                this.updateStatistieken();
            });

            monsterContainer.appendChild(monsterInfo);
            monsterContainer.appendChild(healthBarContainer);
            monsterContainer.appendChild(aanvalKnop);
            monsterDiv.appendChild(monsterContainer);
        });
    }

    toonInventory() {
        const inventoryDiv = document.getElementById('inventory');
        inventoryDiv.innerHTML = '';
        this.speler.inventory.forEach((item, index) => {
            const knop = document.createElement('button');
            knop.textContent = `${item.naam} (Schade: ${item.schade})`;
            knop.addEventListener('click', () => {
                this.speler.selecteerWapen(index);
                this.updateStatistieken();
            });
            inventoryDiv.appendChild(knop);
        });
    }
}