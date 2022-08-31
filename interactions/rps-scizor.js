const Discord = require(`discord.js`);
const db = require(`megadb`);
const ms = require(`ms`);

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
    try{
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply()
 
    const levelup = require(`../comandos/levelup`);
    levelup.run(Client,interaction);
     
    let options = [`rock`,`paper`,`scizor`];
    let random = options[Math.floor(Math.random() * options.length)];

    if(random === `rock`){
        await interaction.editReply({content: `${(!player.cat.bismarck) ? "miau" : "*bocina*"} >:D **Haciendo sus manitas como una roca, ${player.cat.name} gana**`, ephemeral: true})  
        if(player.cat.fun < 99) {
            player.cat.fun++
            await cats.findOneAndUpdate(filter,player);
        }
    } else{
        await interaction.editReply({content: `Meow >:D **Indicando en su manita un/a ${(random === `paper`) ? `papel, tu ganas** ${(!player.cat.bismarck) ? "miau" : "*bocina*"}n't` : `tijera, han empatado** ${(!player.cat.bismarck) ? "miau" : "*bocina*"} -w-`}`, ephemeral: true})
        player.money = player.money+2
        await cats.findOneAndUpdate(filter,player);
        interaction.channel.send(`**+2 de 💸**`)
    }
setTimeout(() => {
interaction.deleteReply()
},2500)
} catch(e){
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
    interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
}
}
