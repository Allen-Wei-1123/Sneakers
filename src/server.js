var express = require('express')
var app = express();
var fs = require("fs");


app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-Width,Content-Type,Accept");
    next();
});


app.get('/data',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile( __dirname + "/" + "shoes_data.json", 'utf8', function (err, data) {
        res.end( data );
        // console.log(data)
     });
})

app.get('/shoes/:id',function(req,res){
    var obj;
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile( __dirname + "/" + "shoes_data.json", 'utf8', function (err, data) {
        // res.end( data );
        var id = req.params.id;
        
        obj = JSON.parse(data);
        tmp = obj.filter((item) => item["id"] == id);

        res.end(JSON.stringify(tmp));

     });
})


var server = app.listen(8085, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })