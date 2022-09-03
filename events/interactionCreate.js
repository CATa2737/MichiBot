const Discord = require("discord.js");
const cats = require("../schemas/cats");
const moment = require("moment");
const ms = require("ms");
const db = require("megadb");

const bedroom = new db.crearDB("bedroom");
const memo = new db.memoDB("memo");

exports.run = async(Client, interaction) => {
  if(!interaction) return;
  let filter = { id: { $eq: interaction.member.id } };
  let player = await cats.findOne(filter);

  const inBedroom = await bedroom.get("sleeping");
  if (inBedroom.includes(player.cat.name)) return interaction.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
  
  const cd = new db.crearDB("cd");
  if (!cd.has(`${interaction.member.id}`)) {
    cd.set(`${interaction.member.id}`, false);
  }

  try {
    if (interaction.isButton() || interaction.customId === interaction.member.id + "buy") {
      try {
        if (!interaction.customId.includes(interaction.member.id)) return;
        let cmd = (interaction.customId.includes("roulette")) ? require("../interactions/roulette") : require(`../interactions/${interaction.customId.replace(interaction.member.id, "")}`);

        cmd.run(Client, interaction).catch(e => {
          console.log("Error suprimido: "+e)
        });
      } catch (error) {
        console.log(error.toString())
      }
    }

    if (interaction.isSelectMenu() && interaction.customId !== interaction.member.id + "buy") {
      try {
        if (!interaction.values[0].includes(interaction.member.id)) return;
        let cmd = require(`../interactions/${interaction.values[0].replace(interaction.member.id, "")}`);
        cmd.run(Client, interaction).catch(e => {
          console.log("Error suprimido: "+e)
        });
      } catch (error) {
        console.log(error.toString())  
      }
    }

    if (interaction instanceof Discord.CommandInteraction) {
      const slashcommand = Client.slashcommands.get(interaction.commandName)

      if(!slashcommand) return;

      try {
        slashcommand.run(Client, interaction).catch(e => {
          console.log("Error suprimido: "+e)
        });
      } catch (error) {
        console.log("[SLASH COMMANDS] Error:" + error)
      }
    }

    if (interaction.isModalSubmit()) {
      try {
        let cmd = require(`../interactions/${interaction.customId}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
      }
    }

  } catch (error) {
    let er = error.toString()
    if (er.startsWith("Error: Cannot find module")) return;
    console.log(error)
  }

  
}