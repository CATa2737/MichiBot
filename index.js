const Discord		= require("discord.js")
const db			= require("megadb")
const pack			= require("./package.json")
const fs			= require("fs")
const connection	= require("./connect")
const city			= require("./city/index")

globalThis.random 	= (max_or_min, max) => {
	let min = max_or_min
	if (!max) {
		max = min
		min = 0
		//Si no existe max, min pasa a ser max. Soluciones de ingeniero gatuno :3
	}
	return Math.floor(Math.random() * ((max + 1) - min) + min)
	//Espero que nunca nadie pregunte por qué está ese +1 allí, pero por alguna razón, el código no funciona sin el
}
const New = `Se está buscando equipo de desarrollo/programadores de bots para MichiBot :3, mas info al /dev`

const Client = new Discord.Client({
	intents: 32767,
	ws: {
		properties: {
			$browser: "Discord Android"
		}
	}
})
Client.news = New;
const events = fs.readdirSync("./events").filter(f => f.endsWith(".js"))

for (const file of events) {
	let fileCode = require(`./events/${file}`)
	Client.on(file.replace(".js",""), async(...args) => {
		try {
			await fileCode.run(Client, ...args)
		} catch (error) {
			console.error(error)
		}
	})
}

Client.slashcommands = new Discord.Collection()
const slashcommands = fs.readdirSync("./slash commands").filter(file => file.endsWith(".js"))

for(const file of slashcommands){
	const slash = require(`./slash commands/${file}`)
	console.log(`[SLASH COMMANDS 2.0] ${file} Loaded`)
	Client.slashcommands.set(slash.data.name, slash)
}

connection.Connect()
Client.login("MTAxMzg1MTUxMTIzMjY2MzU4Mg.Gj9O7m.I31YQnszGL6svxRSCc6G6MNB5v1QJWi0l6hO6g")