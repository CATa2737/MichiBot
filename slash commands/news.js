const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("news")
    .setDescription("Encuestas, anuncios y etc sobre el bot"),
    async run(Client, interaction){
        const embd = new Discord.MessageEmbed()
            .setAuthor({ name: "MICHIBOT NEWS | Se viene el \"Gran Reinicio\"", iconURL: "https://cdn.discordapp.com/avatars/813152173818904597/421fc860d06b8daaf52171acea5de9fb.png?size=2048"})
            .setDescription("*- Parece ser que se viene un cambio drástico, absolutamente todos los michis serán **Borrados**. Para salvarte de esto deberás pedir un backup de tu michi con el comando /backup, pero tendrán que tener paciencia hasta que falten 3 dias antes del **Gran Reinicio**.*")
            .addField(`**¿Por que se hace esto?**`,`*- Debido a un problema con nuestras bases de datos, algunos jugadores no se les actualiza la money o los michis no se actualizan correctamente.*\n\n<a:admiration_white:981331550568341554>[Soporte](https://discord.gg/EKCjk2JEXD)`)
            .setColor("ORANGE")
            .setFooter({iconURL: "https://cdn.discordapp.com/attachments/937798817976303617/970849962172768256/michibot.png", text: "MichiBot by CATa"});
        
        interaction.reply({ embeds: [embd] })
    }
}