import express from 'express'


/*

get -> buscar informação
post -> enviar informação e criar uma informacao
delete -> deletar informação
put -> atualizar informação
*/

const app = express()

app.get("/bem-vindo", () => {
    console.log("Seja bem-vindo")
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
} )

