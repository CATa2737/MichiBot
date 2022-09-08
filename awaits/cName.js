const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const config = new db.crearDB("config");
const cats = require("../schemas/cats");
const quotes = require("../quotes.json");
 
module.exports.run = async (Client, message) => {
    let filter = { id: { $eq:  message.member.id } };
    let player = await cats.findOne(filter); 
    if(message.content.length > 30) return message.channel.send(quotes.cName[0]["es"]);
    player.cat.name = message.content;
    await cats.findOneAndUpdate(filter,player);
    message.channel.send(`${quotes.cName[1]["es"]}**${message.content}**`);
    admin.delete(`${message.member.id}.await`);
}