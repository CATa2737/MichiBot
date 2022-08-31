const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const config = new db.crearDB("config");
const cats = require("../schemas/cats");
 

module.exports.run = async (Client, message) => {
    let filter = { id: { $eq:  message.member.id } };
    if(message.content.toLowerCase() === "cancel") return message.channel.send("De acuerdo!, cuando quieras uno envíe `michi adopt` <w<").then(msj => admin.delete(`${message.member.id}.await`));
    if(message.content.length > 30) return message.channel.send("Ese nombre es muy largo, intenta denuevo conalgo mas corto");

    await cats.findOneAndUpdate( { id: { $eq:  message.member.id } }, { cat: { name: message.content } } );
    message.channel.send(`Ok!, el nombre de tu michi ahora es **${message.content}**`);
    if(message.content.toLowerCase() !== "bismarck"){
        message.channel.send("Perfecto, Puedes llamar a tu michi diciendo `mish`, `michi` o `ps ps` ^^");
    } else {
        await cats.findOneAndUpdate( { id: { $eq:  message.member.id } }, { cat: { bismarck: true } });
        await cats.findOneAndUpdate( { id: { $eq:  message.member.id } }, { cat: { emoji: "🚢" } })
        message.channel.send("Qu-que has hecho!?, Oh NOOOOOO!!!!\n\n**se transforma dolorosamente en un barco**")
        message.channel.send("Dí `*bocina*` para jugar con tu barco")
    }
    admin.delete(`${message.member.id}.await`);
}

