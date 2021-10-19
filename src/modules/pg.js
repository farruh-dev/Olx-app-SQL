const Pool = require('pg-pool');
require('dotenv').config();

const pool = new Pool(
    {
        database: 'olx',
        user: 'postgres',
        password: process.env.PSQL_PASSWORD,
        port: '5432'
    }
)

async function poolConnect(){
    try {
        const client = await pool.connect();
        console.log(client);
        return client
    } catch (error) {
        console.log('POOL_CONNECTION_ERROR: ', error + ''); 
    }
}

poolConnect()

// class PG {
//     constructor(){
//         this.client = poolConnect();
//     }

//     static async getAllUsers(){
//         try {
//             console.log(this.client); 
//         } catch (error) {
//             console.log('DB_GET_ALL_USERS_ERROR: ', error + '');
//         }
//     }
// }

// console.log(PG.getAllUsers());