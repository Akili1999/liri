require("dotenv").config();

// Global variables
var axios = require("axios");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var moment = require("moment")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var [node, file, ...args] = process.argv;

//below are global functions

//This is where we get our search properties when the user uses spotify
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
//This is where we get the information for the movies from OMDB
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
            `Cast: ${movie.data.Actors}\n`
            )
        })
        .catch(function(err){
            console.log(err)
        });
};
// This is where we get the information for the bands
function getConcert(bandName){
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp")
    .then(function(band){
        let artist = JSON.parse(body)[0];
        console.log("");
        console.log(
            `Artist: ${artist[0].data.lineup[i]}\n`,
            `Artist: ${artist[0].data.venue.name}\n`,
            `Artist: ${artist[0].data.venue.city}\n`,
            `Artist: ${artist[0].data.venue.country}\n`,
        );
        var concertDate = moment(artist[i].datetime).format("MM/DD/YY hh:00 A")

        console.log(`Date and Time of event: ${concertDate}\n - - - - -`);
    })
    .catch(function(err){
        console.log(err)
    })
}

// This function searches for a specific movie from the omdb database 
if (args[0] === "movie-this"){
    if (args[1] === undefined){
        getMovie("Mr.+Nobody");
    } else {
        getMovie(args.slice(1).join("+"));
    }
};

// This function searches for a specific spotify song, and allows the user to put in a song title in quotes
if(args[0] === "spotify-this-song"){

    if(args[1] === undefined){
        spotifySong("The Sign");
    } else {
        let songTitle = args.slice(1).join(" ");
        spotifySong(songTitle);
    }
};

if(args[0] === "concert-this"){
    if(args[1] === undefined){
        getConcert("Mastodon")
        } else {
             getConcert(dataArr[1])
    }
}
// Do what it says, runs through an example of our three types of commands
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
       
if (dataArr[0] === "spotify-this-song") {
    if (dataArr[1] === undefined){
        spotifySong("The Sign")
         } else {
            spotifySong(dataArr[1])
            }
        };
        
//if (dataArr[0] === "concert-this"){
//    if (dataArr[1] === undefined){
//         getConcert("Mastodon")
//        } else {
//             getConcert(dataArr[1])
//            }
//       }
    });
};


