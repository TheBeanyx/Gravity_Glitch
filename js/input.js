class InputHandler {
    constructor() {
        // Ebben az objektumban tároljuk, melyik gomb van lenyomva
        this.keys = {};
        
        // Billentyű lenyomása
        window.addEventListener('keydown', (e) => {
            // Megakadályozzuk, hogy a Space vagy a nyilak görgessék az oldalt
            if (["Space", "ArrowUp", "ArrowDown", "KeyW", "KeyS"].includes(e.code)) {
                e.preventDefault();
            }
            this.keys[e.code] = true;
            // Konzolon ellenőrizheted, hogy mi a gomb kódja, ha nem működne
            // console.log("Lenyomva:", e.code); 
        });

        // Billentyű felengedése
        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    /**
     * Megnézi, hogy egy adott gomb le van-e nyomva.
     * Használat: input.isPressed('KeyW') vagy input.isPressed('Space')
     */
    isPressed(code) {
        return this.keys[code] === true;
    }
}
