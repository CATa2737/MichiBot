const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({cat:{id: interaction.member.id}});
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
  })
 
     
    const row2 = new Discord.MessageActionRow()
    .addComponents(
      new Discord.MessageButton()
      .setEmoji("<:tb_left:968330846413156402>")
      .setCustomId(interaction.member.id+"catBack")
      .setStyle("PRIMARY")
    );

    const embd = new Discord.MessageEmbed()
        .setTitle(`OPCIONES`)
        .setDescription(`:cat:¿Que deseas hacer?:cat:`)
        .setColor("#FDA4BA");
    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel("CAMBIAR NOMBRE")
            .setCustomId(interaction.member.id+"cName")
            .setStyle("SECONDARY")
        )
        .addComponents(
            new Discord.MessageButton()
            .setLabel("VER INVENTARIO")
            .setCustomId(interaction.member.id+"inv")
            .setStyle("SECONDARY")
        )
    interaction.message.edit({components: [row,row2], embeds: [embd]})
    await interaction.editReply("Espere....").catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
    interaction.deleteReply().catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
}