const Discord = require("discord.js");
const db = require("megadb");
 
const ms = require("ms");
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne( { id: { $eq:  interaction.member.id } } );
 await interaction.deferReply()
 
  const levelup = require("../comandos && funciones/levelup");
  levelup.run(Client,interaction);
   
  let food = player.inv["Comida/Alimento"];

    if(food > 0){
        if(player.cat.food > 99) return await interaction.editReply(`**te ignora** \n\n\`${player.cat.name} ya no tiene hambre ^^\``).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        });
        await interaction.editReply(`**${player.cat.name} comienza a comer muy feliz ^^**\n\n**-10 de Hambre**`).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
        
        player.cat.food = player.cat.food+10;
        await cats.findOneAndUpdate(filter,player).then( async a =>{
          player.inv["Comida/Alimento"]--
          await cats.findOneAndUpdate(filter,player)
          
          let { updateEmbed } = require("../commands")
          updateEmbed(interaction);
        })
    } else{
        await interaction.editReply(`Debes comprar comida, puedes usar /shop o utilizar el boton con un carrito de compras`).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
    }
}