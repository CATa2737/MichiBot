const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("chess")
    .setDescription("Juega con tu michi al ajedrez moral!"),
    async run(Client, interaction){
        let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne( { id: { $eq:  interaction.member.id } } );
    if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
        console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
      });
      await interaction.deferReply()

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageButton()
            .setLabel(interaction.user.username.toUpperCase())
            .setStyle("DANGER")
            .setCustomId(`${interaction.member.id}moral-A`)
        )
        .addComponents(
            new Discord.MessageButton()
            .setLabel(player.cat.name.toUpperCase())
            .setStyle("PRIMARY")
            .setCustomId(`${interaction.member.id}moral-B`)
        );

    await interaction.editReply("https://cdn.discordapp.com/attachments/937798817976303617/975192955281367090/280478979_181329734321620_8434313250926599637_n.mp4").catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      });
    
    interaction.channel.send({content: "Según tu criterio, ¿quien crees que ha ganado?",components: [row]}).then(msj => {
        setTimeout(async () => {
            msj.edit({components: []}).catch(e => {
                return;
              });
            },60000)
    })
    .catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })
    }
}