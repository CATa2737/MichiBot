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
    const rest = new REST({ version: '9' }).setToken("MTAxMzg1MTUxMTIzMjY2MzU4Mg.G4VQiy.xZ9RYVOl3vPwwlvR9ItzISkq_CgPlBatDVal3E");
    slashCreate()

    async function slashCreate(){
        try {
            await rest.put(
              Routes.applicationCommands("813152173818904597"),
              { body: commands },
            );
            console.log("[SLASH COMMANDS 2.0] Cargados")
          } catch (error) {
            console.error(`[SLASH COMMANDS] ERROR: ${error}`);
          }
    }
