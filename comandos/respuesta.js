const Discord = require("discord.js");
const db = require("megadb");;
const admin = new db.crearDB("admin");
const ms = require("ms");
const cats = require("../schemas/cats");
 
     
module.exports = {
    name: "hab",
    description: "Buscar una habilidad y sus detalles",
    category: "Sekkai",
    usage: "hab <Nombre de la Habilidad>",
    aliases: "Ninguno",
    run: async (Client, message) => {
      let player = await cats.findOne( { id: { $eq:  message.member.id } } );

      if(!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).then(msj => setTimeout(() => {
        msj.delete().catch(e => {
          return;
        });
      },5000))
      .catch(e => {
        console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
      });
       let date = Date.now();
        let claim = date - player.claimDate;
        let checkDay = (claim >= 86400000) ? false : true;
       
        let daily = player.inv["Claim Diario"];
          
          const row = new Discord.MessageActionRow()
          .addComponents(
            new Discord.MessageButton()
              .setEmoji("<:michi_game:970236556315070505>")
              .setCustomId(message.member.id+"games")
              .setStyle("PRIMARY"))
            .addComponents(
              new Discord.MessageButton()
                .setEmoji("❤️")
                .setCustomId(message.member.id+"love")
                .setStyle("PRIMARY"))
            .addComponents(
              new Discord.MessageButton()
                .setEmoji("🍱")
                .setCustomId(message.member.id+"food")
                .setStyle("PRIMARY"))
            .addComponents(
              new Discord.MessageButton()
                .setEmoji("🛒")
                .setCustomId(message.member.id+"shop")
                .setStyle("PRIMARY"))
            .addComponents(
              new Discord.MessageButton()
                .setEmoji("💊")
                .setCustomId(message.member.id+"cure")
                .setStyle("PRIMARY"));
          
                const row2 = new Discord.MessageActionRow()
                .addComponents(
                  new Discord.MessageButton()
                  .setEmoji("🐱")
                  .setCustomId(message.member.id+"cat")
                  .setStyle("SECONDARY")
                )

                if(daily){
                  row2.addComponents(new Discord.MessageButton()
                  .setEmoji("💰")
                  .setDisabled(checkDay)
                  .setCustomId(message.member.id+"daily")
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
              .setTitle(`${(!player.cat.bismarck) ? `${(!player.cat.bismarck) ? "miau" : "*bocina*"}u ${(!player.cat.bismarck) ? "miau" : "*bocina*"}` : "*sonidos de barco* "}(${estadoAnim})`)
              .setDescription("**💸MONEY:**\n> `" + player.money + `\`\n \n˹${player.cat.emoji}˼ • **`+player.cat.name+"** •───╮")
              .addField(`✧ Edad:`,"> **"+edad+"**")
              .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
              .addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
              .addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
              .addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
              .addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
              .setColor("#FDA4BA")
              .setFooter({text: "Novedades: Se está buscando equipo de desarrollo/programadores de bots para MichiBot :3, mas info al /dev", iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"});

          message.channel.send({components: [row,row2], embeds: [embd]}).then((msj) => {
            setTimeout(() => {
              msj.edit({components: []}).catch(e => {
                return; 
              });
              admin.set(`${message.member.id}.michiActive`,false)
            },40000)
        admin.set(`${message.member.id}.michiActive`,true)
            });
        
    }
}