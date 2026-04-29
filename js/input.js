/**
 * NIGHTMARE ENGINE - Input Handler Module
 * Felelős a billentyűzet események aszinkron kezeléséért.
 */
class InputHandler {
    constructor() {
        // A lenyomott gombok tárolása (gyorsabb, mint a tömb)
        this.keys = new Set();
        
        // Eseményfigyelők regisztrálása
        window.addEventListener('keydown', (e) => {
            const key = e.key.toUpperCase();
            this.keys.add(key);
            
            // Debug mód: konzolra írjuk a leütést, ha szükséges
            // console.log(`INPUT_SYSTEM: Key ${key} registered.`);
        });

        window.addEventListener('keyup', (e) => {
            const key = e.key.toUpperCase();
            this.keys.delete(key);
        });

        // Fókuszvesztés esetén ürítjük a gombokat (megakadályozza a beragadást)
        window.addEventListener('blur', () => {
            this.keys.clear();
        });
    }

    /**
     * Ellenőrzi, hogy egy adott gomb le van-e nyomva.
     * @param {string} keyCode 
     * @returns {boolean}
     */
    isPressed(keyCode) {
        return this.keys.has(keyCode.toUpperCase());
    }
}