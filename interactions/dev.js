const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply().catch(e => {
    console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
 })

    try{

        let embd = new Discord.MessageEmbed()
            .setDescription("Hola!, estamos buscando un equipo de desarrollo para MichiBot para mejorar la calidad del bot en tanto bugs, diseño y etc...\n\n**REQUISITOS:**\n *- Debes tener aunque sea 14 años.*\n *- Debes haber sido parte del desarrollo de aunque sea 1 bot(Propio o De alguien mas)(no requiere pruebas)*\n\n **¿Deseas ser programador del bot?:**\n  *- Debes tener conocimientos en programación del lenguaje **JavaScript** relativamente buenos o utiles como para aportarle algo al bot*\n  *- OBVIAMENTE conocimientos sobre la API de discord relativamente al nivel del bot o superior*\n\n**¿Tienes habilidades en Dibujo o Diseño/Photoshop?:** \n *- También se busca gente para crear emojis decorativos para el bot, aqui puedes ignorar los requisitos de arriba del todo*\n\n**¿Crees poder aportar a otras cosas?**\n *- Realmente cualquier tipo de ayuda es útil y se le agradece, puedes aportar lo que quieras<$*")
            .setFooter({ text: "Pronto se recaudarán fondos con donaciones y patreon, el team recibirá el 65% de esos ingresos y se repartirá de forma equitativan", url: "https://media.discordapp.net/attachments/937798817976303617/1013588649713090620/789603667330072608.gif?width=103&height=87" })
            .setThumbnail("https://media.discordapp.net/attachments/937798817976303617/1013588281742610554/michibot.png?width=209&height=210")
            .setColor("ORANGE");

        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("¡Me interesa!")
                    .setStyle("LINK")
                    .setCustomId("https://discord.gg/EKCjk2JEXD")
            )
s
        await interaction.editReply({ embeds: [embd], components: [row] })

    } catch(e){
      console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}