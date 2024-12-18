import express from 'express';
import { AppDataSource } from './database/data-source';
import { Product } from './entities/Product';

/*
    get -> buscar informação
    post -> enviar informação e criar uma informacao
    delete -> deletar informação
    put -> atualizar informação
*/

const app = express();

AppDataSource.initialize()
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados', error);
    });

app.get('/products', async (request, response) => {
    //response.send("<strong>Olá, mundo!</strong>")

    const productManager = AppDataSource.getRepository(Product)
    const produtosNoBancoDados =  await productManager.find() // SELECT * FROM products
    response.json(produtosNoBancoDados);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
