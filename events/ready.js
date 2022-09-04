const Discord = require("discord.js");
const pack = require("../package.json");
const cats = require("../schemas/cats");

exports.run = async(Client) => {

  let michis = await cats.find({ id: { $exists: true } });
  let i = 0;
  let estados = [`#MichiBotTEAM`,`${michis.length} Michis! :D`]
  setInterval(async () => {

    Client.user.setActivity({
      name: `Solo dí "mish" :D | ${estados[random(estados.length-1)]} | v${pack.version}`,
      type: "PLAYING"
    });
  }, Client.time.seconds(10))

  console.log(`MIAU!`)
}
