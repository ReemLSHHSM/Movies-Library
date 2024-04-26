'use strict';

//require express
const express = require('express');
const app = express();

//require axios
const axios = require('axios');

//require cors
var cors = require('cors');

//set port
const port = 8080;
const homeMovie = require('./move_data/data.json');

//require .env
require('dotenv').config();
const apiKey = process.env.API_KEY;
app.use(cors())
//..........................................................................................................................

//Lab11

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

//............................................................................................................................

//Lab12 3rd party API

/// -1-trending endpoint
app.get("/trending", handelTrending);

//Constructor
function Movie(id, title, release_data, poster_path, overview) {
    this.id = id;
    this.title = title;
    this.release_data = release_data;
    this.poster_path = poster_path;
    this.overview = overview;
}


//Fuctions
function handelTrending(req, res) {
    // To get data from 3rd party 
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apiKey}&language=en-US`;
    //Axios 
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let trending = result.data.results.map(trend => {
                let movie= new Movie(
                    trend.id,
                    trend.title,
                    trend.release_data,
                    trend.poster_path,
                    trend.overview
                );

                return movie;
            });
            res.json(trending);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });
}


//***************************************************************** */
//search
app.get("/search", handelSearch);
///search: Search for a movie name
function handelSearch(req, res) {

let search=req.query.movieName;
const url= `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&page=1`;

axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let searching = result.data.results.map(trend => {
                let movie= new Movie(
                    trend.id,
                    trend.title,
                    trend.release_data,
                    trend.poster_path,
                    trend.overview
                );

                return movie;
            });
            res.json(searching);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });
}

//************************************************************************** */

//Popular

app.get('/reviews',popularHandeler);

function popularHandeler(req,res){
    
  
    const url=`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let popularity = result.data.results.map(trend => {
                let movie= new Movie(
                    trend.id,
                    trend.title,
                    trend.release_data,
                    trend.poster_path,
                    trend.overview
                );

                return movie;
            });
            res.json(popularity);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });
}
    
//********************************************************* */
//Movie upcoming

app.get("/upcoming", handelupComing);

function handelupComing(req,res){

const url=`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`;

axios.get(url)
        .then(result => {
            console.log(result.data.results);
            let upcomes = result.data.results.map(trend => {
                let movie= new Movie(
                    trend.id,
                    trend.title,
                    trend.release_data,
                    trend.poster_path,
                    trend.overview
                );

                return movie;
            });
            res.json(upcomes);
        })
        .catch(error => {
            console.error( error);
            res.status(500).json('Internal Server Error');
        });
}

//.............................................................................................................................
//handeling errors
//404
app.use((req,res)=>{
    res.status(404).send(

        "Sorry, page not found"
    )

    
=======
       
     "Sorry, page not found :("
    )

})

//500
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send(

        "Sorry, something went wrong"
=======
         "Sorry, something went wrong :|"

    );
});


//...............................................................................................................................

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

