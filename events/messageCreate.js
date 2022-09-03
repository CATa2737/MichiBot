const Discord = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const db = require("megadb")
const moment = require("moment");
const cats = require("../schemas/cats.js");
const pack = require("../package.json");
const ms = require("ms");

const admin = new db.crearDB("admin");
const bedroom = new db.crearDB("bedroom");
const update = require("../update.js");
const utilities = require("../michiUtilery.js");

exports.run = async(Client, message) => { 
  if(message.author.bot || !message.guild || !message.channel.viewable) return;        
  globalThis.s 		= (text) => {
	  message.channel.send(text)
  }

  update.run(message)
  let player = await cats.findOne({ id: message.member.id });
  let filter = { id: { $eq:  message.member.id } };
  let prefix = "michi";
  const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();
  let Await = await admin.get(`${message.member.id}.await.name`);
  const inBedroom = await bedroom.get("sleeping");
  let solicitarCmd = command && message.content.startsWith(prefix);
  utilities.run(Client, message, player)


  if(solicitarCmd){
    let usarCmdSinMichi = !player && command !== "help" && command !== "adopt" && command !== "cat";
    let elMichiDuerme = inBedroom.includes(player.cat.name) && command !== "help" && command !== "adopt" && command !== "cat";
    
    try {

      if (!message.content.startsWith(prefix)) return;

      if (usarCmdSinMichi) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
        console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
      });
    
      if (elMichiDuerme){
        return message.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
    
      }

      let cmd = require(`../comandos && funciones/${command}.js`);
      return cmd.run(Client, message, args);
    } catch (error) {
      console.log(error.toString())
    }
  }
  

  if (Await) {
    let cmd = require(`../awaits/${Await}.js`);
    return cmd.run(Client, message);
  }


  let llamados = ["michi", "mish", "ps ps"]
  if (player) {
    if (player.cat.bismarck) {
      llamados = ["*bocina*"];
    }
  }
  for (let llamado of llamados) {
    let llamadoAlMichi = message.content.toLowerCase().includes(llamado);
    
    if (llamadoAlMichi) {
      Client.whisper(message)
    }
  }
  

}


