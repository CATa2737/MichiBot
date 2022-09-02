const { Interaction } = require("discord.js");
const Discord = require("discord.js");
const db = require("megadb");

module.exports = {
    run: async (Client, message, args) => {
      if(message.member.id !== "706957433045516348" || message.member.id !== "646726391118954505") return
      try {
        let player = await cats.findOne({ id: { $eq:  message.member.id } })
        await eval(args.slice(0).join(" "))
      } catch (e) {
        let msj = await message.channel.send(e.toString())
        setTimeout(() => {
          msj.delete().catch(e => console.log(e))
        }, Client.time.seconds(10))
      }
      }
};
