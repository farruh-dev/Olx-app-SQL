const Pool = require('pg-pool');
require('dotenv').config();

const pool = new Pool(
    {
        user: 'postgres',
        password: process.env.PSQL_PASSWORD,
        port: '5432',
        database: 'olx_app'
    }
)

async function poolConnect(){
    try {
        const client = await pool.connect();
        return client
    } catch (error) {
        console.log('POOL_CONNECTION_ERROR: ', error + ''); 
    }
}

class PG {
    static async CreateUsersTable(){
        try {
            const client = await poolConnect();

            const users_table = await client.query(`CREATE TABLE users (
                id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
                name VARCHAR(36) NOT NULL,
                email VARCHAR UNIQUE NOT NULL,
                password VARCHAR(64) NOT NULL,
                verified BOOLEAN NOT NULL DEFAULT FALSE
            )`);

        } catch (error) {
            console.log('DB_CREATE_TABLE_ERROR: ', error + '');
        }
    }
    static async GetAllUsers(){ 
        try {
            const client = await poolConnect();

            const users = await client.query(`SELECT * FROM users`)

            return users
        } catch (error) {
            console.log('DB_GET_ALL_USERS_ERROR: ', error + '');
        }
    }
}

console.log(PG.CreateUsersTable());