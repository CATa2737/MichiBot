const Discord = require("discord.js");
const db = require("megadb");
 
const cd = new db.memoDB("cooldownRace");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
  if(!interaction) return;
    let filter = { id: { $eq:  interaction.member.id } };
    const player = await cats.findOne({ id: { $eq: interaction.member.id } }).exec();
    
    let enCD = await cd.get(`${interaction.member.id}`);
    if(enCD) return interaction.reply({content: `Espere 3 segundos por cada click`, ephemeral: true}).catch(e => {
        return console.log(e.toString());
    });
    cd.set(`${interaction.member.id}`,true);
    setTimeout( async() => {
        cd.set(`${interaction.member.id}`, false);
    }, Client.time.seconds(3));

     
    Client.levelupCheck(interaction);

    try{

      
      const memo = new db.memoDB("race");

      let pID = await memo.get(`${interaction.member.id}.player2`);
      let player2 = await cats.findOne({ id: pID });
      if(!pID) return;

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
      if(!interaction.message) return;
      if(x < 10) return interaction.reply("Cargando").then( async() => {
        await interaction.deleteReply()
      })
      if(x > 10) return interaction.reply(`${player.cat.name} Gana :D\n\n**+25 de 💸**`).then( async a => {
        memo.delete(`${interaction.member.id}`);
        interaction.message.edit({ components: [] }).catch(e => {
          return console.log(`Probablemente mensaje borrado: ${e}`);
        });
        interaction.message.delete().cacth(e => {
          return console.log(`Probablemente mensaje borrado: ${e}`);
        });
        
      player.money = player.money + 30;
      await cats.findOneAndUpdate(filter,player)
      })
      


    } catch(e){
      console.log(`${e.toString()} En ${interaction.channel.name} de ${interaction.guild.name}`)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}