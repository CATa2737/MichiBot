const Discord = require("discord.js");
const db = require("megadb");
const ap = new db.memoDB("APUESTAS");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
  let player = await cats.findOne({id: interaction.member.id});
  let apuesta = parseInt(interaction.fields.getTextInputValue("bet"))
    if(isNaN(apuesta) || apuesta > player.money) return interaction.reply(":x:Apuesta invalida 7-7 `recuerda que no debe ser mayor a el dinero en tu cuenta`");
    console.log(apuesta)
    ap.set(`${interaction.member.id}`,apuesta)
    let filter = { id: { $eq:  interaction.member.id } };
await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
 player.money = player.money - apuesta;
 await cats.findOneAndUpdate(filter,player);
     
    Client.levelupCheck(interaction);

    try{
      const row = new Discord.MessageActionRow()
      .addComponents(
     new Discord.MessageButton()
     .setLabel("ROJO")
     .setCustomId(interaction.member.id+"roulette-rojo")
     .setStyle("DANGER"))
     
      .addComponents(
     new Discord.MessageButton()
     .setLabel("NEGRO")
     .setCustomId(interaction.member.id+"roulette-negro")
     .setStyle("SECONDARY"));
     
     
     const row2 = new Discord.MessageActionRow()
      .addComponents(
     new Discord.MessageButton()
     .setLabel("PAR")
     .setCustomId(interaction.member.id+"roulette-par")
     .setStyle("SUCCESS"))
     
      .addComponents(
     new Discord.MessageButton()
     .setLabel("IMPAR")
     .setCustomId(interaction.member.id+"roulette-impar")
     .setStyle("SUCCESS"));
     
     
     
     const embd = new Discord.MessageEmbed()
     .setTitle("MICHI-RULETA ^-^")
     .setDescription("Elije tu apuesta! .w.")
     .addField("ROJO o NEGRO","` recompensa: x2💸`")
     .addField("PAR o IMPAR","` recompensa: x2💸`")
     .setColor("RED")
     .setTimestamp();
     
     interaction.editReply({embeds: [embd], components: [row,row2]})
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}