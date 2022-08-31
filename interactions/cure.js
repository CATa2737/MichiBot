const Discord = require("discord.js");
const db = require("megadb");
 
const ms = require("ms");
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne( { id: { $eq:  interaction.member.id } } );
 await interaction.deferReply().catch(e => {
  console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
})
 
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);
     
    let medicine = player.inv["Medicina/Salud"];

    if(medicine > 0){
        if(player.cat.life > 99) return await interaction.editReply(`**te ignora** \n\n\`Tu gato ya está curado ^^\``).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        });
        await interaction.editReply(`**${player.cat.name} comienza a comer muy feliz ^^**\n\n**Toda la salud ha sido restaurada**`).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
        player.cat.life = 100;
        await cats.findOneAndUpdate(filter,player).then( async a =>{
            let i = player.inv["Medicina/Salud"];
            player.inv["Medicina/Salud"] = i+1;
            await cats.findOneAndUpdate(filter,player);
          
           let { updateEmbed } = require("../commands");
           updateEmbed(interaction);
        })
    } else{
        await interaction.editReply(`Debes comprar la medicina, puedes usar mishi shop o utilizar el boton con un carrito de compras`).catch(e => {
          console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
        })
    }
}