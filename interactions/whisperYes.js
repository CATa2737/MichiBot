const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");

const cats = require("../schemas/cats");
 
module.exports.run = async (Client, interaction) => {
    if(!interaction) return;
    let filter = { id: { $eq:  interaction.member.id } };
let player = await cats.findOne({id: interaction.member.id});
 await interaction.deferReply().catch(e => {
    console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
 })
    Client.levelupCheck(interaction);

    try{
        console.log(`${interaction.user.username} llamó su gato`)
        
            const ms = require("ms");
            if(!player) return await interaction.editReply({ephemeral: true, content: `¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`}).then(msj => setTimeout(() => {
              msj.delete().catch(e => {
                return;
              });
            },5000))
            .catch(e => {
              console.log(e.toString() + " En " + interaction.channel.name + " de " + interaction.guild.name)
            });
             let date = Date.now();
              let claim = date - player.claimDate;
              let checkDay = (claim >= 86400000) ? false : true;
             
              let daily = player.inv["Claim Diario"];
                
                const row = new Discord.MessageActionRow()
                .addComponents(
                  new Discord.MessageButton()
                    .setEmoji("<:michi_game:970236556315070505>")
                    .setCustomId(interaction.member.id+"games")
                    .setStyle("PRIMARY"))
                  .addComponents(
                    new Discord.MessageButton()
                      .setEmoji("❤️")
                      .setCustomId(interaction.member.id+"love")
                      .setStyle("PRIMARY"))
                  .addComponents(
                    new Discord.MessageButton()
                      .setEmoji("🍱")
                      .setCustomId(interaction.member.id+"food")
                      .setStyle("PRIMARY"))
                  .addComponents(
                    new Discord.MessageButton()
                      .setEmoji("🛒")
                      .setCustomId(interaction.member.id+"shop")
                      .setStyle("PRIMARY"))
                  .addComponents(
                    new Discord.MessageButton()
                      .setEmoji("💊")
                      .setCustomId(interaction.member.id+"cure")
                      .setStyle("PRIMARY"));
                
                      const row2 = new Discord.MessageActionRow()
                      .addComponents(
                        new Discord.MessageButton()
                        .setEmoji("🐱")
                        .setCustomId(interaction.member.id+"cat")
                        .setStyle("SECONDARY")
                      )
          
                      if(daily){
                        row2.addComponents(new Discord.MessageButton()
                        .setEmoji("💰")
                        .setDisabled(checkDay)
                        .setCustomId(interaction.member.id+"daily")
                        .setStyle("SECONDARY")
                        )
                      }
          
                      let edadFilter = ms(Date.now() - player.cat.edad);
                      edad = edadFilter.replace("d", " Días");
                      edad = edad.replace("h", " Horas");
                      edad = edad.replace("m", " Minutos");
                      let estados = ["estoy en estado perfecto, yupiii!!","Me siento casi en estado perfecto","Me siento bien!","Me siento un poco mal","Estoy muy mal :C"];
                let estadoAnim;
          
                if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun > 399){
                  estadoAnim = estados[0];
                }
                if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 400){
                  estadoAnim = estados[1];
                }
                if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 350){
                  estadoAnim = estados[2];
                }
                if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 250){
                  estadoAnim = estados[3];
                }
                if(player.cat.life +player.cat.food + player.cat.love + player.cat.fun < 150){
                  estadoAnim = estados[4];
                } 
                const embd = new Discord.MessageEmbed()
                    .setTitle(`˹${player.cat.emoji}˼ • **${player.cat.name}** •───╮`)
                    .setDescription(`**💸MONEY:**\n> \`${player.money}\`\n \n*- "¡Meow, miau!(${estadoAnim})"*`)
                    .addField(`✧ Edad:`,"> **"+edad+"**")
                    .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
                    .addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
                    .addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
                    .addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
                    .addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
                    .setColor("#FDA4BA")
                    .setFooter({text: `Novedades: ${Client.news}`, iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"});
          
                await interaction.editReply({components: [row,row2], embeds: [embd]}).then((msj) => {
                  setTimeout(() => {
                    msj.edit({components: []}).catch(e => {
                      return; 
                    });
                    admin.set(`${interaction.member.id}.michiActive`,false)
                  },40000)
              admin.set(`${interaction.member.id}.michiActive`,true)
                  });
        
    } catch(e){
      console.log(e.toString() + " En " + interaction.channel.name + " de "+interaction.guild.name)
      interaction.channel.send({content: "Ha ocurrido un error, el error está siendo enviado a la developer",ephemeral: true})
  }
}