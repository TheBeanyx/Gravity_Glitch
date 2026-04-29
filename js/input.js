class InputHandler {
    constructor() {
        this.keys = {};
        
        window.addEventListener('keydown', (e) => {
            // Minden gombot kisbetűvé alakítunk a tárolásnál
            this.keys[e.key.toLowerCase()] = true;
            // A Space-t külön kezeljük, mert az nem betű
            if (e.key === " ") this.keys["space"] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
            if (e.key === " ") this.keys["space"] = false;
        });
    }

    isPressed(key) {
        // Ha " " (space) érkezik, nézzük a "space" kulcsot is
        if (key === " ") return this.keys["space"] || this.keys[" "];
        return this.keys[key.toLowerCase()] === true;
    }
}
