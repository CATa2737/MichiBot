const Discord = require("discord.js");
const cats = require("../schemas/cats");
const moment = require("moment");
const ms = require("ms");
const db = require("megadb");

const bedroom = new db.crearDB("bedroom");
const memo = new db.memoDB("memo");

exports.run = async(interaction) => {
  let filter = { id: { $eq: interaction.member.id } };
  let player = await cats.findOne(filter);

  const inBedroom = await bedroom.get("sleeping");
  if (inBedroom.includes(player.cat.name)) return interaction.reply("**tu michi está mimiendo💤**\n\n**para despertarlo usa el comando** `michi sleep`");
  let perm = interaction.guild.me.permissionsIn(interaction.channel).has('SEND_MESSAGES');
  if (!interaction.channel.viewable || !perm) return;
  const cd = new db.crearDB("cd");
  if (!cd.has(`${interaction.member.id}`)) {
    cd.set(`${interaction.member.id}`, false);
  }
  try {
    if (interaction.isButton() || interaction.customId === interaction.member.id + "buy") {
      try {
        if (!interaction.customId.includes(interaction.member.id)) return;
        let cmd = (interaction.customId.includes("roulette")) ? require("./interactions/roulette") : require(`./interactions/${interaction.customId.replace(interaction.member.id, "")}`);

        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true }).catch(e => {
          console.log(e.toString() + " En " + message.channel.name + " de " + message.guild.name)
        });
      }
    }

    if (interaction.isSelectMenu() && interaction.customId !== interaction.member.id + "buy") {
      try {
        if (!interaction.values[0].includes(interaction.member.id)) return;
        let cmd = require(`./interactions/${interaction.values[0].replace(interaction.member.id, "")}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true })
      }
    }

    if (interaction instanceof Discord.CommandInteraction) {
      const slashcommand = Client.slashcommands.get(interaction.commandName)

      if(!slashcommand) return;

      try {
        slashcommand.run(Client, interaction);
      } catch (error) {
        console.log("[SLASH COMMANDS] Error:" + error)
      }
    }

    if (interaction.isModalSubmit()) {
      try {
        let cmd = require(`./modals/${interaction.customId}`);
        cmd.run(Client, interaction);
      } catch (error) {
        console.log(error.toString())
        interaction.reply({ content: `Ups!, ocurrió un error, probablemente discord no reconoció tu interacción ^^"`, ephemeral: true })
      }
    }

  } catch (error) {
    let er = error.toString()
    if (er.startsWith("Error: Cannot find module")) return;
    console.log(error)
  }

  
}