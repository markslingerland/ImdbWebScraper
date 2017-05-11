var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){

url = 'http://www.imdb.com/title/tt3896198/?ref_=nv_sr_1';

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.title_wrapper').filter(function(){
        var data = $(this);

        title = data.children().first().text();            

        json.title = title;
        
    })

    $('#titleYear').filter(function(){

      var data = $(this);

      release = data.children().first().text();

      json.release = release;

    })

    $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.children().first().children().first().text();

        json.rating = rating;
    })
}

fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

})

res.send('Check your console!')

    }) ;
})

app.listen('8081')
console.log('What happens in port 8081, stays in port 8081');
exports = module.exports = app;
