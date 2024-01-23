var express = require('express')
var bodyParser = require('body-parser')
var jsonparser = bodyParser.json();
var app = express();
var fs = require("fs");
const cors = require('cors')
const connect = require('./rabbitmq')
const { MongoClient,ObjectId} = require('mongodb');;
const webPush = require('web-push');

const  amqp = require('amqplib')
const url =
  "mongodb+srv://allen:node123@cluster0.ahteng1.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'store'
const client =  new MongoClient(url);

const http = require('http');
const WebSocket = require('ws');


  
  // Create a WebSocket server by passing the HTTP server as a parameter
  const wss = new WebSocket.Server({ port:3001 });



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
            const checkExist = await collection.findOne({email:email,password:password,customer:customer});
            if(checkExist){
                res.send("Data Already Exists")
            }else{
                const result =await collection.insertOne(query);
                if(result){
                    result.message = "Data Inserted"
                    res.json(result)
                    //res.send("Data Inserted")
                }
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
            }else{
                console.log("not found")
                res.json({})
            }
    }finally{
        await client.close();
    }
    
})

async function findUserById(userId, db) {
    const usersCollection = db.collection('users');
  
    // Replace 'userIdField' with the actual field in your user documents
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    console.log(userId,user)
    return user;
  }

app.post("/storeShoes",jsonparser,async(req,res)=>{
    try{
            console.log("connecting.....")
            await client.connect();
            console.log("connected")
            const database = client.db("store");
            var collection = database.collection("shoes");
            const dataToInsert = req.body;
            console.log(dataToInsert)
            const result = await collection.insertOne(req.body);
            const insertedID = result.insertedId
            if(result){

                const user = await findUserById(dataToInsert.poster,database)
                collection = database.collection("users")
                if(!user.PostShoes){
                    await collection.updateOne(
                        {_id:new ObjectId(dataToInsert.poster)},
                        {$set:{PostShoes:[]}}
                    )
                }
                const result = await collection.findOneAndUpdate(
                    { _id: new ObjectId(dataToInsert.poster) }, // Find user by ID
                    { $push: { PostShoes: insertedID } }, // Add newItem to the PostShoes field
                    { returnDocument: 'after' } // Return the updated document
                  );

                console.log(res.statusCode);
                
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
        console.log("body is ",req.body);
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
        }else{
            const response = await collection.findOne({_id: new ObjectId(id),"cart":{$elemMatch:{"shoeid":shoeid,"size":size}}})  
            if(response){
                res.send("Shoes already in cart")
                return ;
            }
        }

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

app.post("/changeAmount/:userid/:shoeid/:amount",async(req,res)=>{
    try{
        await client.connect();
        const db = client.db("store")
        const collection = db.collection("users")
        const {userid,shoeid,amount} = req.params;
        console.log(userid, shoeid, amount);
        // const user = await collection.findOne({_id: new ObjectId(userid)})
        const filter = { "_id": new ObjectId(userid), "cart.id":shoeid };
        const updateOperation = {
            $set: { "cart.$.count": parseInt(amount) }
        };
        await collection.findOneAndUpdate(
            filter,
            updateOperation,
            {returnDocument:'after'}
            ,(err,result)=>{
                if(err){
                    console.error('Error connecting to the database:', err);
                    return;
                }
                console.log(result)
            }
        )
        
    }finally{
        await client.close();
    }
})



async function publishNotification (item){
    return new Promise(async(res,rej)=>{
        // WebSocket connection handling
        console.log(res);
            wss.on('connection', (ws) => {
                console.log('Client connected');
                // Listen for messages from clients
                wss.on('message', async() => {
                    await client.connect();
                    const db = client.db("store")
                    const collection = db.collection("users")
                    var cursor = collection.find({customer:true})
                    cursor.array.forEach(element => {
                        console.log(element);
                    });
                });
                // Handle connection close
                ws.on('close', () => {
                console.log('Client disconnected');
                });
            });
    })
}


async function publishShoeUpload(shoeDetails) {
  const connection = await amqp.connect('amqp://127.0.0.1');
  const channel = await connection.createChannel();

  const exchangeName = 'shoe_upload_exchange';
  const routingKey = 'nike';

  // Declare the exchange
  await channel.assertExchange(exchangeName, 'direct', { durable: true });

  // Publish the shoe details to the exchange
  const message = JSON.stringify(shoeDetails);
  channel.publish(exchangeName, routingKey, Buffer.from(message));

  console.log(`Shoe uploaded: ${shoeDetails.brand} ${shoeDetails.model}`);

  // Close the connection
  await channel.close();
  await connection.close();
}


async function setupShoeUploadConsumer() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();
  
    const exchangeName = 'shoe_upload_exchange';
    const queueName = 'nike_shoe_queue';
    const routingKey = 'nike';
  
    // Declare the exchange
    await channel.assertExchange(exchangeName, 'direct', { durable: true });
  
    // Declare the queue
    const queue = await channel.assertQueue(queueName, { durable: true });
  
    // Bind the queue to the exchange with the specified routing key
    await channel.bindQueue(queue.queue, exchangeName, routingKey);
    
    // Consume messages from the queue
    channel.consume(queue.queue, async (msg) => {
        const shoeDetails = JSON.parse(msg.content.toString());
        console.log("shoeDeatils are ",shoeDetails)
        await publishNotification(shoeDetails);
        //console.log(`Received shoe upload: ${shoeDetails.brand} ${shoeDetails.model}`);
    }, { noAck: true });
  
    console.log('Shoe upload consumer is listening...');
  
    // Close the connection
    // Note: In a real application, the consumer would typically keep running.
    // You may want to handle graceful shutdowns and error handling.
    // This example closes the connection after a short delay for demonstration purposes.
    setTimeout(async () => {
      await channel.close();
      await connection.close();
    }, 5000);
  }
  
  // Start the shoe upload consumer
//setupShoeUploadConsumer();



//In your e-commerce application, when a consumer empties their cart, publish a message to RabbitMQ to notify the inventory management system.

const emptyCartAndNotifyInventory = async (userId, cartItems) => {
    // const { connection, channel } = await connect();
    
  
    try {

        const connection = await amqp.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();

      const exchange = 'inventory';
      const routingKey = 'cart.emptied';
  
      await channel.assertExchange(exchange, 'direct', { durable: false });
      await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify({ userId, cartItems })));
  
      console.log(`Notification sent: Cart emptied for user ${userId}`);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error publishing message to RabbitMQ:', error.message);
    } finally {
      
    }
};



