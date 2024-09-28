import 'dotenv/config';
import postgres from 'postgres';

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGPASSWORD = decodeURIComponent(PGPASSWORD);

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  user: PGUSER,  // Substitua 'username' por 'user'
  password: PGPASSWORD,
  port: 3000,
  ssl: { rejectUnauthorized: false },  // Corrigir configuração SSL, se necessário
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

export {sql};