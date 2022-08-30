const Discord = require("discord.js");
const db = require("megadb");
const pack = require("./package.json");
const fs = require("fs")
const connection = require("./connect");

const memo = new db.memoDB("memo");

const Client = new Discord.Client({
  intents: 32767,
  ws: {
    properties: {
      $browser: "Discord Android"
    }
  },
})

const events = fs.readdirSync("./events").filter(f => f.endsWith(".js"))

for (const file of events) {
  let fileCode = require(`./events/${file}`)
  Client.on(file.replace(".js",""), async(...args) => {
    try {
      await fileCode.run(...args)
    } catch (error) {
      console.error(error)
    }
  })
}
connection.Connect()
/*
Client.on("messageCreate", async message => {
  
})
*/
/*
Client.on("messageCreate", async (message) => {
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
});
*/
/*
Client.on('interactionCreate', async interaction => {
  let filter = { id: { $eq: interaction.member.id } };
  let player = await cats.findOne(filter);

  const inBedroom = await bedroom.get("sleeping");
  if (inBedroom.includes(player.cat.name)) return interaction.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
  let perm = interaction.guild.me.permissionsIn(interaction.channel).has('SEND_MESSAGES');
  if (!interaction.channel.viewable || !perm) return;
  const cd = new db.crearDB("cd");
  if (!cd.has(`${interaction.member.id}`)) {
    cd.set(`${interaction.member.id}`, false);
  }
  try {
    if (interaction.isButton() || interaction.customId === interaction.member.id + "buy") {
      try {
        if (!interaction.customId.includes(interaction.member.id)) return;
        let cmd = (interaction.customId.includes("roulette")) ? require("./interactions/roulette") : require(`./interactions/${interaction.customId.replace(interaction.member.id, "")}`);

        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true }).catch(e => {
          console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
        });
      }
    }

    if (interaction.isSelectMenu() && interaction.customId !== interaction.member.id + "buy") {
      try {
        if (!interaction.values[0].includes(interaction.member.id)) return;
        let cmd = require(`./interactions/${interaction.values[0].replace(interaction.member.id, "")}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true })
      }
    }

    if (interaction instanceof Discord.CommandInteraction) {
      try {
        let cmd = require(`./interactions/${interaction.commandName}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true })
      }
    }

    if (interaction.isModalSubmit()) {
      try {
        let cmd = require(`./interactions/${interaction.customId}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true })
      }
    }

  } catch (error) {
    let er = error.toString()
    if (er.startsWith("Error: Cannot find module")) return;
    console.log(error)
  }

});
*/
/*
Client.on(`typingStart`, async typing => {
  if (!fish.has(`${typing.channel.id}`)) return;

  fish.delete(`${typing.channel.id}`)
  typing.channel.send(`<@${typing.member.id}> haz espantado al pez!`)

});
*/
Client.login("ODEzMTUyMTczODE4OTA0NTk3.GoO7m4.VCv0M3i9O2-3d4OqoMIlJfxirGTzpsjHaoSwyA");