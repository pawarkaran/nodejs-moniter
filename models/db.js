const Pool = require("pg").Pool;

const pool = new Pool({
    host: "172.20.0.4",
    user: "kp",
    password: "karan@123",   
    port: 5432,
    database: "devops"
});

pool.connect();


module.exports = pool;
