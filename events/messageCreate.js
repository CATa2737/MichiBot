const Discord = require("discord.js");
const commands = require("../commands.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const db = require("megadb")
const moment = require("moment");
const cats = require("../schemas/cats.js");
const pack = require("../package.json");
const ms = require("ms");

const memo = new db.memoDB("memo");
const admin = new db.crearDB("admin");
const bedroom = new db.crearDB("bedroom");
const versiones = new db.crearDB("updates");
exports.run = async(message) => {
  try {
    if (memo.has(`${message.guild.id}`)) return;
    if (message.author.bot || !message.guild || !message.channel.viewable) return;

    let version = await versiones.get(`${message.guild.id}`);
    memo.set(`${message.guild.id}`, pack.version);

    if (version !== pack.version) {
      message.channel.send("🤖**EL BOT SE HA ACTUALIZADO EN ESTE SERVIDOR**🔴 🟡 🟢\n`si desea ver los cambios puede escribir /changes`")
      versiones.set(`${message.guild.id}`, pack.version)
    }

  } catch (e) {
    console.log(e.toString())
      }
  
  
  
  
  if (message.author.bot || !message.guild || !message.channel.viewable) return;
  let player = await cats.findOne({ id: message.member.id });
  let filter = { id: { $eq: message.member.id } };
  let prefix = "michi ";
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  let Await = await admin.get(`${message.member.id}.await`);
  let alea = Math.floor(Math.random() * 3);
  let allEv = (Math.floor(Math.random() * 100) === 69) ? true : false;

  if (command === "sleep") {
    if (!message.content.startsWith(prefix)) return;

    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });

    return commands.sleep(message);
  }

  if (command === "help") {
    if (!message.content.startsWith(prefix)) return;

    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });
    const inBedroom = await bedroom.get("sleeping");
    if (inBedroom.includes(player.cat.name)) return message.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
    return commands.help(Client, message, args)

  }

  if (command === "prueba") {
    let cats2 = new db.crearDB(`cats`);
    cats2.map(false, async (gatito, user) => {
      if (gatito.toString().startsWith("function")) return;

      const newCat = new cats({
        id: user,
        cat: {
          name: gatito.cat.name,
          emoji: gatito.cat.emoji,
          edad: gatito.cat.edad,
          life: gatito.cat.life,
          fun: gatito.cat.fun,
          love: gatito.cat.love,
          level: gatito.cat.level,
          xp: gatito.cat.xp,
          xpLimit: gatito.cat.xpLimit
        },
        money: gatito.money,
        inv: gatito.inv,
        noSub: {},
        viewShit: gatito.viewShit
      });

      await newCat.save()
    })
  }
  if (command === "cat") {

    if (!message.content.startsWith(prefix)) return;

    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });
    return commands.cat(Client, message, args)
  }

  if (command === "adopt") {
    if (!message.content.startsWith(prefix)) return;

    return commands.michiInit(message, prefix)
  }

  if (command === "shitpost") {
    if (!message.content.startsWith(prefix)) return;

    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });
    const inBedroom = await bedroom.get("sleeping");
    if (inBedroom.includes(player.cat.name)) return message.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
    return commands.shitpost(Client, message, args)
  }
  if (command === "rps") {
    if (!message.content.startsWith(prefix)) return;

    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });
    const inBedroom = await bedroom.get("sleeping");
    if (inBedroom.includes(player.cat.name)) return message.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
    return commands.rps(message)
  }

  if (command === "code") {
    if (!message.content.startsWith(prefix)) return;
    if (!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
    });
    return commands.code(message, args, prefix)
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

  if (Await) {
    return commands.Awaiting(Client, message, Await)
  }

  let llamados = ["michi", "mish", "ps ps"]
  if (player) {
    if (player.cat.bismarck) {
      llamados = ["*bocina*"];
    }
  }
  for (let llamado of llamados) {
    if (message.content.toLowerCase().includes(llamado)) {
      const inBedroom = await bedroom.get("sleeping");
      if (player) {
        if(inBedroom.includes(player.cat.name)) return message.reply("💤").then(a => {
          setTimeout(e => {
            a.delete()
          }, 3800)
        });
      }
      return message.reply("¿Intentas llamar a tu michi? `responde \"s\" para continuar`").then(msj => {
        setTimeout(() => {
          msj.delete()
          admin.delete(`${message.member.id}.await`);
        }, 4500)
        admin.set(`${message.member.id}.await.name`, "michi");
      })
        .catch(e => {
          console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
        });
    }
  }

}

