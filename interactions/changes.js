const Discord = require("discord.js");
const db = require("megadb");
const pack = require("./package.json");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })

    try{
        let embd = new Discord.MessageEmbed()
            .setDescription(`**MICHIBOT v${pack.version} CHANGES:** \n\n\`\`\`- Se ha parcheado el bug de vida y estadisticas negativas\n- Nuevo sistema de actualizaciones y novedades\n- Se informa que se busca equipo de desarrollo para el bot "/dev"\`\`\``)
            .setFooter({ text: "Michibot by CATa" })
            .setThumbnail("https://media.discordapp.net/attachments/937798817976303617/1013588281742610554/michibot.png?width=209&height=210")
            .setColor("ORANGE");

        await interaction.editReply({ embeds: [embd]})
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}