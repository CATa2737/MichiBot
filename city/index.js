const { Collection } = require("discord.js")
const time  = require("time-nodejs")
const city	= new Collection()
globalThis.houses = new Collection()
city.houses = houses
city.house	= require("./bin/house.js")
city.update = require("./bin/update.js")
city.store	= null // Próximamente... Nuestros gatos esclavos están pensando en como realizarlo

require("./bin/start.js")
setInterval(() => {
    city.update()
}, time.seconds(30))
    
module.exports = city