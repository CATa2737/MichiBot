const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("../schemas/cats");
const ms = require("ms");

module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message, args) => {
        let filter = { id: { $eq:  message.member.id } };
        const embd = new Discord.MessageEmbed()
            .setAuthor({ name: "MICHIBOT | Un bot mascota virtual muy versatil! :D", iconURL: "https://cdn.discordapp.com/avatars/813152173818904597/421fc860d06b8daaf52171acea5de9fb.png?size=2048"})
            .setDescription("**Michibot** es un bot de uso muy versatil tanto para users nuevos y users con experiencia en discord! :D\n\nAdopta un michi y cuida de el con estadísticas de diversión, salud, amor y comida, hay una tienda para comprarle cosas, unos minigames para que te diviertas, y muchas otras cosas mas! :D.\n*Para llamar a tu michi debes usar la palabra **mish, michi o ps ps***\n\n<a:admiration_white:981331550568341554>[Soporte](https://discord.gg/EKCjk2JEXD)")
            .setColor("ORANGE")
            .setFooter({iconURL: "https://cdn.discordapp.com/attachments/937798817976303617/970849962172768256/michibot.png", text: "MichiBot by CATa"});
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel("COMANDOS")
                    .setCustomId(message.member.id+"help-normal")
                    .setStyle("PRIMARY")
            )
            .addComponents(
                new Discord.MessageButton()
                .setLabel("(/) SLASHS COMMANDS")
                .setCustomId(message.member.id+"help-slashs")
                .setStyle("PRIMARY")
            );
        
        message.channel.send({embeds: [embd], components: [row]}).then(msj => {
            setTimeout(a => {
                msj.edit({ components: [] })
            },60000)
        });
    }
}