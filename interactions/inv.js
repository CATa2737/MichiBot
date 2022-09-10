const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
  let player = await cats.findOne({ id: { $eq:  interaction.member.id } });
  if(!player) return interaction.reply({content: `¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`, ephemeral: true}).catch(e => {
    console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
  });
 await interaction.deferReply().catch(e => {
  console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
})
    let inventario = [];

    for(let item in player.inv){
      console.log(item.toString())
      inventario.push(`\`x${player.inv[item]}\` **${item}**:heart:`)
      if(player.inv[item].toString().startsWith("function")) inventario.pop(`\`x${player.inv[item]}\` **${item}**:heart:`)
    }

      if(!inventario[0]) inventario = ["Esto está vacio como mi corazon"];
        const embd = new Discord.MessageEmbed()
         .setTitle("INVENTARIO")
         .setDescription(`${inventario.join("\n")}`)
         .setColor("BROWN");

        await interaction.editReply({embeds: [embd], ephemeral: true}).catch(e => {
          console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
        })
       await interaction.editReply({embeds: [embd]})
  }