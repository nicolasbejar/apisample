const mongo = require("../lib/mongo");


function getUser(usernameP) {
    return mongo.then((client) => {
        return client
            .db("prueba")
            .collection("auth")
            .findOne({ "username": usernameP });
    });
}


const auth = { getUser };

module.exports = auth;