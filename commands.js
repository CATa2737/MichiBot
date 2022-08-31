const db = require("megadb");
const cats = require("./schemas/cats");
const admin = new db.crearDB("admin");
const Discord = require("discord.js");
const bedroom = new db.crearDB("bedroom");

async function code(message, args, prefix) {
    if (!message.content.startsWith(prefix))
      return;
      if (message.member.id !== "706957433045516348")
      return;
  
    try {
      let player = await cats.findOne({ id: { $eq:  message.member.id } })
      await eval(args.slice(0).join(" "));
    } catch (e) {
      message.channel.send(e.toString()).then(msj => {
        setTimeout(() => {
          msj.delete().catch(e => {
            return;
          });
        }, 10000);
      });
    }
  }

async function Awaiting(Client, message, Await) {
  let cmd = require(`./awaits/${Await.name}`);
  cmd.run(Client, message);
}

async function michiInit(message, prefix) {
  let filter = { id: { $eq:  message.member.id } };
  let player = await cats.findOne( { id: { $eq:  message.member.id } } );
  if (!message.content.startsWith(prefix))
    return;
  if (player)
    return message.reply(`:x:Por ahora solo puedes tener un gatito, nuestra tecnología no es tan avanzada, en un futuro será -w-"`).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
    });

  let date = Date.now();
  if (admin.has(`${message.member.id}.await`))
    return message.channel.send(":x:Oh, parece que ya estaba esperando tu respuesta anteriormente, deja cancelo...").then( async msj => {
      admin.delete(`${message.member.id}.await`);
      await cats.findOneAndDelete(filter)
    });
  
const newCat = new cats({
  id: message.member.id,
  cat: {
  name: "Michi",
  emoji: ":cat:",
  edad: date,
  life: 100,
  fun: 100,
  love: 100,
  level: 1,
  xp: 0,
  xpLimit: 100
  },
  money: 0,
  inv: {},
  noSub: {},
  viewShit: false
  });
  
    await newCat.save()
  message.channel.send(`Hola!, soy MichiBot, dime como se llamará el gatito ^w^`);
  admin.set(message.member.id, { await: { name: "michiInit" } });

}

async function shitpost(Client, message, args){
  let cmd = require(`./comandos/shitpost`);
  cmd.run(Client, message, args);
}

async function rps(message){
  const row = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setLabel("PAPEL")
    .setCustomId(message.member.id+"rps-paper")
    .setStyle("PRIMARY"))
  .addComponents(
    new Discord.MessageButton()
    .setLabel("PIEDRA")
    .setCustomId(message.member.id+"rps-rock")
    .setStyle("PRIMARY"))
  .addComponents(
    new Discord.MessageButton()
    .setLabel("TIJERA")
    .setCustomId(message.member.id+"rps-scizor")
    .setStyle("PRIMARY"))

    message.reply({content: `Elije tu movimiento...`, components: [row]}).catch(e => {
      console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
    });
}

async function cat(Client, message, args){
  let cmd = require(`./comandos/cat`);
  cmd.run(Client, message, args);
}

async function help(Client, message, args){
  let cmd = require(`./comandos/help`);
  cmd.run(Client, message, args);
}

async function updateEmbed(message){
  const ms = require("ms");
  const db = require("megadb");
  const shop = new db.crearDB("shop");
  let filter = { id: { $eq:  message.member.id } };
  let player = await cats.findOne( { id: { $eq:  message.member.id } } );
  let daily = player.inv["Claim Diario"];
  let date = Date.now();
  let claim = date - player.claimDate;
  let checkDay = (claim >= 86400000) ? false : true;
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
              .setTitle(`${(!player.cat.bismarck) ? "miau" : "*bocina*"}, miaau(${estadoAnim})`)
              .setDescription("**💸MONEY:**\n> `" + player.money + `\`\n \n˹${player.cat.emoji}˼ • **`+player.cat.name.toUpperCase()+"** •───╮")
              .addField(`✧ Edad:`,"> **"+edad+"**")
              .addField("✧ Nivel de "+player.cat.name+".", "> `"+player.cat.level+"`")
              .addField(` ✧˚・SALUD・`,`> \`${player.cat.life}%❤️\``)
              .addField(` ✧˚・COMIDA・`,`> \`${player.cat.food}%🍱\``)
              .addField(` ✧˚・AMOR・`,`> \`${player.cat.love}%💕\``)
              .addField(` ✧˚・DIVERSIÓN・`,`> \`${player.cat.fun}%😹\``)
              .setColor("#FDA4BA")
              .setFooter({text: "Novedades: Se está buscando equipo de desarrollo/programadores de bots para MichiBot :3, mas info al /dev", iconURL: "https://media.discordapp.net/attachments/936097122481229928/1006031973648707584/image_18.png?width=97&height=82"});

        message.message.edit({embeds: [embd], components: [row,row2]})
}

async function sleep(message){
  let player = await cats.findOne({ id: { $eq:  message.member.id } })
  const inBedroom = await bedroom.get("sleeping");
  if(inBedroom.includes(player.cat.name)) return bedroom.extract("sleeping",player.cat.name).then(a => {
    message.reply("**tu michi se despertó :D**")
  });
  bedroom.push(`sleeping`,player.cat.name).then(a => {
    message.reply("**tu michi se fue a mimir💤**")
  })


}

module.exports = {
 code,
 Awaiting,
 michiInit,
 shitpost,
 rps,
 cat,
 help,
 updateEmbed,
 sleep
}