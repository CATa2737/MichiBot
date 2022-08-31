const Discord = require("discord.js");
const db = require("megadb");
 
const ms = require("ms");
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
  let filter = { id: { $eq:  interaction.member.id } };
  try{
let player = await cats.findOne({id: interaction.member.id});
if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
  console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
});
 await interaction.deferReply()
 
  if(!player) return await interaction.editReply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`)
 
  const levelup = require("../comandos/levelup");
  levelup.run(Client,interaction);
    const row = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setLabel("PAPEL")
    .setCustomId(interaction.member.id+"rps-paper")
    .setStyle("PRIMARY"))
  .addComponents(
    new Discord.MessageButton()
    .setLabel("PIEDRA")
    .setCustomId(interaction.member.id+"rps-rock")
    .setStyle("PRIMARY"))
  .addComponents(
    new Discord.MessageButton()
    .setLabel("TIJERA")
    .setCustomId(interaction.member.id+"rps-scizor")
    .setStyle("PRIMARY"))

    await interaction.editReply({content: `Elije tu movimiento...`, components: [row]});
    setTimeout(() => {
      interaction.deleteReply().catch(e => {
        return;
      });
    },40000)
  } catch(e){
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
    interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
}
}