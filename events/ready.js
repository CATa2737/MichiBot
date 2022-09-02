const Discord = require("discord.js");
const time = require("time-nodejs")
const pack = require("../package.json");
const cats = require("../schemas/cats");

exports.run = async(Client) => {
  const estados = [`#MichiBotTeam`, `Miau!`, `Gua... digo Miau!`]
  setInterval(() => {
    Client.user.setActivity({
      name: `Solo dí "mish" :3 | ${estados[random(estados.length)]}`,
      type: "PLAYING"
    })
  }, time.seconds(10))
  console.log("Miau!")
}
