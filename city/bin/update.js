const city = require("../index.js");
const mysql = require("mysql")
var database = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "michibot"
})

module.exports = () => {
    city.houses.map(house => {
        let query1= `UPDATE houses`
        let query2= `SET owner_name=${house.owner.name}, owner_id=${house.owner.id}`
        let query3= `ẀHERE owner_id=${house.owner.id}`
        let query = `${query1} ${query2} ${query3}`
        //Ignorá esta truchada, es mas facil leerlo, luego se actualiza
        //database.query()
    })
}