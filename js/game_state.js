/**
 * Advanced GameState Manager v2.1
 * Biztonsági szint: Obfuscated (Base64 + Salt)
 */
const GameState = {
    _SECRET_SALT: "NIGHTMARE_ENGINE_2026", // Ez a titkos kulcs a kódoláshoz

    // Mentés kódolással
    saveProgress(level) {
        const data = {
            level: level,
            timestamp: Date.now(),
            checksum: this._generateHash(level)
        };
        // Objektum -> Szöveg -> Base64 (hogy ne legyen olvasható)
        const encodedData = btoa(JSON.stringify(data));
        localStorage.setItem('sys_core_data', encodedData);
        console.log("%c SYSTEM: Data block encrypted and saved.", "color: #00d4ff");
    },

    // Betöltés és ellenőrzés
    getReachedLevel() {
        const raw = localStorage.getItem('sys_core_data');
        if (!raw) return 1;

        try {
            // Visszafejtés
            const decodedData = JSON.parse(atob(raw));
            
            // Ellenőrző összeg validálása (ha valaki belebabrált a számba, nem fog egyezni)
            if (decodedData.checksum !== this._generateHash(decodedData.level)) {
                console.error("CRITICAL: Data corruption detected. Resetting to safe mode.");
                return 1;
            }
            
            return decodedData.level;
        } catch (e) {
            return 1; // Hiba esetén (pl. hibás kód) alaphelyzet
        }
    },

    // Egyszerű "Hash" generáló (hogy ne lehessen csak úgy átírni)
    _generateHash(val) {
        return btoa(val + this._SECRET_SALT).substring(0, 8);
    },

    checkAccess(requestedLevel) {
        const reached = this.getReachedLevel();
        if (requestedLevel > reached) {
            // Itt ne alert legyen, hanem egy stílusos hibaüzenet vagy visszadobás
            location.href = 'index.html?error=access_denied';
            return false;
        }
        return true;
    }
};