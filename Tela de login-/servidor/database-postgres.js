import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres {
    #usuarios = new Map()
    /*USUARIOS*/
    async list(search) {
        let usuarios

        if (search) {
            usuarios = await sql`
            select *
            from usuarios
            where usuario = ${search}
            `   
        } else {
            usuarios = await sql`
            select *
            from usuarios
            `
        }

        return usuarios;
    }

    async create(login) {
        const usuarioID = randomUUID()

        const { nome, usuario, senha, sexo } = login;

        await sql`
        insert into usuarios (id, nome, usuario, senha, sexo)
        VALUES (${usuarioID}, ${nome}, ${usuario}, ${senha}, ${sexo})
        `
    }

    async update(id, login) {
        const { nome, usuario, senha, sexo } = login;

        await sql`
        update usuarios
        set nome = ${nome}, usuario = ${usuario}, senha = ${senha}, sexo = ${sexo}
        where id = ${id}
        ` 
    }

    async delete(id) {
        await sql`
        delete from usuarios 
        where id = ${id}
        `
    }

    /*ANOTAÇÕES*/
    async listNotes(search) {
        let anotacoes
    
        if (search) {
            anotacoes = await sql`
            select *
            from anotacao
            where id_usuario = ${search}
            `   
        } else {
            anotacoes = await sql`
            select *
            from anotacao
            `
        }
    
        return anotacoes;
    }
    
    async createNotes(login) {
        const usuarioID = randomUUID()

        const { nome, usuario, senha, sexo } = login;

        await sql`
        insert into usuarios (id, nome, usuario, senha, sexo)
        VALUES (${usuarioID}, ${nome}, ${usuario}, ${senha}, ${sexo})
        `
    }

    async updateNotes(id, login) {
        const { nome, usuario, senha, sexo } = login;

        await sql`
        update usuarios
        set nome = ${nome}, usuario = ${usuario}, senha = ${senha}, sexo = ${sexo}
        where id = ${id}
        ` 
    }

    async deleteNotes(id, usuario_id) {
        await sql`
        delete from anotacao 
        where id_anotacao = ${id}
        and id_usuario = ${usuario_id}
        `
    }
}/*
export class DatabasePostgres {
    #anotacoes = new Map()    
}*/