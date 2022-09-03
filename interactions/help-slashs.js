const Discord = require("discord.js");
const db = require("megadb");
const fs = require("fs");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    interaction.deferReply()
    let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});

    try{
        let comandos = [];
        let normales  = {
 adopt: "Con este comando adoptas un gatito",
 cat: "Con este comando puedes ver el michi de alguien mas",
 rps: "Puedes iniciar una pelea de piedras, papel o tijeras con tu gatito ^^",
 help: "Con este comando mostrás este mensaje",
 shitpost: "Con este comando puedes ver memes \"asquerosos no recomendados\""
        };

        let slashs = {
            chess: "Juega con tu michi al ajedrez moral!",
            inv: "Ves tu inventario!",
            rps: "Puedes iniciar una pelea de piedras, papel o tijeras con tu gatito ^^",
            rat: "Haz que tu gatito cazé unos ratones y con ello ganar dinero",
            shop: "Con este comando vas directo a la michi tienda",
            fish: "Ve a pescar junto a tu michi!",
            race: "Haz una carrera con un michi random!",
            roullette: "Juega a la MICHI-RULETA y prueba tu suerte! .w."
        };

        let cmds = slashs;

        for(let comando in cmds){
            comandos.push(`**/${comando}** \n -*${cmds[comando]}*`)

            if(cmds[comando].toString().startsWith("function")) comandos.pop(`**/${comando}** \n -*${cmds[comando]}*`)
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