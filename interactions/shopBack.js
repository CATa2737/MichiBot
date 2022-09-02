const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const shop = new db.crearDB("shop");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
 
  const levelup = require("../comandos && funciones/levelup");
  levelup.run(Client,interaction);
        try{

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

        interaction.message.edit({embeds: [embd], components: [row]})
        await interaction.deleteReply()
      } catch(error){
        console.log(error)
        await interaction.editReply("Ups, ocurrió un error, intentalo denuevo")
      }
}