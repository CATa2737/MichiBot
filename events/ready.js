const Discord = require("discord.js");
const pack = require("../package.json");
const cats = require("../schemas/cats");

exports.run = async(Client) => {
  //Esto con todos

  let michis = await cats.find({ id: { $exists: true } });
  let i = 0;
  let estados = [`#MichiBotTeam`]
  setInterval(async () => {
    i++;
    if (i > estados.length) {
      i = 0;
    }

    Client.user.setActivity({
      name: `Solo dí "mish" :D | ${estados[i]} | v${pack.version}`,
      type: "PLAYING"
    });
  }, Client.time.seconds(10))

  console.log(`MIAU!`)
}
