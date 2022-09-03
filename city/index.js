const { Collection } = require("discord.js")

const city	= new Collection()
city.house	= require("./bin/house.js")
city.store	= null // Próximamente... Nuestros gatos esclavos están pensando en como realizarlo

module.exports = city

