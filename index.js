const Discord		= require("discord.js")
const db			= require("megadb")
const pack			= require("./package.json")
const fs			= require("fs")
const connection	= require("./connect")

globalThis.city	= require("./city/index.js")
globalThis.cyan = require("console-log-colors").color.cyanBright
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

globalThis.translate    = ({ ...languages }, interaction) => {
	const def = "es_ES" //Lenguaje por defecto
        if(!languages) throw new Error("Translate: No se ha introducido ningún lenguaje.")
        if(!languages[def]) throw new Error("Translate: No se ha introducido el lenguaje predefinido: Español (es)")
        let lang = interaction.preferedLanguage
        if(!languages[lang]) lang = def
        return languages[lang]
}	//Aún no es usable, no sean boludos

const Client = new Discord.Client({
	intents: 32767,
	ws: {
		properties: {
			$browser: "Discord Android"
		}
	},
	partials: [
		"MESSAGE",
		"USER",
		"CHANNEL",
		"GUILD_MEMBER"
	]
});

Client.news = 'ALERTA: Se viene un Gran Reinicio, mas info al /news';
Client.time = require("time-nodejs");
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
	console.log(`${cyan("[SLASH COMMANDS 2.0]")} ${file} Cargado`)
	Client.slashcommands.set(slash.data.name, slash)
}

globalThis.slashs = () => {
        let comandos = []
        let slashs = [];

	for(const file of slashcommands){
    	  const slash = require(`./slash commands/${file}`);
    	  slashs.push(slash.data.toJSON())

	}

    let cmds = slashs;
    for(let comando of cmds){
        comandos.push(`**/${comando.name}** \n - *${comando.description}*`)

    }

    let mensaje = `**COMANDOS MICHIBOT**\n\n${comandos.join("\n")}`;
	return mensaje;
}

globalThis.cmds = () => {

	let cmdRoutes = fs.readdirSync(`./comandos`).filter(f => f.endsWith(".js"));
    let comandos = [];
    let normales  = [];

    for(let comando of cmdRoutes) {
        let com = require(`./comandos/${comando}`);
	    normales.push( { name: comando.replace(".js",""), description: com.description });
    }

    let cmds = normales;

    for(let comando of cmds){
        comandos.push(`**michi ${comando.name}** \n- *${comando.description}*`)

    }

    let mensaje = `**COMANDOS MICHIBOT**\n\n${comandos.join("\n")}`;
	return mensaje;
}

connection.Connect()
require("./slashCommandsLoad.js");

require("./login.js")(Client) // Loguea.
