const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("../schemas/cats");
 
module.exports = {
    name: "shitpost",
    description: "Con este comando verás memes \"asquerosos y no recomendados\"",
    run: async (Client, message, args) => {
let filter = { id: { $eq:  message.member.id } };
         
        Client.levelupCheck(message)
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
		.catch(e => console.log(e.toString()));
        }, 0.5 /*<— Minutes */ * 60 * 10000)
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
