const cats = require("./schemas/cats.js");
const db = require("megadb");
const bedroom = new db.crearDB("bedroom");
const admin = new db.crearDB("admin");
const Discord = require("discord.js");

exports.run = async(Client, message, player) => {
  let filter = { id: { $eq:  message.member.id } };
  let allEv = (random(100) === 69) ? true : false;

  Client.levelupCheck = async (message) => {
    let xp = player.cat.xp;
    let xpLimit = player.cat.xpLimit;
    let newXpLimit = xpLimit*1.6;
  
    player.cat.xp = player.cat.xp+50;
    await cats.findOneAndUpdate(filter,player);
  
    if(xp + 51 > xpLimit){
      let level = player.cat.level;
      level++
      message.channel.send(`Tu michi ha subido a **Nivel ${level}**! :D`)
      message.channel.send("**El :heart: sube al 100%**")
  
      player.cat.love = 100;
      await cats.findOneAndUpdate(filter,player);
       player.cat.level++
      await cats.findOneAndUpdate(filter,player);
      player.cat.xpLimit = newXpLimit
      player.cat.xp = 0;
      await cats.findOneAndUpdate(filter,player);
    }
  }

  Client.response = async (message) => {
    const ms = require("ms");
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
            .setTitle(`˹${player.cat.emoji}˼ • **${player.cat.name}** •───╮`)
            .setDescription(`**💸MONEY:**\n> \`${player.money}\`\n \n*- "${(!player.cat.bismarck) ? `${(!player.cat.bismarck) ? "miau" : "*bocina*"}u ${(!player.cat.bismarck) ? "miau" : "*bocina*"}` : `*sonidos de barco* `}(${estadoAnim})"*`)
            .addField(`✧ Edad:`,"> **"+edad+"**")
            .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
            .addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
            .addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
            .addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
            .addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
            .setColor("#FDA4BA")
            .setFooter({text: `Novedades: ${Client.news}`, iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"});
  
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

  Client.updateEmbed = async (message) => {
      const ms = require("ms");
      const db = require("megadb");
      let daily = player.inv["Claim Diario"];
      let date = Date.now();
      let claim = date - player.claimDate;
      let checkDay = (claim >= 86400000) ? false : true;
      const row = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("<:michi_game:970236556315070505>")
          .setCustomId(message.member.id+"games")
          .setStyle("PRIMARY")
      )
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("❤️")
          .setCustomId(message.member.id+"love")
          .setStyle("PRIMARY")
      )
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("🍱")
          .setCustomId(message.member.id+"food")
          .setStyle("PRIMARY")
      )
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("🛒")
          .setCustomId(message.member.id+"shop")
          .setStyle("PRIMARY")
      )
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("💊")
          .setCustomId(message.member.id+"cure")
          .setStyle("PRIMARY")
      )
      const row2 = new Discord.MessageActionRow()
      .addComponents(
          new Discord.MessageButton()
          .setEmoji("🐱")
          .setCustomId(message.member.id+"cat")
          .setStyle("SECONDARY")
      )
  
      if(daily) {
          row2.addComponents(
              new Discord.MessageButton()
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
      let status = player.cat.life + player.cat.food + player.cat.love + player.cat.fun
      if(status > 399) var estadoAnim = estados[0]
      if(status < 400) var estadoAnim = estados[1]
      if(status < 350) var estadoAnim = estados[2]
      if(status < 250) var estadoAnim = estados[3]
      if(status < 150) var estadoAnim = estados[4]
      const embd = new Discord.MessageEmbed()
      .setTitle(`˹${player.cat.emoji}˼ • **${player.cat.name}** •───╮`)
      .setDescription(`**💸MONEY:**\n> \`${player.money}\`\n \n*- "${(!player.cat.bismarck) ? `${(!player.cat.bismarck) ? "miau" : "*bocina*"}u ${(!player.cat.bismarck) ? "miau" : "*bocina*"}` : `*sonidos de barco* `}(${estadoAnim})"*`)
      .addField(`✧ Edad:`,"> **"+edad+"**")
      .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
      .addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
      .addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
      .addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
      .addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
      .setColor("#FDA4BA")
      .setFooter({
          text: Client.news,
          iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"
      })
      message.message.edit({
          embeds: [embd],
          components: [row,row2]
      })
  }
  

  
  if (player) {
    if (player.cat.love < 1) {
      player.cat.love = 0;
    }
    if (player.cat.fun < 1) {
      player.cat.fun = 0;
    }
    if (player.cat.life < 1) {
      player.cat.life = 0;
    }
    if (player.cat.love < 1) {
      player.cat.love = 0;
    }
    cats.findOneAndUpdate(filter, player)
  }

  if (player && allEv) {
    const inBedroom = await bedroom.get("sleeping");
    if (inBedroom.includes(player.cat.name)) return;
    let eventos = ["resfriado", "accidente"];
    let iRan = Math.floor(Math.random() * eventos.length);

    if (eventos[iRan] === "resfriado") {

      if (player.cat.life > 0) {
        message.channel.send(`*achs* >-<\n\n**Tu gatito/a ha cazado un resfriado restando su salud un 35%(<@${message.member.id}>)💔**`).catch(e => {
          return;
        })
        player.cat.life = player.cat.life - 35;
      }

      await cats.findOneAndUpdate(filter, player)
    }
    if (eventos[iRan] === "accidente") {
      if (player.cat.life > 0) {
        message.channel.send(`**Tu gatito/a estaba jugando y se cayo golpeandose, su salud y diversión son restados un 20%(<@${message.member.id}>)🤕**`).catch(e => {
          return;
        })
        player.cat.life = player.cat.life - 30;
      }
      if (player.cat.fun > 0) {
        player.cat.fun = player.cat.fun - 30;
      }
      await cats.findOneAndUpdate(filter, player)
    }
  }


}