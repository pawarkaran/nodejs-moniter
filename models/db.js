const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",   
    port: 5432,
    database: "devops"
});

pool.connect();


module.exports = pool;