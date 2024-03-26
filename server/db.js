import knex from 'knex';

const connection =  {
    host: '87.89.115.221',
    port: 21111,
    database: 'tkt_g3',
    user: 'admin',
    password: 'ApReactG3',
}
const db = knex({
    client: 'mysql2',
    connection: connection
});

export default db;