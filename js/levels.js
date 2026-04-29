/**
 * NIGHTMARE ENGINE - Global Level Data Registry
 * Itt tároljuk a 10+ szektor térképét.
 * Jelmagyarázat: 0: Üres, 1: Fal, 2: Halálos csapda, 3: Cél (Exit), 4: Ellenség spawn
 */
const LEVEL_DATA = {
    1: [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,1,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1],
        [1,1,1,0,0,1,1,1,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ],
    2: [
        // Ide jön a 2. szint adatsora... (ezt másold le és bővítsd ki 10-ig)
    ],
    // ... folytasd a sort, amíg el nem éred a 10-et.
    10: {
        type: "BULLETHELL",
        bossName: "THE_ROOT_UID",
        map: [ /* ... óriási üres aréna ... */ ]
    }
};

/**
 * Szint betöltő segédfüggvény
 */
function getLevel(id) {
    if (LEVEL_DATA[id]) return LEVEL_DATA[id];
    console.error(`FATAL: Level ${id} not found in database.`);
    return LEVEL_DATA[1];
}