const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");
const Shitpost = require('discord-shitpost');
const cats = require("../schemas/cats");
const admin = new db.crearDB("admin");

const ms = require("ms");

module.exports = {
    name: "adopt",
    description: "Este comando es para adoptar un michi ^^",
    run: async (Client, message, args) => {
        let filter = { id: { $eq:  message.member.id } };
        let player = await cats.findOne( { id: { $eq:  message.member.id } } );
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
}