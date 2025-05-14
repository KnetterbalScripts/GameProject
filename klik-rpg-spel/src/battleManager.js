export class BattleManager {
    constructor(speler) {
        this.speler = speler;
        this.isInGevecht = false;
        this.gevechtInterval = null;
        this.huidigeKnop = null;
    }

    toonHitsplat(monsterContainer, schade) {
        const monsterSprite = monsterContainer.querySelector('img');
        if (!monsterSprite) return;

        // Maak nieuwe hitsplat element
        const hitsplat = document.createElement('div');
        hitsplat.classList.add('hitsplat');
        
        // Bepaal kleur op basis van schade
        const spriteType = schade > 0 ? 'red' : 'blue';
        
        // Zet de inhoud
        hitsplat.innerHTML = `
            <img src="afbeeldingen/hitsplat-${spriteType}.png" alt="hitsplat">
            <span>${Math.abs(schade)}</span>
        `;
        
        // Positionering relatief aan de monster sprite
        monsterSprite.style.position = 'relative';
        hitsplat.style.position = 'absolute';
        hitsplat.style.left = '50%';
        hitsplat.style.top = '50%';
        
        // Random positie
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = (Math.random() - 0.5) * 40;
        hitsplat.style.transform = `translate(-50%, -50%) translate(${randomX}px, ${randomY}px)`;
        
        // Voeg toe aan monster sprite
        monsterSprite.appendChild(hitsplat);
        
        // Verwijder na animatie
        setTimeout(() => hitsplat.remove(), 1000);
    }

    startGevecht(monster, aanvalKnop, updateUI, onMonsterDood) {
        if (this.isInGevecht) return;
        
        this.isInGevecht = true;
        this.huidigeKnop = aanvalKnop;
        this.huidigeKnop.disabled = true;

        const monsterContainer = aanvalKnop.closest('.monster-container');

        this.gevechtInterval = setInterval(() => {
            const schade = this.speler.aanval(monster);
            if (monsterContainer) {
                this.toonHitsplat(monsterContainer, schade);
            }

            if (monster.isDood()) {
                this.stopGevecht();
                this.speler.goud += monster.goudBeloning;
                this.speler.xp += monster.xpBeloning;
                this.speler.checkLevelUp();
                monster.respawn();
                onMonsterDood();
                updateUI();
                return;
            }

            const monsterSchade = monster.doeSchade(this.speler);
            if (this.speler.gezondheid <= 0) {
                this.stopGevecht();
                this.speler.gaNaarHome();
            }
            updateUI();
        }, 800);
    }

    stopGevecht() {
        if (this.gevechtInterval) {
            clearInterval(this.gevechtInterval);
            this.gevechtInterval = null;
            this.isInGevecht = false;
            if (this.huidigeKnop) {
                this.huidigeKnop.disabled = false;
                this.huidigeKnop = null;
            }
        }
    }
}