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

    try{

    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}