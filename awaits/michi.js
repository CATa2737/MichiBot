const Discord = require("discord.js");
const db = require("megadb");
const admin = new db.crearDB("admin");
const config = new db.crearDB("config");
const cats = require("../schemas/cats");
 
function response(Client,message,args){
    let cmd = require(`../comandos/respuesta`);  
    cmd.run(Client, message);
}

module.exports.run = async (Client, message) => {
    let filter = { id: { $eq:  message.member.id } };
    let player = await cats.findOne(filter);
    if(message.content.toLowerCase().startsWith("s")){
        admin.delete(`${message.member.id}.await`);
        console.log(`${message.author.tag} llamó su gato`)
        if(!player) return message.reply(`¿Quieres un gatito?, puedes decir "michi adopt" y ya .w.`).catch(e => {
            console.log(e.toString() + " En " + message.channel.name + " de "+message.guild.name)
          });
        return response(Client, message);
    } else {
        return admin.delete(`${message.member.id}.await`);
    }
}