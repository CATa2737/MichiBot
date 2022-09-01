const Discord = require("discord.js");
const db = require("megadb");
const { SlashCommandBuilder } = require("@discordjs/builders");

const cats = require("../schemas/cats");
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName("fish")
    .setDescription("Ve a pescar junto a tu michi!"),
    async run(Client, interaction){
        let filter = { id: { $eq:  interaction.member.id } };
    let player = await cats.findOne({id: interaction.member.id});
    if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
    });
    await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);

    try{
      memo.set(`${interaction.channel.id}.fisheable`,true);

      let random = Math.floor(Math.random() * (40000 + 7000) - 7000);

      const row = new Discord.MessageActionRow()
      .addComponents( new Discord.MessageButton()
        .setLabel(" ")
        .setCustomId(interaction.member.id+"fish-catch")
        .setStyle("PRIMARY")
       )

       interaction.editReply({content: "**Shhhh, que nadie haga ruido🤫** `Si alguien comienza a escribir el pez se irá`", components: [row]})
       .then(msj => {
 
         setTimeout( async () => {
           
           if(!memo.has(`${interaction.channel.id}`)) return msj.edit(`**El pez ha escapado debido a que se ha asustado.**\n*${player.cat.name} maulla triste*`)
             .then(m => {
              memo.delete(`${interaction.channel.id}`)
              msj.edit({components: []})
             })
             .catch(e => {
               return console.log(e);
             });
           
          row.components[0].setEmoji("🐟")
          memo.set(`${interaction.channel.id}.catch`,true)
          msj.edit({content: "`El pez ha aparecido!, Atrapalo!`", components: [row]})
           .catch(e => {
             return;
           })
 
         }, random)
      })
      .catch(e => {
        return;
      });

    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
    }
}