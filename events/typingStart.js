const Discord = require("discord.js");
const cats = require("../schemas/cats");
const db = require("megadb");

const fish = new db.memoDB("fish");

exports.run = async(typing) => {
  if (!fish.has(`${typing.channel.id}`)) return;

  fish.delete(`${typing.channel.id}`)
  typing.channel.send(`<@${typing.member.id}> haz espantado al pez!`)

}