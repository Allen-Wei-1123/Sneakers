// app.test.js

const request = require('supertest');
const app = require('./server');

describe('POST /users', () => {
  it('responds with 200 after correct user login', async () => {
    const user = {
      email: 'allen',
      password: 'node123',
    };

    // Using supertest to send a POST request to the /users endpoint
    const response = await request(app)
      .post('/login')
      .send(user);

      expect(response.status).toBe(200);
    // expect(response.status).toBe(201);
    // expect(response.body).toEqual({ id: expect.any(Number), ...user });
  });

  it('responds with Error after incorrect user login, user dont exist',async()=>{
    const user = {
      email:'allen1',
      password:'node123'
    }
    const response = await request(app).post('/login').send(user);
    expect(response.body).toEqual({})
  })

  it('responds with success after correct user registration',async()=>{
    const user = {
      email:'allen9',
      password:'node1234',
      customer:false
    }
    const response = await request(app).post('/register').send(user);
    const lastInsertedItemId = response.body.insertedId;
    //expect(response.body.message).toEqual("Data Inserted")

    // afterAll(async()=>{
    //   const { MongoClient, ObjectId } = require('mongodb');
    //   const client = new MongoClient('http://127.0.0.1:8085', { useNewUrlParser: true, useUnifiedTopology: true });

    //   try {
    //     await client.connect();
    //     const database = client.db('store');
    //     const collection = database.collection('users');

    //     // Remove the last inserted item based on its ID
    //     await collection.deleteOne({ _id: new ObjectId(lastInsertedItemId) });
    //   } finally {
    //     await client.close();
    //   }
    // })
  })

  it('responds with error after correct user registration but account already exists',async()=>{
    const user = {
      email:'allen9',
      password:'node1234',
      customer:false
    }
    const response = await request(app).post('/register').send(user);
    // console.log(response);
    expect(response.text).toEqual("Data Already Exists")
  })
  describe("add shoes to cart and then delete",()=>{
      it('responds with adding shoes to cart',async()=>{
        //should check for shoeid and size
          const query = {
            "id": "65793c71b22a8e8fdfd4a5a6",
            "count": 1,
            "name": "Nike AF1 Offwhite Black",
            "size": "11.5",
            "price": "3000",
            "shoeid": "657a5781df0af914f8d1ffdf",
            "img": "https://firebasestorage.googleapis.com/v0/b/shoes-b9857.appspot.com/o/Nike%20AF1%20Offwhite%20Black?alt=media&token=29450f80-577c-4cd7-83cd-49ffff87b1cf"
        }
        const response = await  request(app).post('/addCart/').send(query);
        expect(response.status).toEqual(200);
        //expect(response.text).toEqual("Shoes already in cart")
      },10000)
      it('responds to delete item from cart',async()=>{
       const response = await request(app).delete(`/deleteItem/${"65793c71b22a8e8fdfd4a5a6"}/${"657a5781df0af914f8d1ffdf"}`)
        expect(response.status).toEqual(200);  
    })
  })
  
  it('responds to shoes amount update',async()=>{

  })

  
  // You can add more test cases for handling errors, validation, etc.
});
