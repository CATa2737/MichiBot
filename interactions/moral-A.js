const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});
    await interaction.deferReply().catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })

    interaction.editReply("*Has ganado ^^*\n\n**+10 de 💸**").catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      });
    player.money = player.money+10;
    await cats.findOneAndUpdate(filter,player);
    player.cat.love = player.cat.love-30;
    await cats.findOneAndUpdate(filter,player);

    interaction.message.edit({components: []}).catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
    interaction.channel.send(":( **Este se entristece**").catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
}