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
        if (this.speler.wapen.naam !== 'Empty'){        wapenSprite.src = `../assets/afbeeldingen/${this.speler.wapen.sprite}`;
        
        wapenSprite.alt = this.speler.wapen.naam;}


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
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('winkel-item'); // Voeg de klasse 'winkel-item' toe

            const afbeelding = document.createElement('img');
            afbeelding.src = `../assets/afbeeldingen/${item.sprite}`;
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

        // Declareer gevechtInterval in de bredere scope van de functie
        let gevechtInterval = null;

        monsters.forEach((monster, index) => {
            const monsterContainer = document.createElement('div');
            monsterContainer.classList.add('monster-container');

            // Voeg de sprite toe
            const monsterSprite = document.createElement('div');
            monsterSprite.classList.add('sprite', monster.sprite); // Gebruik de sprite-naam
            monsterContainer.appendChild(monsterSprite);

            const monsterInfo = document.createElement('p');
            monsterInfo.textContent = `${monster.naam} - Health: ${monster.gezondheid}/${monster.maxGezondheid}`;

            const healthBarContainer = document.createElement('div');
            healthBarContainer.classList.add('health-bar-container');

            const healthBar = document.createElement('div');
            healthBar.classList.add('health-bar');
            const percentage = (monster.gezondheid / monster.maxGezondheid) * 100;
            healthBar.style.width = `${percentage}%`;

            healthBarContainer.appendChild(healthBar);

            const aanvalKnop = document.createElement('button');
            aanvalKnop.textContent = 'Attack';
            aanvalKnop.disabled = false; // Zorg ervoor dat de knop standaard niet uitgeschakeld is
            aanvalKnop.addEventListener('click', () => {
                if (!gevechtInterval) {
                    aanvalKnop.disabled = true; // Schakel de knop uit na de eerste klik
                    gevechtInterval = setInterval(() => {
                        this.speler.aanval(monster);
                        if (monster.isDood()) {
                            clearInterval(gevechtInterval);
                            gevechtInterval = null;
                            aanvalKnop.disabled = false; // Schakel de knop weer in voor een nieuw monster
                            this.speler.goud += monster.goudBeloning;
                            this.speler.xp += monster.xpBeloning;
                            console.log(`${monster.naam} is killed! Gold: ${this.speler.goud}, XP: ${this.speler.xp}`);
                            this.speler.checkLevelUp();
                            monster.respawn();
                        } else {
                            monster.doeSchade(this.speler);
                            if (this.speler.gezondheid <= 0) {
                                clearInterval(gevechtInterval); // Stop het gevecht als de speler dood is
                                gevechtInterval = null;
                                console.log('You have been defeated!');
                                this.speler.gaNaarHome(); // Stuur de speler naar Home
                            }
                        }
                        this.toonMonsters(monsters);
                        this.updateStatistieken();
                    }, 1200); // 1,2 seconden per aanval
                }
            });

            const vluchtenKnop = document.createElement('button');
            vluchtenKnop.textContent = 'Flee';
            vluchtenKnop.addEventListener('click', () => {
                if (gevechtInterval) {
                    clearInterval(gevechtInterval); // Stop het gevecht
                    gevechtInterval = null;
                }
                const thuisTab = document.getElementById('thuisTab');
                if (thuisTab) {
                    thuisTab.click(); // Simuleer een klik op de "Home"-tab
                }
            });

            monsterContainer.appendChild(monsterInfo);
            monsterContainer.appendChild(healthBarContainer);
            monsterContainer.appendChild(aanvalKnop);
            monsterContainer.appendChild(vluchtenKnop);
            monsterDiv.appendChild(monsterContainer);
        });

        // Stop het gevecht als je naar een andere tab gaat
        const tabs = document.querySelectorAll('nav button');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                if (gevechtInterval) {
                    clearInterval(gevechtInterval); // Stop het gevecht
                    gevechtInterval = null;
                }
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
            afbeelding.src = `../assets/afbeeldingen/${item.sprite}`;
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