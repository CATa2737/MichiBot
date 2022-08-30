const Discord = require("discord.js");
const db = require("megadb");
const ap = new db.memoDB("APUESTAS")
 
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);

    try{
      interaction.message.edit({ components: [] })
    let apuesta = (interaction.commandName) ? interaction.commandName.replace(interaction.member.id+"roulette-","") : interaction.customId.replace(interaction.member.id+"roulette-","");

    let bet = await ap.get(`${interaction.member.id}`);
    console.log(bet)
    let win;
    let num = Math.floor(Math.random() * 36);
    let col = (Math.random() * 100 > 50) ? "rojo" : "negro";
    let numStr = `${num/2}`;
    let isOdd = numStr.includes(`.`);
    let evod = (isOdd) ? "impar" : "par";
    
    if(apuesta === "par" || apuesta === "impar"){
      win = (apuesta === evod) ? true : false;
    }  

    if(apuesta === "rojo" || apuesta === "negro"){
      win = (apuesta === col) ? true : false;
    }

    interaction.editReply("La ruleta se ha iniciado... .w.\n\n`Espere 30 segundos`")
    setTimeout(() => {
      interaction.channel.send(`La bola ha caído en... **${col} ${num}(${evod})**\n\n**${(win) ? "Has ganado! :D" : "Has perdido >-<"}**`).catch(e => {
        return console.log(e);
      })
      .then( async msj => {
        if(win){
          player.money = player.money + bet*2;
          await cats.findOneAndUpdate(filter, player);
          interaction.channel.send(`**+${bet} de 💸**`)
        }
      })
    },30000)
    if(player.cat.fun < 100){
      
      player.cat.fun = player.cat.fun+20;
      await cats.findOneAndUpdate(filter, player);
    
      
    }
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}