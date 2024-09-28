import express from 'express';
import { sql } from './db.js'; // Certifique-se de que o caminho está correto

const app = express();
app.use(express.json()); // Para permitir o envio de JSON nas requisições

app.post('/api/usuarios', async (req, res) => {
    const { nome, usuario, senha, sexo } = req.body;
    const usuarioId = randomUUID();

    try {
        await sql`
            insert into clientes (id, nome, usuario, senha, sexo) 
            values (${usuarioId}, ${nome}, ${usuario}, ${senha}, ${sexo})
        `;
        res.status(200).send({ message: 'Usuário criado com sucesso' });
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).send({ error: 'Erro ao criar usuário' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
