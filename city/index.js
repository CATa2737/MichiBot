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
// Front

let house = new city.house({ owner: {
	name: "AguaDeCoco",
	id: "1234"
	}
})
.setName()
.setName("Curucucho")
console.log(house)

let item = new city.store()

//
console.log(city.houses.get("1234"))
