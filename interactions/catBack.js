const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({ id: { $eq:  interaction.member.id } } );
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos && funciones/levelup");
    levelup.run(Client,interaction);
         
        if(!player) return interaction.message.channel.send(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).then(msj => setTimeout(() => {
            msj.delete().catch(e => {
              return;
            });
          },5000))
          .catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          });
          
          let { updateEmbed } = require("../commands")
          updateEmbed(interaction);
          await interaction.editReply("Editado!").catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          })
          interaction.deleteReply().catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          })
}