const { InteractionCollector } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
 
const memo = new db.memoDB("race");
        

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
if(!player) interaction.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
    console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
  });
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    const levelup = require("../comandos/levelup");
    levelup.run(Client,interaction);

    try{
        
        let michis = await cats.find({ id: { $exists: true } });
        let michiRandom = michis[Math.floor( Math.random() * michis.length)]
        const player2 = await cats.findOne({ id: { $eq: michiRandom.id } }).exec();

        memo.set(`${interaction.member.id}.player2`,player2.id)

        memo.set(`${interaction.member.id}.x2`,0);

        const row = new Discord.MessageActionRow()
        .addComponents( new Discord.MessageButton()
            .setEmoji("<a:animated_right:978508823432147004>")
            .setCustomId(interaction.member.id+"race-step")
            .setStyle("PRIMARY")
        )

        interaction.editReply({content: `\`${player.cat.name}\`\n${player.cat.emoji}🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦\n                                                            🍕\n\`${player2.cat.name}\`\n${player2.cat.emoji}🟦🟦🟦🟦🟦🟦🟦🟦🟦🟦 `,components: [row]})
        .then(msj => {
            setInterval( async () => {
                let random = (Math.floor( Math.random() * 100) > 50 && memo.has(`${interaction.member.id}`)) ? true : false;
                if(random){
                    let terrain = await memo.get(`${interaction.member.id}.terrain`);
                    if(!terrain) return;
                    memo.sumar(`${interaction.member.id}.x2`,1)
                    let x = await memo.get(`${interaction.member.id}.x2`);

                    if(x > 10) return interaction.channel.send({content: `${player2.cat.name} Gana > <.\n\n**+25 de 💸 a ${player2.cat.name}**`, components: []}).then( async a => {
                        memo.delete(`${interaction.member.id}`);
                        interaction.deleteReply()
                        await player2.updateOne({ $inc: { money: 25 } });
                        let userWinner = Client.users.cache.find( u => u.id === player2.id);
                        if(!userWinner){
                            interaction.channel.send("*no se ha podido notificar a el ganador de su victoria.*");
                        
                        } else {
                            userWinner.send(`**${player2.cat.name} Ha ganado una carrera contra ${player.cat.name} y recibes +25 de 💸 :D**`).catch(e => {
                            interaction.channel.send("*no se ha podido notificar a el ganador de su victoria.*");
                            return console.log(e.toString());
                        });
                        }
                      })

                    let terrain2 = [
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
              
                    terrain2[x] = player2.cat.emoji;
                    memo.set(`${interaction.member.id}.terrain2`,terrain2);
                    msj.edit({content: `\`${player.cat.name}\`\n${terrain.join("")}\n                                                            🍕\n\`${player2.cat.name}\`\n${terrain2.join("")}`}).catch(e => {
                        return console.log(e.toString());
                    });
                    
                }
            },1200)
        })
        .catch(e => {
            return console.log(e.toString());
        });
    
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}