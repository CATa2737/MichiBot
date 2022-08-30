const mongoose = require("mongoose");

function Connect(){
    mongoose.connect("mongodb+srv://michibot:151106..@michibotstorage.iaqo3.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() =>{
        console.log("[MegaDB 2] Activado")
    })
    .catch(e => {
        console.log("No se ha podido conectar a [MegaDB 2]")
    })
}

module.exports = {
    Connect
}