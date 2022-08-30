const Discord = require("discord.js");
const db = require("megadb");
 

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
    const player = await cats.findOne({ id: { $eq: interaction.member.id } }).exec();
    
    await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);

    try{

      const memo = new db.memoDB("race");

      let pID = await memo.get(`${interaction.member.id}.player2`);
      let player2 = await cats.findOne({ id: pID });

      if(memo.has(`${interaction.member.id}.x`)){
        
        memo.sumar(`${interaction.member.id}.x`,1)

      } else {
        memo.set(`${interaction.member.id}.x`,1)
      }

      let x = await memo.get(`${interaction.member.id}.x`);
      let terrain = [
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦",
        "🟦"
      ];
      terrain[x] = `${player.cat.emoji}`;
      memo.set(`${interaction.member.id}.terrain`,terrain)
      let terrain2 = await memo.get(`${interaction.member.id}.terrain2`);
      if(!terrain2){
        terrain2 = [
          `${player2.cat.emoji}`,
          "🟦",
          "🟦",
          "🟦",
          "🟦",
          "🟦",
          "🟦",
          "🟦",
          "🟦",
          "🟦"
        ];
      }
      interaction.message.edit(`\`Michigan 3\`\n${terrain.join("")}\n                                                            🍕\n\`${player2.cat.name}\`\n${terrain2.join("")}`)
      .catch(e => {
        return console.log(e.toString());
    });

      if(x > 10) return interaction.editReply(`${player.cat.name} Gana :D\n\n**+25 de 💸**`).then( async a => {
        memo.delete(`${interaction.member.id}`);
        interaction.message.delete();
        
      player.money = player.money + 30;
      await cats.findOneAndUpdate(filter,player)
      })
      interaction.deleteReply()


    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}