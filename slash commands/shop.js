const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");
 
const shop = new db.crearDB("shop");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Ve directo a la michi tienda!"),

    async run(Client, interaction){

        let filter = { id: { $eq:  interaction.member.id } };
        try{
let player = await cats.findOne({id: interaction.member.id});
if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
  console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
});
 await interaction.deferReply()
   
 
  const levelup = require("../comandos && funciones/levelup");
  levelup.run(Client,interaction);

        let options = [];
          shop.map(false,(data,categoría) => {
            if(categoría.toString().startsWith("[Function") || categoría.toString().startsWith("function") || categoría.toString().startsWith("prin")) return;
            options.push({
            label: `${categoría}${data.emoji}`,
            emoji: `<a:cash3:923126807492960296>`,
            description: `ʚ・・︰`,
            value: `${interaction.member.id}shop${categoría}`
          })
        })
        const embd = new Discord.MessageEmbed()
          .setTitle(`${(!player.cat.bismarck) ? "MICHI" : "BARCO"} TIENDA:heart:`)
          .setDescription("Elija la categoría")
          .setFooter({iconURL: "https://cdn.discordapp.com/attachments/937798817976303617/970849962172768256/michibot.png", text: "MichiBot by CATa"})
          .setColor("#FDA4BA");

          const row = new Discord.MessageActionRow()
          .addComponents(
              new Discord.MessageSelectMenu()
                  .setCustomId(`${interaction.member.id}shopCategory`)
                  .setPlaceholder('Click aqui para elegir')
                  .addOptions(options)
          )

        await interaction.editReply({embeds: [embd], components: [row]})
        setTimeout(async () => {
        await interaction.editReply({components: []}).catch(e => {
            return;
          });
        },60000)
    
        } catch(e){
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
  interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
}

    }
}