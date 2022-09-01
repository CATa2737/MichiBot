const { Collection } = require("discord.js")

const city	= new Collection()
city.houses	= new Collection()

/*
city.house.set("72947183719371991", {
	owner: {
		id: "728819381003",
		name: "AguaDeCoco",
		cat: {
			name: "León",
			say: (text) => {},
			state: {
				love: {
					get: () => {},
					add: () => {},
					remove:()=>{}
				},
			}
		}
	},
})
*/
// Back

city.house = class {
	constructor({owner}) {
		this.owner = {
			id: owner
		},
		this.cat = {
			name: null,
			state: {
				love:	100,
				fun:	100,
				hunger:	100,
				life:	100
			}
		}
	}
	setName(name) {
		this.cat.name = name
		city.houses.set(this.owner.id, this)
		return this
	}
}
// Front

let house = new city.house({ owner: "1234" })
.setName("Curucucho")
console.log(house)
//
console.log(city.houses.get("1234"))
