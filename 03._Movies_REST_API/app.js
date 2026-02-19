const express = require('express');
const app = express();

app.use(express.json());

let movies = [
    { id: 1, title: 'Garlic is as good as ten mothers', year: 1976 },
    { id: 2, title: 'Microscopic Liquid Subway to Oblivion' }
];

let nextId = 3;

app.get("/movies", (req, res) => {
    res.send({ data: movies });
});

app.get("/movies/:id", (req, res) => {
    const providedMovieId = Number(req.params.id);
    const foundMovie = movies.find((movie) => movie.id === providedMovieId);

    if (!foundMovie) {
        return res.status(404).send({ errorMessage: `No movie found by id: ${req.params.id}` });
    }
    res.send(foundMovie);
    
});

// let number = 2;
// Post-fix notation 2, 3
// console.log(number++);
// console.log(number);
// Pre-fix notation  3, 3
// console.log(++number);
// console.log(number);


app.post("/movies", (req, res) => {
    if (!req.body) {
        return res.status(400).send({ errorMessage: 'No JSON body provided.' });
    }

    const providedMovie = req.body;

    providedMovie.id = nextId++;

    movies.push(providedMovie);

    res.send({ data: providedMovie });
});

/* const myBag = {
    lipstick: "red",
    lipstick: "dark red"
};

const yourBag = {
    hairSpray: true,
    lipstick: "black"
};

console.log({  ...yourBag, ...myBag, }); */


app.patch("/movies/:id", (req, res) => {
    const providedMovieId = Number(req.params.id);
    const foundMovieIndex = movies.findIndex((movie) => movie.id === providedMovieId);

    if (foundMovieIndex === -1) {
        res.status(404).send({ errorMessage: `No movie found by id: ${req.params.id}` });
    }

    const foundMovie = movies[foundMovieIndex];
    const providedMovie = req.body;

    const movieToCreate = { ...foundMovie, ...providedMovie, id: providedMovieId };
    movies[foundMovieIndex] = movieToCreate;

    res.send({ data: movieToCreate });
});


app.delete("/movies/:id", (req, res) => {
    const providedMovieId = Number(req.params.id);
    const foundMovieIndex = movies.findIndex((movie) => movie.id === providedMovieId);

    if (foundMovieIndex === -1) {
        return res.status(404).send({ errorMessage: `No movie found by id: ${req.params.id}` });
    }

    movies.splice(foundMovieIndex, 1);

    res.status(204).send();
 });


/* 
    Status codes
2xx: Success
3xx: Redirection
4xx: Client error
5xx: Server error

*/


app.listen(8080);

