const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});
    await interaction.deferReply().catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
     
    Client.levelupCheck(interaction);

    if(player.cat.fun < 99) {
      player.cat.fun = player.cat.fun+6;
      await cats.findOneAndUpdate(filter,player);
    };
    if(player.cat.love < 99) {
    player.cat.love = player.cat.love+15;
    await cats.findOneAndUpdate(filter,player);
    };

    interaction.message.edit({components: []}).catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
      await interaction.editReply(`Miau :D`).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
      interaction.channel.send(`**+15 de ❤️**`)
}