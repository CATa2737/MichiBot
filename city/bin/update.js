const city = require("../index.js");
const mysql = require("mysql")
var database = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "michibot"
})
database.connect();

module.exports = async() => {
    houses.map(house => {
        let query1 = `UPDATE houses`;
        let query2 = `SET owner_name='${house.owner.name}',
owner_money='${house.owner.money}',
owner_inv_food='${house.owner.inventory.food}',
owner_inv_medicine='${house.owner.inventory.medicine}',
cat_name='${house.cat.name}',
cat_age='${house.cat.age}',
cat_state_love='${house.cat.state.love}',
cat_state_fun='${house.cat.state.fun}',
cat_state_hunger='${house.cat.state.hunger}',
cat_state_life='${house.cat.state.life}',
cat_emoji='${house.cat.emoji}',
cat_level_xp='${house.cat.level.xp}',
cat_level_xpLimit='${house.cat.level.xpLimit}',
cat_level_now='${house.cat.level.now}'
`;
        let query3 = `WHERE owner_id='${house.owner.id}'`;
        let query = `${query1} ${query2} ${query3}`;
        database.query(query, async (error, results, fields) => {
            if(error) throw error;
        });
    })
}
