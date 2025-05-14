export class GameState {
    static saveKey = 'clickRPG_saveGame';

    static saveGame(player) {
        if (!player) return false;

        try {
            // Deep copy of all player data
            const gameData = {
                stats: {
                    name: player.stats.name || 'Hero',
                    health: player.stats.health || 100,
                    maxHealth: player.stats.maxHealth || 100,
                    gold: player.stats.gold || 0,
                    xp: player.stats.xp || 0,
                    level: player.stats.level || 1
                },
                equipment: {
                    weapon: player.equipment.weapon ? {
                        name: player.equipment.weapon.name,
                        damage: player.equipment.weapon.damage,
                        sprite: player.equipment.weapon.sprite,
                        isDefault: player.equipment.weapon.isDefault,
                        cost: player.equipment.weapon.cost
                    } : {
                        name: "Fists",
                        damage: 1,
                        sprite: "fist.png",
                        isDefault: true,
                        cost: 0
                    }
                },
                inventory: player.inventory ? player.inventory.map(item => ({
                    name: item.name,
                    damage: item.damage,
                    cost: item.cost,
                    sprite: item.sprite,
                    amount: item.amount || 1,
                    isEquipped: item.isEquipped || false
                })) : []
            };

            // Save with timestamp
            const saveData = {
                version: '1.0',
                timestamp: new Date().toISOString(),
                data: gameData
            };

            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('Game saved successfully:', saveData);
            return true;
        } catch (error) {
            console.error('Failed to save game:', error);
            return false;
        }
    }

    static loadGame() {
        try {
            const saved = localStorage.getItem(this.saveKey);
            if (!saved) {
                console.log('No saved game found');
                return null;
            }

            const parsed = JSON.parse(saved);
            console.log('Loaded save data:', parsed);
            
            // Handle old save format
            if (parsed.player || !parsed.data) {
                const oldData = parsed.player || parsed;
                return {
                    stats: oldData.stats || {},
                    equipment: {
                        weapon: oldData.equipment?.weapon || {
                            name: "Fists",
                            damage: 1,
                            sprite: "fist.png",
                            isDefault: true
                        }
                    },
                    inventory: Array.isArray(oldData.inventory) ? oldData.inventory : []
                };
            }

            // Return new format data
            return parsed.data;
        } catch (error) {
            console.error('Failed to load save:', error);
            return null;
        }
    }

    static clearSave() {
        try {
            localStorage.removeItem(this.saveKey);
            console.log('Save data cleared');
            return true;
        } catch (error) {
            console.error('Failed to clear save:', error);
            return false;
        }
    }
}