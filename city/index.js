const { Collection } = require("discord.js")

const city	= new Collection()
city.houses	= new Collection()
city.house	= require("./bin/house.js")
city.store	= class {
	constructor() {
		this.items = new Collection()
	}
	setName()
}
module.exports = city
