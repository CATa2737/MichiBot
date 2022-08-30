const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const config = new db.crearDB("config");
const cats = require("../schemas/cats");
 
module.exports.run = async (Client, message) => {
    let filter = { id: { $eq:  message.member.id } };
    let player = await cats.findOne(filter); 
    if(message.content.length > 30) return message.channel.send("Ese nombre es muy largo, intenta denuevo conalgo mas corto");
    player.cat.name = message.content;
    await cats.findOneAndUpdate(filter,player);
    message.channel.send(`Ok!, el nombre de tu ${(!player.cat.bismarck) ? "michi" : "barco"} ahora es **${message.content}**`);
    admin.delete(`${message.member.id}.await`);
}