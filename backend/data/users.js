const bcrypt = require("bcryptjs");

const users = [
    {
        name: "admin user",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "jose",
        email: "jose@example.com",
        password: bcrypt.hashSync("123456", 10)
    },
    {
        name: "pepe",
        email: "pepe@example.com",
        password: bcrypt.hashSync("123456", 10)
    },
]
module.exports = users;