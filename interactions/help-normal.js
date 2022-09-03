const Discord = require("discord.js");
const db = require("megadb");
 const fs = require("fs")

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    interaction.deferReply()
    let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});
    let cmdRoutes = fs.readdirSync("./comandos && funciones")

    try{
        let comandos = [];
        let normales  = {
            adopt: "Con este comando adoptas un gatito",
            cat: "Con este comando puedes ver el michi de alguien mas",
            rps: "Puedes iniciar una pelea de piedras, papel o tijeras con tu gatito ^^",
            help: "Con este comando mostrás este mensaje",
            shitpost: "Con este comando puedes ver memes \"asquerosos no recomendados\"",
            sleep: "Con este comando mandas a mimir a tu michi ^^"
        };
        for(let command of cmdRoutes) {
            console.log(command)
        }
        let cmds = normales;

        for(let comando in cmds){
            comandos.push(`**michi ${comando}** \n -*${cmds[comando]}*`)

            if(cmds[comando].toString().startsWith("function")) comandos.pop(`**michi ${comando}** \n -*${cmds[comando]}*`)
        }

        let mensaje = `**COMANDOS MICHIBOT**\n\n${comandos.join("\n")}`;
        
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