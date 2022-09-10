const mongoose = require("mongoose");

exports.Connect = () => {
	mongoose.connect("mongodb+srv://michibot:151106..@michibotstorage.iaqo3.mongodb.net/?retryWrites=true&w=majority", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => {
		console.log(`${cyan("[MegaDB 2]")} Activado`)
    	})
	.catch(e => {
		console.log(`${cyan("[MegaDB 2]")}No se ha podido conectar`)
	})
}
