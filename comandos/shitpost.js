const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("../schemas/cats");
 

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message, args) => {
let filter = { id: { $eq:  message.member.id } };
        const levelup = require("../comandos/levelup");
        levelup.run(Client,message);
        const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("OTRO")
            .setCustomId(message.member.id+"shitpost")
            .setStyle("PRIMARY")
        );
        let random = Math.floor(Math.random() * 3);
        let msj = await message.reply({content: Shitpost.allShitpost(), components: [row]})
	setTimeout(() => {
        	msj.edit({components: []})
		.catch(e => throw e)
        }, 0.5 /*<— Minutes */ * 60 * 10000))
        .catch(e => {
            console.log(`${e.toString()} En ${message.channel.name} de ${message.guild.name}`)
	});
        let player = await cats.findOne( { id: { $eq:  message.member.id } } );
        let viewShit = player.viewShit;
        if(player.cat.fun < 100) {
            player.cat.fun++
            await cats.findOneAndUpdate(filter,player);
        }

        if(!viewShit) {
            message.channel.send("Aqui tienes +5 💸 por ser tu primera vez. \n \n`Advertencia: Aqui vas a ver memes de \"muy mal gusto\" que podrán contener lenguaje no apropiado y discriminación, al seguir usando este comando aceptas los terminos.`");
            player.money = player.money+5;
            player.viewShit = true;
            await cats.findOneAndUpdate(filter,player);
        }
        if(random === 2){
            player.money++
            await cats.findOneAndUpdate(filter,player);
            message.channel.send("**Tienes +1 de 💸**")
        }
    }
}
