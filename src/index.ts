import express from 'express';
import { AppDataSource } from './database/data-source';
import { Product } from './entities/Product';
import { Category } from './entities/Category';

const app = express();
app.use(express.json()) // SEMPRE passar para trabalhar com JSON

AppDataSource.initialize()
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados', error);
    });

/* Rota de pegar todos os produtos */
app.get('/products', async (request, response) => {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
        order: {
            price: 'DESC'
        }
    }); // SELECT * FROM products
    response.json(products);
});

/* Rota de pegar um produto específico */
app.get('/categories', async (request, response) => {
    const categoryRepository = AppDataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    response.json(categories);
});

/* Rota de cadastrar produto */

app.post('/products', async (request, response) => {
   /* Recebe o body */
    const body = request.body

    /* Cria uma instância de produto */
    const product = new Product()

    /* Atribui os valores do body para o produto */
    product.name = body.name
    product.price = body.price
    product.brand = body.brand
    product.description = body.description

    const productRepository = AppDataSource.getRepository(Product);
    const productCreated = await productRepository.save(product)  // INSERT INTO products (name, price, brand, description) VALUES (...)

    response.status(201).json(productCreated)
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
