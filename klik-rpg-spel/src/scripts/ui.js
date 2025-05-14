import { BattleManager } from './battlemanager.js';

export class UI {
    constructor(speler, winkel) {
        this.speler = speler;
        this.winkel = winkel;
        this.battleManager = new BattleManager(speler);
    }

    installeerTabs() {
        const tabs = document.querySelectorAll('nav button');
        const inhoud = document.querySelectorAll('.tab');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                inhoud.forEach(i => i.classList.remove('actief'));
                inhoud[index].classList.add('actief');

                // Controleer welke tab actief is
                if (tab.id === 'thuisTab') {
                    // Toon heal-knop en inventory
                    document.getElementById('healButton').style.display = 'block';
                    document.getElementById('inventory').style.display = 'block';
                    this.toonInventory(); // Update de inventory
                } else {
                    // Verberg heal-knop en inventory
                    document.getElementById('healButton').style.display = 'none';
                    document.getElementById('inventory').style.display = 'none';
                }
            });
        });

        // Zorg ervoor dat de Home-tab standaard actief is bij het opstarten
        document.getElementById('thuisTab').click();
    }

    updateStatistieken() {
        document.getElementById('goudWeergave').textContent = `Gold: ${this.speler.goud}`;
        document.getElementById('levelWeergave').textContent = `Level: ${this.speler.level}`;

        // Update de wapenweergave
        const wapenWeergave = document.getElementById('wapenWeergave');
        const wapenSprite = document.getElementById('wapenSprite');
        wapenWeergave.textContent = `${this.speler.wapen.naam} (${this.speler.wapen.schade} Damage)`;
        if (this.speler.wapen.naam !== 'Empty') {
            wapenSprite.src = `afbeeldingen/${this.speler.wapen.sprite}`;
            wapenSprite.alt = this.speler.wapen.naam;
        }

        // Update de health bar
        const healthBar = document.getElementById('healthBar');
        const healthPercentage = (this.speler.gezondheid / this.speler.maxGezondheid) * 100;
        healthBar.style.width = `${healthPercentage}%`;
        document.getElementById('healthPercentage').textContent = `HP: ${Math.floor(healthPercentage)}% (${this.speler.gezondheid}/${this.speler.maxGezondheid})`;

        // Update de XP-balk
        const xpBar = document.getElementById('xpBar');
        const xpPercentage = this.speler.getXpPercentage();
        const xpNodig = this.speler.level * 50;
        xpBar.style.width = `${xpPercentage}%`;
        document.getElementById('xpPercentage').textContent = `XP: ${Math.floor(xpPercentage)}% (${this.speler.xp}/${xpNodig})`;
    }

    toonWinkel() {
        const winkelDiv = document.getElementById('winkelItems');
        winkelDiv.innerHTML = '';
        this.winkel.items.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('winkel-item'); // Voeg de klasse 'winkel-item' toe

            const afbeelding = document.createElement('img');
            afbeelding.src = `afbeeldingen/${item.sprite}`;
            afbeelding.alt = item.naam;

            const knop = document.createElement('button');
            knop.textContent = `${item.naam} - Cost: ${item.kosten} gold`;
            knop.addEventListener('click', () => this.winkel.koopItem(index));

            itemDiv.appendChild(afbeelding);
            itemDiv.appendChild(knop);
            winkelDiv.appendChild(itemDiv);
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

        monsters.forEach(monster => {
            const monsterContainer = document.createElement('div');
            monsterContainer.classList.add('monster-container');

            // Monster sprite
            const monsterSprite = document.createElement('img');
            monsterSprite.src = `afbeeldingen/${monster.sprite}.png`;
            monsterSprite.alt = monster.naam;
            if (monster.soort === 'normal') {
                monsterSprite.height = '60';
                monsterSprite.width = '50';
            } else if (monster.soort === 'boss') {
                monsterSprite.height = '100';
                monsterSprite.width = '100';
            }
            monsterContainer.appendChild(monsterSprite);

            // Monster info en health bar
            const monsterInfo = document.createElement('p');
            monsterInfo.textContent = monster.naam;
            monsterContainer.appendChild(monsterInfo);

            const healthBarContainer = document.createElement('div');
            healthBarContainer.classList.add('health-bar-container');
            const healthBar = document.createElement('div');
            healthBar.classList.add('health-bar');
            const percentage = (monster.gezondheid / monster.maxGezondheid) * 100;
            healthBar.style.width = `${percentage}%`;
            healthBarContainer.appendChild(healthBar);
            monsterContainer.appendChild(healthBarContainer);

            // Knoppen container
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');

            const aanvalKnop = document.createElement('button');
            aanvalKnop.textContent = 'Attack';
            aanvalKnop.addEventListener('click', () => {
                this.battleManager.startGevecht(
                    monster,
                    aanvalKnop,
                    () => {
                        this.updateStatistieken();
                        this.toonMonsters(monsters);
                    },
                    () => this.toonMonsters(monsters)
                );
            });

            const vluchtenKnop = document.createElement('button');
            vluchtenKnop.textContent = 'Flee';
            vluchtenKnop.addEventListener('click', () => {
                this.battleManager.stopGevecht();
                document.getElementById('thuisTab').click();
            });

            buttonContainer.appendChild(aanvalKnop);
            buttonContainer.appendChild(vluchtenKnop);
            monsterContainer.appendChild(buttonContainer);
            monsterDiv.appendChild(monsterContainer);
        });

        // Stop gevecht bij tab wissel
        document.querySelectorAll('nav button').forEach(tab => {
            tab.addEventListener('click', () => {
                this.battleManager.stopGevecht();
            });
        });
    }

    toonInventory() {
        const inventoryItems = document.getElementById('inventoryItems');
        inventoryItems.innerHTML = ''; // Leeg de lijst eerst
        this.speler.inventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('inventory-item'); // Voeg de klasse 'inventory-item' toe

            const afbeelding = document.createElement('img');
            afbeelding.src = `afbeeldingen/${item.sprite}`;
            afbeelding.alt = item.naam;
                        afbeelding.addEventListener('click', () => {
                this.speler.selecteerWapen(index);
                this.updateStatistieken();
            });

            const itemInfo = document.createElement('p');
            itemInfo.textContent = `${item.naam}`;

            const knop = document.createElement('button');
            knop.textContent = `Equip`;
            knop.addEventListener('click', () => {
                this.speler.selecteerWapen(index);
                this.updateStatistieken();
            });

            itemDiv.appendChild(afbeelding);
            //itemDiv.appendChild(knop);
            inventoryItems.appendChild(itemDiv);
            //itemDiv.appendChild(itemInfo);
        });
    }

    voegHealKnopToe() {
        const healButton = document.getElementById('healButton');
        healButton.addEventListener('click', () => {
            this.speler.genees();
            this.updateStatistieken();
        });
    }
}