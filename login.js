let tokens =
[
    {
        owner: "CATa", token: "MTAxMzg1MTUxMTIzMjY2MzU4Mg.G4VQiy.xZ9RYVOl3vPwwlvR9ItzISkq_CgPlBatDVal3E"
    },
    {
        owner: "AguaDeCoco", token: "MTAwMzEwMTA2NTA2MDgyNzE3Ng.GopWFl.m84MOtdrhqbBNoMJhBKIiEs6uOHw4hJrl0A8fI"
    },
    {
        owner: "...", token: "..." //Añade tu token siguiendo el mismo formato!
    }
]
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if(argv.dev === true) argv.dev = "CATa"// Si en el npm start no pusiste un usuario
let dev = argv.dev || tokens[0].owner // CATa
if(!tokens.find(t => t.owner === dev)) throw new Error("No se ha encontrado el token. Verifica ./login.js")
else var token = tokens.find(t => t.owner === dev).token
module.exports = (Client) => {
	console.log(`${cyan("[Login]")} Logueando usando el token de: ${dev}`)
	Client.login(token)
	.catch((error) => {
		if(error.name === "Error [TOKEN_INVALID]") throw new Error("Se ha introducido un token inválido en ./login.js")
	})
}
