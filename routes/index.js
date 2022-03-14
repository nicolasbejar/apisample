var express = require("express");
const Joi = require("joi");
const movie = require("../controllers/movie");
//const Movie = require("../models/movie");

var router = express.Router();

const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});


//Auth

let HandlerGenerator = require("../handlegenerator.js");
let middleware = require("../middleware.js");

HandlerGenerator = new HandlerGenerator();

/* GET home page. */
router.get('/', middleware.checkToken, HandlerGenerator.index);

router.post('/login', HandlerGenerator.login);


//Movies

router.get("/movies", middleware.checkToken, function(req, res, next) {
    movie.getMovies().then((movies) => {
        console.log("Movies", movies);
        res.send(movies);
    });
});

router.get("/movies/:id", middleware.checkToken, function(req, res, next) {
    movie.getMovie(req.params.id).then((movie) => {
        console.log("Movies", movie);
        if (movie === null) {
            res.status(404).send("La película con el id no existe");
        }
        res.send(movie);
    });
});

router.post("/movies", middleware.checkToken, function(req, res, next) {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(404).send(error);
    }

    movie.createMovie(req.body).then((movie) => {
        console.log("Movies", movie);
        res.send(movie);
    });
});

router.put("/movies/:id", middleware.checkToken, function(req, res, next) {
    movie.updateMovie(req.params.id, req.body).then((movie) => {
        console.log("movie", movie);
        if (movie.matchedCount === 0) {
            return res.status(404).send("La película con el id no existe");
        }
        res.send(movie);
    });
});

router.delete("/movies/:id", middleware.checkToken, function(req, res, next) {
    movie.deleteMovie(req.params.id).then((movie) => {
        console.log("movie", movie);
        if (movie.deletedCount === 0) {
            return res.status(404).send("La película con el id no existe");
        }
        res.sendStatus(204);
    });
});

module.exports = router;