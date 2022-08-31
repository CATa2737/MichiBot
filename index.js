const Discord = require("discord.js");
const db = require("megadb");
const pack = require("./package.json");
const fs = require("fs")
const connection = require("./connect");

const Client = new Discord.Client({
  intents: 32767,
  ws: {
    properties: {
      $browser: "Discord Android"
    }
  },
})

const events = fs.readdirSync("./events").filter(f => f.endsWith(".js"))

for (const file of events) {
  let fileCode = require(`./events/${file}`)
  Client.on(file.replace(".js",""), async(...args) => {
    try {
      await fileCode.run(...args)
    } catch (error) {
      console.error(error)
    }
  })
}
connection.Connect()
Client.login("");
