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
        let query = "..."
        database.query()
    })
}