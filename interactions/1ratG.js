const Discord = require("discord.js");
const db = require("megadb");
 
const admin = new db.crearDB("admin");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    if(!interaction) return;
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
 
  let game = await admin.get(`${interaction.member.id}.ratGame`);
  let y = 0;
  let x = 0;

  let posCat = {
      y: y,
      x: x
  }

  if(player.cat.fun < 99) {  
    player.cat.fun++
    await cats.findOneAndUpdate(filter,player)
    }

  admin.set(`${interaction.member.id}.ratGame.cat`,posCat)
   

      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("1ratG")
            .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
              .setLabel(" ")
              .setCustomId("2ratG")
              .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("3ratG")
            .setStyle("SECONDARY"));
const row1 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("4ratG")
            .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
              .setLabel(" ")
              .setCustomId("5ratG")
              .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("6ratG")
            .setStyle("SECONDARY"));
const row2 = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("7ratG")
            .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
              .setLabel(" ")
              .setCustomId("8ratG")
              .setStyle("SECONDARY"))
          .addComponents(
            new Discord.MessageButton()
            .setLabel(" ")
            .setCustomId("9ratG")
            .setStyle("SECONDARY"));
      let rows = [row,row1,row2];

      if(game.cat.x === game.rat.x && game.cat.y === game.rat.y){
        rows[posCat.y].components[posCat.x].setEmoji("🐱");
        await interaction.editReply(`${player.cat.name} Ha cazado la rata >:D\n\n**+4 de 💸**`).catch(e => {
          console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
        });
        player.money = player.money+4;
        await cats.findOneAndUpdate(filter,player);
      
      } else {
        interaction.deleteReply()
        rows[game.rat.y].components[game.rat.x].setEmoji("🐭");
        rows[posCat.y].components[posCat.x].setEmoji("🐱");

        rows[posCat.y].components[posCat.x].setEmoji("🐱");
        }
      
      interaction.message.edit({components: rows}).catch(e => {
        console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
      })
}