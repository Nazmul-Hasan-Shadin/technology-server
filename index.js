const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app= express();
const port=process.env.PORT || 5000;

const cors= require('cors')

// middleware
app.use(cors())
app.use(express.json())



        //   mongodbConnection



const uri = "mongodb+srv://technology-electronics:skn9HUpRVj8rmjnQ@cluster1.wjj4omp.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
  
    await client.connect();
  const database= client.db('BrandProducts').collection('prouct')

            // get all product

   app.get('/products',async(req,res)=>{
     const query= await database.find().toArray();
     res.send(query)
   })      
   
//     find only brand related products

app.get('/products/:id',async(req,res)=>{
    const id=(req.params.id)
    console.log(id);
    const result = await database.find({brand: id}).toArray()
    res.send(result)
})

    //    insert product from admin page

   app.post('/products',async(req,res)=>{
     const data= req.body;
     console.log(data);
     const result=await database.insertOne(data)
     res.send(result)

   })            
   


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }

  app.listen(port,()=>{
    console.log("server is running");
  })
}
run().catch(console.dir);
