const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const shop = new db.crearDB("shop");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
   
 
  const levelup = require("../comandos/levelup");
  levelup.run(Client,interaction);
        try{

          let options = [];
            shop.map("Estetica",(data,item) => {
              if(item.toString().startsWith("[Function") || item.toString().startsWith("function") || item.toString().startsWith("prin") || item.toString().startsWith("emoj")) return;
              options.push({
              label: `${item} | ${data.price}$💸`,
              emoji: `${data.emoji}`,
              description: `ʚ・${data.description}・︰`,
              value: `${interaction.member.id}Estetica.${item}`
            })
          })

          const embd = new Discord.MessageEmbed()
            .setTitle(`${(!player.cat.bismarck) ? "MICHI" : "BARCO"} TIENDA:heart: | Utilidades`)
            .setDescription("¿Que item comprará?")
            .setFooter({iconURL: "https://cdn.discordapp.com/attachments/937798817976303617/970849962172768256/michibot.png", text: "Para comprar el itém abra el menu y seleccione"})
            .setColor("#FDA4BA");
  
            const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageSelectMenu()
                    .setCustomId(`${interaction.member.id}buy`)
                    .setPlaceholder('Click aqui para elegir')
                    .addOptions(options)
            );
            const row2 = new Discord.MessageActionRow()
            .addComponents(
              new Discord.MessageButton()
              .setEmoji("<:tb_left:968330846413156402>")
              .setCustomId(interaction.member.id+"shopBack")
              .setStyle("PRIMARY")
            );

        interaction.message.edit({embeds: [embd], components: [row,row2]})
        interaction.deleteReply()
      } catch(error){
        console.log(error)
        await interaction.editReply("Ups, ocurrió un error, intentalo denuevo")
      }
}