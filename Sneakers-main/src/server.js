var express = require('express')
var bodyParser = require('body-parser')
var jsonparser = bodyParser.json();
var app = express();
var fs = require("fs");
const cors = require('cors')
const connect = require('./rabbitmq')
const { MongoClient,ObjectId} = require('mongodb');;
const  amqp = require('amqplib')
const url =
  "mongodb+srv://allen:node123@cluster0.ahteng1.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'store'
const client =  new MongoClient(url);

app.use(cors())
app.use(jsonparser);
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/register', jsonparser,async(req,res)=>{
    try{
            await client.connect();
            const database = client.db("store");
            const collection = database.collection("users");
            const dataToInsert = req.body;
            const {email,password,customer} = req.body;
            var query = {}
            if(customer){
                query = {email:email,password:password,customer:customer,cart:[]}
            }else{
                query = {email:email,password:password,customer:customer,shoes:[]}
            }
            const result = await collection.insertOne(dataToInsert);
           if(result){
            console.log(result);
            res.json(result)
           }
        }finally{await client.close();        }
})

app.post('/login',jsonparser ,async(req,res)=>{
    try{
            console.log("connecting.....")
            await client.connect();
            console.log("connected")
            const database = client.db("store");
            const collection = database.collection("users");
            const dataToInsert = req.body;
            console.log(dataToInsert)
            const result = await collection.findOne(dataToInsert);
            if(result){
                console.log(result)
                res.json(result);
            }
    }finally{
        await client.close();
    }
    
})


app.post("/storeShoes",jsonparser,async(req,res)=>{
    try{
            console.log("connecting.....")
            await client.connect();
            console.log("connected")
            const database = client.db("store");
            const collection = database.collection("shoes");
            const dataToInsert = req.body;
            console.log(dataToInsert)
            const result = await collection.insertOne(req.body);
            if(result){
                console.log(result)
                res.json(result);
            }
    }finally{
        await client.close();
    }
   
})

app.get("/findShoes",jsonparser,async(req,res)=>{
    try{
        console.log("connecting /findShoes.....")
        await client.connect();
        console.log("connected /findShoes.....")
        const database = client.db("store");
        const collection = database.collection("shoes");
        console.log("finding shoes...")
        const result = await collection.find({}).toArray();
        if(result){
            console.log(result);
            res.json(result);
        }

    }  finally{
        await client.close();
    } 
})
app.get("/getCartItems/:id1",async(res,req)=>{
        const userid = res.params.id1
    try{
        
        console.log("connecting 1getcart...")
        await client.connect();
        console.log("connected 2getcart...")
        // console.log("userid is ",userid);
        const db = client.db("store")
        const collection = db.collection("users")
        const result = await collection.findOne({_id:new ObjectId(userid)})
        console.log(result);
        if(result){
             req.json(result);
        }
    }finally{
        await client.close();
    }
})


app.get("/shoes/:id",async(req,res)=>{
    try{
        console.log("connecting shoes/id...")
        await client.connect();
        console.log("connected shoes/id...")
        const shoeid = req.params.id;
        console.log(shoeid);
        const database = client.db("store")
        const collection = database.collection("shoes")
        const result = await collection.findOne({_id: new ObjectId(shoeid)});
        if(result){
            res.json(result);
        }
    }finally{   
        await client.close();
    }
})

app.post("/addCart",jsonparser,async(req,res)=>{
    try{
        await client.connect();
        console.log(req.body);
        const {id,count,size,price,shoeid} = req.body;
        console.log(req.body);
        const database = client.db("store")
        const collection = database.collection("users")
        // Check if the user has a cart field
        console.log(id)
        const user = await collection.findOne({ _id: new ObjectId(id) });
        console.log(user);
        if (!user.cart) {
            // If the cart field doesn't exist, create it and set it to an empty array
            console.log("not exists")
            await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { cart: [] } }
            );
        }
        console.log(" exists")
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) }, // Find user by ID
            { $push: { cart: req.body } }, // Add newItem to the cart field
            { returnDocument: 'after' } // Return the updated document
          );
          if(result){
            console.log(result);
          }
        
    }finally{
        await client.close();
    }
})


app.post("/emptyCart",jsonparser,async(req,res)=>{
    try{
        
        await client.connect();
        const db = client.db("store")
        const collection = db.collection("users")
        const {id,date,data} = req.body;
        const user = await collection.findOne({_id: new ObjectId(id)})
        if(!user.History){
            await collection.updateOne(
                {_id:new ObjectId(id)},
                {$set:{History:[]}}
            )
        }
        const result = await collection.findOneAndUpdate(
            {_id:new ObjectId(id)},
            {$push:{History:{id:id,date:date,data:data}}},
            {returnDocument:'after'}
        )
        if(result) {
            res.json(result);
            emptyCartAndNotifyInventory(id,data);
        }
    }finally{
        await client.close();
    }
})


//In your e-commerce application, when a consumer empties their cart, publish a message to RabbitMQ to notify the inventory management system.

const emptyCartAndNotifyInventory = async (userId, cartItems) => {
    // const { connection, channel } = await connect();
    
  
    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();

      const exchange = 'inventory';
      const routingKey = 'cart.emptied';
  
      await channel.assertExchange(exchange, 'direct', { durable: false });
      await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({ userId, cartItems })));
  
      console.log(`Notification sent: Cart emptied for user ${userId}`);
    } catch (error) {
      console.error('Error publishing message to RabbitMQ:', error.message);
    } finally {
      await channel.close();
      await connection.close();
    }
};
const setupInventorySubscriber = async () => {
    
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
   
      const exchange = 'inventory';
      const routingKey = 'cart.emptied';
        
      await channel.assertExchange(exchange, 'direct', { durable: false });
      const queue = await channel.assertQueue('', { exclusive: true });
      await channel.bindQueue(queue.queue, exchange, routingKey);
  
      console.log('Inventory subscriber waiting for notifications...');
  
      channel.consume(queue.queue, (msg) => {
        const { userId, cartItems } = JSON.parse(msg.content.toString());
        console.log(`Received notification: Cart emptied for user ${userId}. Cart items: ${cartItems}`);
  
        // Perform inventory management actions here...
      }, { noAck: true });
    } catch (error) {
      console.error('Error setting up inventory subscriber:', error.message);
    }
};
setupInventorySubscriber();

var server = app.listen(8085, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })