import express, { Request } from 'express';
import { AppDataSource } from './database/data-source';
import { Product } from './entities/Product';
import { Category } from './entities/Category';

const app = express();
app.use(express.json()); // SEMPRE passar para trabalhar com JSON

AppDataSource.initialize()
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch(error => {
        console.error('Erro ao conectar ao banco de dados', error);
    });

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

/* Rota de pegar todos os produtos */
app.get('/products', async (request, response) => {
    try {
        const products = await productRepository.find({
            order: {
                price: 'DESC',
            },
        }); // SELECT * FROM products
        response.json(products);
    } catch {
        response.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

/* Rota de pegar um produto pelo id */
app.get('/products/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const productInDatabase = await productRepository.findOne({
            where: {
                id: id,
            },
        }); // SELECT * FROM products WHERE id = ?

        if (!productInDatabase) {
            response.status(404).json({ error: 'Produto não encontrado' });
        } else {
            response.json(productInDatabase);
        }
    } catch {
        response.status(500).json({ error: 'Erro ao buscar produto' });
    }
});

/* Rota de deletar um produto */
app.delete('/products/:id', async (request, response) => {
    try {
        const id = Number(request.params.id);
        const productDeleted = await productRepository.delete(id); // DELETE FROM products WHERE id = ?

        if (productDeleted.affected === 0) {
            response.status(404).json({
                error: 'Produto não foi encontrado e portanto não foi deletado',
            });
        } else {
            response.status(204).json();
        }
    } catch {
        response.status(500).json({ error: 'Erro ao deletar produto' });
    }
});

/* Rota de pegar um produto específico */
app.get('/categories', async (request, response) => {
    try {
        const categories = await categoryRepository.find();
        response.json(categories);
    } catch {
        response.status(500).json({ error: 'Erro ao buscar categorias' });
    }
});

/* Rota de cadastrar produto */
app.post('/products', async (request, response) => {
    try {
        /* Recebe o body */
        const body = request.body;

        if (!body.name) {
            response.status(400).json({ error: 'O campo nome é obrigatório' });
        } else if (!body.price) {
            response.status(400).json({ error: 'O campo preço é obrigatório' });
        } else if (!body.description) {
            response
                .status(400)
                .json({ error: 'O campo descrição é obrigatório' });
        } else if (!body.brand) {
            response.status(400).json({ error: 'O campo marca é obrigatório' });
        } else {
            /* Cria uma instância de produto */
            const product = new Product();

            /* Atribui os valores do body para o produto */
            product.name = body.name;
            product.price = body.price;
            product.brand = body.brand;
            product.description = body.description;

            const productCreated = await productRepository.save(product); // INSERT INTO products (name, price, brand, description) VALUES (...)

            response.status(201).json(productCreated);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Erro ao cadastrar produto' });
    }
});

app.post('/categories', async (req, res) => {
    try {
        const body = req.body;

        if (!body.name) {
            res.status(400).json({ message: 'O campo nome é obrigatório' });
        } else {
            const category = new Category();
            category.name = body.name;

            const createdCategory = await categoryRepository.save(category); // = insert into no sql
            res.status(201).json(createdCategory);
        }
    } catch (error) {
        console.log('Erro ao salvar a categoria', error);
        res.status(500).json({ message: 'Erro ao salvar a categoria' });
    }
});

/* Rota de atualizar produto */
app.put('/products/:id', async (request: Request, response) => {
    try {
        const id = Number(request.params.id);
        const body = request.body; // dados que serão atualizados

        if ('name' in body && !body.name) {
            response
                .status(400)
                .json({ error: 'O campo nome não deve ser inválido' });
        } else if ('price' in body && !body.price) {
            response
                .status(400)
                .json({ error: 'O campo preço não deve ser inválido' });
        } else if ('description' in body && !body.description) {
            response
                .status(400)
                .json({ error: 'O campo  descrição não deve ser inválido' });
        } else if ('brand' in body && !body.brand) {
            response
                .status(400)
                .json({ error: 'O campo Marca não deve ser inválido' });
        } else {
            
            const productInDatabase = await productRepository.findOne({
                where: { id },
            });

            if (!productInDatabase) {
                response.status(404).json({ error: 'Produto não encontrado' });
            } else {
                productInDatabase.name = body.name;
                productInDatabase.price = body.price;
                productInDatabase.brand = body.brand;
                productInDatabase.description = body.description;
                productInDatabase.status = body.status;

                const productUpdated =
                    await productRepository.save(productInDatabase);
                response.json(productUpdated);
            }
        }
    } catch {
        response.status(500).json({ error: 'Erro ao atualizar produto' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
