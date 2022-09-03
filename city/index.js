const { Collection } = require("discord.js")
const city	= new Collection()
const time  = require("time-nodejs")
city.house	= require("./bin/house.js")
city.update = require("./bin/update.js")
city.store	= null // Próximamente... Nuestros gatos esclavos están pensando en como realizarlo

module.exports = city

let house = new city.house({owner: { name: "AguaDeCoco", id: "8192739187287" }})
.setName("Curucucho")