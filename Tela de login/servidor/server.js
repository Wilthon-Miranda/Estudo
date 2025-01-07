import { fastify } from 'fastify';
import fastifyCors from 'fastify-cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres();

// Registra o CORS para permitir requisições de qualquer origem
server.register(fastifyCors, {
    origin: "*", // Permite todas as origens (útil para desenvolvimento)
});

// Função para agrupar as rotas de usuários
const userRoutes = (server, database) => {
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
};

// Função para agrupar as rotas de anotações
const noteRoutes = (server, database) => {
    // Rota para criar uma anotação
    server.post('/anotacoes', async (request, reply) => {
        const { titulo, conteudo } = request.body;

        await database.createNote({
            titulo,
            conteudo,
        });

        return reply.status(201).send();
    });

    // Rota para listar anotações
    server.get('/anotacoes', async (request, reply) => {
        const search = request.query.search; //recebe os valores do campo de pesquisa (search)
        const anotacoes = await database.listNotes(search);
        return anotacoes;
    });

    // Rota para atualizar uma anotação
    server.put('/anotacoes/:id', async (request, reply) => {
        const anotacaoID = request.params.id; //atribui o ID da anotação que foi passada
        const { titulo, conteudo } = request.body;

        await database.updateNote(anotacaoID, {
            titulo,
            conteudo,
        });

        return reply.status(204).send();
    });

    // Rota para deletar uma anotação
    server.delete('/anotacoes/:id', async (request, reply) => {
        const anotacaoID = request.params.id; //atribui o ID da anotação que foi passada
        await database.deleteNote(anotacaoID);
        return reply.status(204).send();
    });
};

// Inicializa as rotas de usuários e anotações
userRoutes(server, database);
noteRoutes(server, database);

// Inicia o servidor na porta 3000
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
