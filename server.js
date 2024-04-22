'use strict';
// Call express
const express = require('express');
const app = express();

// Call data
const data = require('./Movie Data/data.json');
const port = 8080;

function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

// Route 1 of  home page 
app.get('/', (req, res) => {
    const obj = new Movie(data.title, data.poster_path, data.overview);
    res.json(obj);
});


//Route 2 favorite page
app.get('/favorite',(req,res)=>{
    res.send('Welcome to Favorite Page');
})

//handeling errors
//404
app.use((req,res)=>{
    res.status(404).send({
        status: 404,
        responseText: "Sorry, page not found"
    })
})

//500
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        responseText: "Sorry, something went wrong"
    });
});



// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

