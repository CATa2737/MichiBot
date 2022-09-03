const { Collection } = require("discord.js");
const mysql = require("mysql")
        var database = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "michibot"
})
module.exports = class {
        constructor({owner}) {
                this.owner = {
                        name: owner.name,
                        id: owner.id,
                        money: 0,
                        inventory: {
                                medicine: 0,
                                food: 0
                        }

                },
                this.cat = {
                        name: null,
                        age: 0,
                        state: {
                                love:   100,
                                fun:    100,
                                hunger: 100,
                                life:   100
                        },
                        emoji: null,
                        level: {
                                xp: 1,          //XP Actual
                                xpLimit: 0,     //XP límite para que cuando xp llegue al número, suba el now
                                now: 0          //Nivel actual
                        }
                }
        }
        async setName(name) {
                this.cat.name = name
                houses.set(this.owner.id, this)
                database.query(`INSERT INTO houses (\`owner_name\`, \`owner_id\`, \`cat_name\`) VALUES ('${this.owner.name}', '${this.owner.id}', '${this.cat.name}');`, (error, results, fields) => {
                        if(error) throw error;
                })
                return this
        }
}