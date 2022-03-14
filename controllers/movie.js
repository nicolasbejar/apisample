const mongo = require("../lib/mongo");
const ObjectID = require("mongodb").ObjectId;



function getMovies() {
    return mongo.then((client) => {
        return client.db("prueba").collection("movies").find({}).toArray();
    });
}

function getMovie(id) {
    return mongo.then((client) => {
        return client
            .db("prueba")
            .collection("movies")
            .findOne({ _id: new ObjectID(id) });
    });
}

function createMovie(movie) {
    return mongo.then((client) => {
        return client.db("prueba").collection("movies").insertOne(movie);
    });
}

function updateMovie(id, movie) {
    return mongo.then((client) => {
        return client
            .db("prueba")
            .collection("movies")
            .updateOne({ _id: new ObjectID(id) }, { $set: movie });
    });
}

function deleteMovie(id) {
    return mongo.then((client) => {
        return client
            .db("prueba")
            .collection("movies")
            .deleteOne({ _id: new ObjectID(id) });
    });
}

const movie = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };

module.exports = movie;