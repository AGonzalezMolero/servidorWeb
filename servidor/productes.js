'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(1000) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255))'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Ordenador", "Ordenador Gaming", 500, "/web/imatges/pc.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Monitor", "Monitor Gaming", 190, "/web/imatges/monitor.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Teclado", "Teclado Gaming", 50, "/web/imatges/teclado.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Ratón", "Ratón Gaming", 17, "/web/imatges/raton.jpg")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge) VALUES ("Silla", "Silla Gaming", 150, "/web/imatges/silla.jpg")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
        // Demana la informació de productes
        try {
            sql = 'SELECT * FROM productes'
            taula = await db.promiseQuery(sql)
        } catch (e) {
            console.error(e)
            return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
        }   
    
        // Si hem aconseguit dades corectament, tornem la taula resultant
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }
}

// Export
module.exports = Obj

