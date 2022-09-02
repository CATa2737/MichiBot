const db = require("megadb")
const cats = require("./schemas/cats")
const admin = new db.crearDB("admin")
const Discord = require("discord.js")
const bedroom = new db.crearDB("bedroom")

async function code(message, args, prefix) {
	async function reload(Client, message, args){
		if (message.author.id !== "308938789592498176") return message.channel.send("Bot Owner Only");
	
		if (!args || args.length < 1) return message.channel.send("dame un comando.");
		const commandName = args[1];
		const dirName = args[0];
		
		// Check if the command exists and is valid
		if (!Client.commands.has(commandName)) {
			return message.reply("ese comando no existe");
		}
	
		delete require.cache[require.resolve(process.cwd() + `/src/commands/${dirName}/${commandName}.js`)];
		
		Client.commands.delete(commandName);
		const props = require(process.cwd() + `/src/commands/${dirName}/${commandName}.js`);
		Client.commands.set(commandName, props);
		message.channel.send(`${commandName} ha sido recargado`);
	}

	if(!message.content.startsWith(prefix)) return
	if(message.member.id !== "706957433045516348") return
	try {
		let player = await cats.findOne({ id: { $eq:  message.member.id } })
		await eval(args.slice(0).join(" "))
	} catch (e) {
		let msj = await message.channel.send(e.toString())
		setTimeout(() => {
			msj.delete().catch(e => console.log(e))
		}, Client.time.seconds(10))
	}
  }

async function michiInit(message, prefix) {
	let filter = { id: { $eq:  message.member.id } }
	let player = await cats.findOne( { id: { $eq:  message.member.id } } )
	if(!message.content.startsWith(prefix)) return;
	if(player) return message.reply(`:x:Por ahora solo puedes tener un gatito, nuestra tecnología no es tan avanzada, en un futuro será -w-"`).catch(e => console.log(e));
	let date = Date.now()
	if(admin.has(`${message.member.id}.await`)) {
		await message.channel.send(":x:Oh, parece que ya estaba esperando tu respuesta anteriormente, deja cancelo...")
		await admin.delete(`${message.member.id}.await`)
		await cats.findOneAndDelete(filter)
	}
	const newCat = new cats({
		id: message.member.id,
		cat: {
			name: "Michi",
			emoji: ":cat:",
			edad: date,
			life: 100,
			fun: 100,
			love: 100,
			level: 1,
			xp: 0,
			xpLimit: 100
		},
		money: 0,
		inv: {},
		noSub: {},
		viewShit: false
	})
	await newCat.save()
	message.channel.send(`Hola!, soy MichiBot, dime como se llamará el gatito ^w^`)
	admin.set(message.member.id, { await: { name: "michiInit" } })
}

async function rps(message){
	const row = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setLabel("PAPEL")
		.setCustomId(message.member.id+"rps-paper")
		.setStyle("PRIMARY")
	)
	.addComponents(
		new Discord.MessageButton()
		.setLabel("PIEDRA")
		.setCustomId(message.member.id+"rps-rock")
		.setStyle("PRIMARY"))
	.addComponents(
		new Discord.MessageButton()
		.setLabel("TIJERA")
		.setCustomId(message.member.id+"rps-scizor")
		.setStyle("PRIMARY")
	)
	message.reply({
		content: `Elije tu movimiento...`,
		components: [row]
	})
	.catch(err => console.log(err))
}

async function updateEmbed(message){
	const ms = require("ms");
	const db = require("megadb");
	const shop = new db.crearDB("shop");
	let filter = { id: { $eq:  message.member.id } };
	let player = await cats.findOne( { id: { $eq:  message.member.id } } );
	let daily = player.inv["Claim Diario"];
	let date = Date.now();
	let claim = date - player.claimDate;
	let checkDay = (claim >= 86400000) ? false : true;
	const row = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("<:michi_game:970236556315070505>")
		.setCustomId(message.member.id+"games")
		.setStyle("PRIMARY")
	)
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("❤️")
		.setCustomId(message.member.id+"love")
		.setStyle("PRIMARY")
	)
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("🍱")
		.setCustomId(message.member.id+"food")
		.setStyle("PRIMARY")
	)
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("🛒")
		.setCustomId(message.member.id+"shop")
		.setStyle("PRIMARY")
	)
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("💊")
		.setCustomId(message.member.id+"cure")
		.setStyle("PRIMARY")
	)
	const row2 = new Discord.MessageActionRow()
	.addComponents(
		new Discord.MessageButton()
		.setEmoji("🐱")
		.setCustomId(message.member.id+"cat")
		.setStyle("SECONDARY")
	)

	if(daily) {
		row2.addComponents(
			new Discord.MessageButton()
			.setEmoji("💰")
			.setDisabled(checkDay)
			.setCustomId(message.member.id+"daily")
			.setStyle("SECONDARY")
		)
	}
	let edadFilter = ms(Date.now() - player.cat.edad);
	edad = edadFilter.replace("d", " Días");
	edad = edad.replace("h", " Horas");
	edad = edad.replace("m", " Minutos");
	let estados = ["estoy en estado perfecto, yupiii!!","Me siento casi en estado perfecto","Me siento bien!","Me siento un poco mal","Estoy muy mal :C"];
	let status = player.cat.life + player.cat.food + player.cat.love + player.cat.fun
	if(status > 399) var estadoAnim = estados[0]
	if(status < 400) var estadoAnim = estados[1]
	if(status < 350) var estadoAnim = estados[2]
	if(status < 250) var estadoAnim = estados[3]
	if(status < 150) var estadoAnim = estados[4]
	const embd = new Discord.MessageEmbed()
	.setTitle(`˹${player.cat.emoji}˼ • **${player.cat.name}** •───╮`)
	.setDescription(`**💸MONEY:**\n> \`${player.money}\`\n \n*- "${(!player.cat.bismarck) ? `${(!player.cat.bismarck) ? "miau" : "*bocina*"}u ${(!player.cat.bismarck) ? "miau" : "*bocina*"}` : `*sonidos de barco* `}(${estadoAnim})"*`)
	.addField(`✧ Edad:`,"> **"+edad+"**")
    .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
	.addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
	.addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
	.addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
	.addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
	.setColor("#FDA4BA")
	.setFooter({
		text: Client.news,
		iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"
	})
	message.message.edit({
		embeds: [embd],
		components: [row,row2]
	})
}

async function sleep(message) {
	let player = await cats.findOne({ id: { $eq:  message.member.id } })
	const inBedroom = await bedroom.get("sleeping");
	if(inBedroom.includes(player.cat.name)) {
		bedroom.extract("sleeping",player.cat.name)
		.then(() => {
			message.reply("**tu michi se despertó :D**")
		  })
		return
	}
	bedroom.push(`sleeping`,player.cat.name)
	.then(() => {
		message.reply("**tu michi se fue a mimir💤**")
	})
}

module.exports = {
	code,
	michiInit,
	rps,
	updateEmbed,
	sleep
}
