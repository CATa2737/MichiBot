const Discord = require("discord.js");
const db = require("megadb");
const fish = new db.memoDB("fish");

const cats = require("../schemas/cats");

module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);
    
const player = await cats.findOne({ id: { $eq: interaction.member.id } }).exec();
try{
      if(!fish.has(`${interaction.channel.id}.catch`)) return await interaction.editReply(`**Haz fallado al capturar el pez.**\n*${player.cat.name} maulla triste*`)
            .then(m => {
              interaction.message.edit({components: []});
              fish.delete(`${interaction.channel.id}`)
              })
            .catch(e => {
              return;
            });
      fish.delete(`${interaction.channel.id}`);
      player.money = player.money + 30;
      await cats.findOneAndUpdate(filter,player)
      await interaction.editReply({ content: `Haz capturado el pez! :D\n\n**+30 de 💸**`, components: [] }).then( a => {
        interaction.message.edit({components: []});
      });
      
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}