function removeInventories(cartItemId,userid){

    // return new Promise(async(resolve,reject)=>{
       
    //     await client.connect();
    //     const db = client.db("store")
    //     const Usercollection = db.collection("users")
    //     const Shoescollection = db.collection("shoes")
    //     await Shoescollection.deleteOne({_id:new ObjectId(cartItemId)},(err,res)=>{
    //         if(err)throw err; 
    //         console.log(res)
    //     })
    //     await Usercollection.findOneAndUpdate(
    //         {_id: new ObjectId(userid)},
    //         {$pull: {"cart":{"shoeid":cartItemId}}},
    //         (err,result)=>{
    //             if(err) throw err;
    //             console.log("Removed from ",userid);
    //         }
    //     )
    //     client.close();
    // })
}
const setupInventorySubscriber = async () => {
    
    try {
        const connection = await amqp.connect('amqp://127.0.0.1');
        const channel = await connection.createChannel();

        const exchange = 'inventory';
        const routingKey = 'cart.emptied';
            
        await channel.assertExchange(exchange, 'direct', { durable: false });
        const queue = await channel.assertQueue('', { exclusive: true });
        await channel.bindQueue(queue.queue, exchange, routingKey);
    
        console.log('Inventory subscriber waiting for notifications...');
        
        await client.connect();
        const db = client.db("store")

        channel.consume(queue.queue, (msg) => {
            const { userId, cartItems } = JSON.parse(msg.content.toString());
            console.log(`Received notification: Cart emptied for user ${userId}. Cart items: ${cartItems}`);
            
            const promises = cartItems.map(obj=>removeInventories(obj.shoeid,userId)  )
            
            Promise.all(promises).then(res=>{
                    res.forEach(result=>{
                        console.log(result);
                    })
            }).catch(err=>{
                console.log(err);
            })
            // Perform inventory management actions here...
        }, { noAck: true });
    } catch (error) {
      console.error('Error setting up inventory subscriber:', error.message);
    }finally{
        //await client.close();
    }
};
//setupInventorySubscriber();
module.exports = app;
var server = app.listen(8085, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })

 // for testing

