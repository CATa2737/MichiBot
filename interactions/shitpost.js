const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction, args) => {
let filter = { id: { $eq:  interaction.member.id } }
    try{
    let player = await cats.findOne({id: interaction.member.id});
    await interaction.deferReply()
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);

    const row = new Discord.MessageActionRow()
    .addComponents(
        new Discord.MessageButton()
        .setLabel("OTRO")
        .setCustomId(interaction.member.id+"shitpost")
        .setStyle("PRIMARY")
    );

    let random = Math.floor(Math.random() * 3);
    await interaction.editReply({content: Shitpost.allShitpost(), components: [row]})
    setTimeout(async () => {
      await interaction.editReply({components: []}).catch(e => {
            return;
          });
    },30000)
    let viewShit = player.viewShit;
     
    if(player.cat.fun < 99) {
        player.cat.fun++
        await cats.findOneAndUpdate(filter,player);
    }
    if(!viewShit) {
        interaction.channel.send("Aqui tienes +5 de 💸 por ser tu primera vez. \n \n`Advertencia: Aqui vas a ver memes de \"muy mal gusto\" que podrán contener lenguaje no apropiado y discriminación, al seguir usando este comando aceptas los terminos.`");
        player.money = player.money+5;
        await cats.findOneAndUpdate(filter,player);
        player.viewShit = true;
        await cats.findOneAndUpdate(filter,player);
    }
    if(random === 2){
        player.money++
        await cats.findOneAndUpdate(filter,player);
        interaction.channel.send("**Tienes +1 de 💸**")
    }
} catch(e){
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
    interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
}
}