require("dotenv").config();


var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var [node, file, ...args] = process.argv;

function spotifySong(songName){
    spotify.search({type: "track", query: songName, limit: 5}, function (err, data) {
        if (err){
            return console.log("ERROR: " + err);
        }
        data.tracks.items.forEach(function(element){
            console.log("");
            console.log(
            `Artist: ${element.artists[0].name}\n`,
            `Song: ${songName}\n`,
            `Spotify Preview Link: ${element.preview_url}\n`,
            `Album: ${element.album.name}\n`)
        });
    })
};

function getMovie(movieName) {
    axios.get(`http://www.omdbapi.com/?t=${movieName}&apikey=trilogy`)
    .then(function(movie){
            console.log("");
            console.log(
            `Title: ${movie.data.Title}\n`,
            `Released: ${movie.data.Year}\n`,
            `Rating from IMDB: ${movie.data.Ratings[0].Value}\n`,
            `Country of origin: ${movie.data.Country}\n`,
            `Plot: ${movie.data.Plot}\n`,
            `Cast: ${movie.data.Actors}\n`)
        })
        .catch(function(err){
            console.log(err)
        });
};

function getConert(bandName){
    
}


if (args[0] === "movie-this"){
    if (args[1] === undefined){
        getMovie("Mr.+Nobody");
    } else {
        getMovie(args.slice(1).join("+"));
    }
};

if(args[0] === "spotify-this-song"){

    if(args[1] === undefined){
        spotifySong("The Sign");
    } else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

if (args[0] === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function (error, data){
        if(error){
            return console.log(error);
        }

        dataArr = data.split(",");
        if (dataArr[0] === "movie-this"){
            if(dataArr[1] === undefined){
                getMovie("Mr.+Nobody")
            } else {
                getMovie(dataArr[1].split().join("+"))
            }
        };

        if (dataArr[0] === "spotify-this") {
            if (dataArr[1] === undefined){
                spotifySong("The Sign")
            } else {
                spotifySong(dataArr[1])
            }
        };
    });
};


