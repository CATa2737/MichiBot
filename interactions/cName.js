const Discord = require("discord.js");
const db = require("megadb");
 
const admin = new db.crearDB("admin");

module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
  })
 
    await interaction.editReply(`Dime el nuevo nombre para tu gatx ^w^`).catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
    admin.set(`${interaction.member.id}.await.name`,"cName");
}