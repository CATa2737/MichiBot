const db = require("megadb");
const pack = require("./package.json");

const versiones = new db.crearDB("updates");
const memo = new db.memoDB("memo");

exports.run = async(message) => {
	try {
    		if (!memo.has(`${message.guild.id}`)){
    			let version = await versiones.get(`${message.guild.id}`);
    			memo.set(`${message.guild.id}`, pack.version);
    			if (version !== pack.version) {
				message.channel.send("🤖**EL BOT SE HA ACTUALIZADO EN ESTE SERVIDOR**🔴 🟡 🟢\n`si desea ver los cambios puede escribir /changes`")
      				versiones.set(`${message.guild.id}`, pack.version)
    			}
    		}
	} catch (e) {
    		console.log(e.toString())
      	}
}
