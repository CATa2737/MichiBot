const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    interaction.deferReply()
    let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});

    try{
	let mensaje = slashs();
        let embd = new Discord.MessageEmbed()
            .setAuthor({ name: "MICHIBOT | Un bot mascota virtual muy versatil! :D", iconURL: "https://cdn.discordapp.com/avatars/813152173818904597/421fc860d06b8daaf52171acea5de9fb.png?size=2048"})
            .setColor("ORANGE")
            .setFooter({iconURL: "https://cdn.discordapp.com/attachments/937798817976303617/970849962172768256/michibot.png", text: "MichiBot by CATa"})
            .setDescription(`${mensaje}\n\n<a:admiration_white:981331550568341554>[Soporte](https://discord.gg/EKCjk2JEXD)`);

        interaction.message.edit( { embeds: [embd] } );
        interaction.deleteReply();
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}