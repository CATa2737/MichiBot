const Discord = require("discord.js");
const db = require("megadb");
 
const shop = new db.crearDB("shop");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
 
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);
    let item = await shop.get(interaction.values[0].replace(interaction.member.id,""));
    if(item.requireLVL > player.cat.level) return interaction.editReply(`:x:${(!player.cat.bismarck) ? "miau" : "*bocina*"}n't >.< (El nivel de tu michi nivel no es suficiente, debe ser aunque sea nivel ${item.requireLVL} para comprarlo)`)
    if(player.money < item.price) return await interaction.editReply(`:x:${(!player.cat.bismarck) ? "miau" : "*bocina*"}n't >.< (no tienes el suficiente dinero para comprar eso)`).catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      })

    player.money = player.money - item.price;
    await cats.findOneAndUpdate(filter,player);
    
    if(interaction.values[0].includes("Estetica")){
        
    player.cat.emoji =  item.emoji;
    await cats.findOneAndUpdate(filter,player);
    await interaction.editReply(`Te acabas de comprar el emoji \`${item.emoji}\` para **${player.cat.name}** y le queda hermoso :D`).catch(e => {
        console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      });

    }

    if(interaction.values[0].includes("Utilidades")){
      let i = player.inv[item.name];
      if(i){
          player.inv[item.name]++
          await cats.findOneAndUpdate(filter,player)
          await interaction.editReply(`Te acabas de comprar x1 \`${item.name}\` para **${player.cat.name}** :D`).catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          });
          if(item.noSub){
            player.noSub.push(item.name);
            player.inv[item.name] = "Activado"
            await cats.findOneAndUpdate(filter,player)
            setTimeout( async () =>{
              player.noSub.pop(item.name)
              await cats.findOneAndUpdate(filter,player)
            },3600000)
          }
        if(item.name === "Claim Diario"){
          let date = Date.now();
          player.claim = true;
          await cats.findOneAndUpdate(filter,player)
          player.claimDate = date;
          await cats.findOneAndUpdate(filter,player)
        }
        } else{
          player.inv[item.name] = 1;
          await cats.findOneAndUpdate(filter,player)
          await interaction.editReply(`Te acabas de comprar x1 \`${item.name}\` para **${player.cat.name}** :D`).catch(e => {
            console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
          });

        }

        }
}