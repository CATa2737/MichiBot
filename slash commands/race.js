const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");
const race = require("../interactions/race.js");
 
const shop = new db.crearDB("shop");

const memo = new db.memoDB("race");
const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("race")
    .setDescription("Haz una carrera con un michi random!"),
    async run(Client, interaction){
        
    let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});
    if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
        console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
      });
     await interaction.deferReply().catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
     })
         
        Client.levelupCheck(interaction);
    
        try{
            race.run(Client, interaction)
        } catch(e){
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
      }
    }
}