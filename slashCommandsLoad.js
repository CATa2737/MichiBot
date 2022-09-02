const fs = require("fs");
const Discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9")

const commands = [];
const slashcommands = fs.readdirSync("./slash commands").filter(file => file.endsWith(".js"));

for(const file of slashcommands){
    const slash = require(`./slash commands/${file}`);
    commands.push(slash.data.toJSON())

}
    const rest = new REST({ version: '9' }).setToken("MTAxMzg1MTUxMTIzMjY2MzU4Mg.GQ6XAh.f-uyzOvYSWnlmh3_S6Zk72YVzakRkJ4dg4yODo");
    slashCreate()

    async function slashCreate(){
        try {
            await rest.put(
              Routes.applicationCommands("1013851511232663582"),
              { body: commands },
            );
            console.log("[SLASH COMMANDS 2.0] Cargados")
          } catch (error) {
            console.error(`[SLASH COMMANDS] ERROR: ${error}`);
          }
    }
