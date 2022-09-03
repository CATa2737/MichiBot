const city = require("../index.js")
const mysql = require("mysql")
var database = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "michibot"
})
database.connect();
database.query("SELECT * FROM houses", async(error, results, fields) => {
        for(let result of results) {
                houses.set(result.owner_id, {
                        owner: {
                                name: result.owner_name,
                                id: result.owner_id,
                                money: result.owner_money,
                                inventory: {
                                        medicine: result.owner_inv_medicine,
                                        food: result.owner_inv_food
                                }
                        },
                        cat: {
                                name: result.cat_name,
                                age: result.cat_age,
                                state: {
                                        love: result.cat_state_love,
                                        fun: result.cat_state_fun,
                                        hunger: result.cat_state_hunger,
                                        life: result.cat_state_life
                                },
                                emoji: result.cat_emoji,
                                level: {
                                        xp: result.cat_level_xp,
                                        xpLimit: result.cat_level_xpLimit,                                                now: result.cat_level_now
                                }
                        }
                })
        }
})