const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const config = new db.crearDB("config");
const cats = require("../schemas/cats");
const quotes = require("../quotes.json");

module.exports.run = async (Client, message) => {
    let filter = { id: { $eq:  message.member.id } };
    if(message.content.toLowerCase() === "cancel") return message.channel.send(quotes.michiInit[0]["es"]).then(msj => admin.delete(`${message.member.id}.await`));
    if(message.content.length > 30) return message.channel.send(quotes.cName[0]["es"]);

    await cats.findOneAndUpdate( { id: { $eq:  message.member.id } }, { cat: { name: message.content } } );
    message.channel.send(`${quotes.cName[1]["es"]}**${message.content}**`);
    message.channel.send(quotes.michiInit[1]["es"]);
    
    admin.delete(`${message.member.id}.await`);
}

