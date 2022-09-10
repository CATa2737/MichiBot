const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne( { id: { $eq:  interaction.member.id } } );
 await interaction.deferReply().catch(e => {
    console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
 })
     
    Client.levelupCheck(interaction);
    player.claimDate = Date.now();
    await cats.findOneAndUpdate(filter,player)
    player.money = player.money+130;
    await cats.findOneAndUpdate(filter,player);
    await interaction.editReply(`Acabas de recibir tu bono!\n\n**+130 de 💸**`);
    Client.updateEmbed(interaction);
}