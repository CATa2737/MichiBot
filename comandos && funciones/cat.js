const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("../schemas/cats");

const ms = require("ms");

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message, args) => {
	let filter = { id: { $eq:  message.member.id } };
        let mention = message.mentions.users.first();
        if(!mention) return message.channel.send(":x:Debes mencionar a alguien para ver su gatito/a");
        let player = await cats.findOne( { id: mention.id } );
        if(!player) return message.channel.send(":x:Ese usuario no tiene un gatito/a");

        let edadFilter = ms(Date.now() - player.cat.edad);
        edad = edadFilter.replace("d", " Días");
        edad = edad.replace("h", " Horas");
        edad = edad.replace("m", " Minutos");
        let estados = ["estoy en estado perfecto, yupiii!!","Me siento casi en estado perfecto","Me siento bien!","Me siento un poco mal","Estoy muy mal :C"];
          let estadoAnim;

          if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun > 399){
            estadoAnim = estados[0];
          }
          if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 400){
            estadoAnim = estados[1];
          }
          if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 350){
            estadoAnim = estados[2];
          }
          if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 250){
            estadoAnim = estados[3];
          }
          if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 150){
            estadoAnim = estados[4];
          } 
	const embd = new Discord.MessageEmbed()
	.setTitle(`${(!player.cat.bismarck) ? "miau" : "*bocina*"}, ${estadoAnim}`)
	.setDescription("**💸Dinero:**\n> `" + player.money + `\`\n \n˹${player.cat.emoji}˼ • **`+player.cat.name.toUpperCase()+"** •───╮")
	.addField(`✧ Edad:`,"> **"+edad+"**")
   	.addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
      	.addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
      	.addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
     	.addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
     	.addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
      	.setColor("#FDA4BA")
      	.setFooter({text: "Este es el michi de "+mention.tag});

	let msj = await message.channel.send({ embeds: [embd]})
	setTimeout(() => {
		msj.edit({components: []}).catch(e => throw e)
	},40000)
	}
}
