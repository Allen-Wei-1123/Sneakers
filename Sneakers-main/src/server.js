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

app.get('/users/:id',function(req,res){
    var obj;
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        var id = req.params.id;
        
        obj = JSON.parse(data);
        tmp = obj.filter((item) => item["id"] == id);

        res.end(JSON.stringify(tmp));

     });
})


app.post('/cart/:user/:id/:size',function(req,res){
    var obj;
    res.header("Access-Control-Allow-Origin", "*");
    console.log("accessed")
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        

        //res.end( data );
        var obj = JSON.parse(data)
        var userid = req.params.user;
        var cartid = req.params.id;
        var cartarr = obj[userid].cart;
        var sizearr  = obj[userid].sizes;

        cartarr.push(cartid)
        sizearr.push(req.params.size)
        var ans = JSON.stringify(obj);
        
        fs.writeFileSync(__dirname + "/" + "users.json",ans);
        
     });
})



app.post('/remove/:user/:index',function(req,res){
    var obj;
    res.header("Access-Control-Allow-Origin", "*");
    console.log("accessed")
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        
            var obj = JSON.parse(data);
            var userid = req.params.user;
            var val = req.params.index;

            var cartarr = obj[userid].cart;
            var sizearr  = obj[userid].sizes;

            //process start 

            var ind = cartarr.indexOf(val);

            console.log("ind is ",ind)
            cartarr.splice(ind,1);
            sizearr.splice(ind,1);

            //process end

            var ans = JSON.stringify(obj)

            fs.writeFileSync(__dirname + "/" + "users.json",ans);
     });
})

app.post('/removeall',function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    console.log("accessed")
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data){
        var obj = JSON.parse(data); 
        var cartarr = obj[0].cart;
        var sizearr = obj[0].sizes; 

        cartarr.splice(0,cartarr.length)
        sizearr.splice(0,sizearr.length)

        var ans = JSON.stringify(obj)

        fs.writeFileSync(__dirname+"/"+"users.json",ans) ; 
    });
})




var server = app.listen(8085, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })