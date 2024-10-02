import { fastify } from 'fastify';
import fastifyCors from 'fastify-cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// Registra o CORS para permitir requisições de qualquer origem
server.register(fastifyCors, {
    origin: "*", // Permite todas as origens (útil para desenvolvimento)
});

const database = new DatabasePostgres();

// Rota para criar um usuário
server.post('/usuarios', async (request, reply) => {
    const { nome, usuario, senha, sexo } = request.body;

    await database.create({
        nome,
        usuario,
        senha,
        sexo,
    });

    return reply.status(201).send();
});

// Rota para listar usuários
server.get('/usuarios', async (request, reply) => {
    const search = request.query.search; //recebe os valores do campo de pesquisa (search)

    const usuarios = await database.list(search);

    return usuarios;
});

// Rota para atualizar um usuário
server.put('/usuarios/:id', async (request, reply) => {

    const usuarioID = request.params.id; //atribui o ID do usuario que foi passado
    const { nome, usuario, senha, sexo } = request.body;

    await database.update(usuarioID, {
        nome,
        usuario,
        senha,
        sexo,
    });

    return reply.status(204).send();
});

// Rota para deletar um usuário
server.delete('/usuarios/:id', async (request, reply) => {
    const usuarioID = request.params.id; //atribui o ID do usuario que foi passado
    await database.delete(usuarioID);

    return reply.status(204).send();
});

// Inicia o servidor na porta 3000
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
