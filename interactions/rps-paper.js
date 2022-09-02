const Discord = require("discord.js");
const db = require("megadb");
const ms = require("ms");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
  })

     
    Client.levelupCheck(interaction);
     
    let options = ["rock","paper","scizor"];
    let random = options[Math.floor(Math.random() * options.length)];
    const gif = "https://cdn.discordapp.com/attachments/936097122481229928/997284315224350780/unknown.png";
    interaction.channel.send(gif).then(m => {
      setTimeout(() => {
          m.delete()
        },2500)
    })
    if(random === "scizor"){
        await interaction.editReply({content: `${(!player.cat.bismarck) ? "miau" : "*bocina*"} >:D **Haciendo sus manitas como una tijera, ${player.cat.name} gana**`, ephemeral: true}).catch(e => {
        
          console.log(e)
          })
        if(player.cat.fun < 99) {
          player.cat.fun++;
          await cats.findOneAndUpdate(filter,player);
        };
    } else{
        await interaction.editReply({content: `Meow >:D **Indicando en su manita un/a ${(random === "rocka") ? `roca, tu ganas** ${(!player.cat.bismarck) ? "miau" : "*bocina*"}n't` : `papel, han empatado** ${(!player.cat.bismarck) ? "miau" : "*bocina*"} -w-`}`, ephemeral: true}).catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          })
        player.money = player.money+2;
        await cats.findOneAndUpdate(filter,player);
        interaction.channel.send(`**+2 de 💸**`).catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          })
    }
    
    setTimeout(() => {
    interaction.deleteReply()
    },2500)
}
