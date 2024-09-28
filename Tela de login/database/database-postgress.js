import { randomUUID } from "node:crypto";
import { sql } from './db.js'

export class databasePostgres{
    async list(){
        const usuarios = await sql`
        select
        id,
        nome,
        usuario,
        senha
      from clientes
    `
    return usuarios
    }

    async create(usuario){
        const usuarioId = randomUUID();
        const { } = usuario;

        await sql`insert into clientes (id, nome, usuario, senha, sexo) 
        values (${usuarioId}, ${nome}, ${usuario}, ${senha}, ${sexo})`
    }

    async update(id, nome){

    }

    async delete(id){

    }
}