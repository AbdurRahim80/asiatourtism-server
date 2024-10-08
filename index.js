
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// midleware 
app.use(cors());
app.use(express.json());

// wuxPevXUU2ucyl6a


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = "mongodb+srv://asiatourtism:wuxPevXUU2ucyl6a@cluster0.qgxn6jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qgxn6jx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)

    const userCollection = client.db("touristSpotDB").collection("touristSpot");

    app.post('/spot', async(req, res)=>{
        const newSpotList = req.body;
        console.log(newSpotList);
        const result = await userCollection.insertOne(newSpotList);
        res.send(result);
    })


    app.get('/spot', async(req, res)=>{
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/myList/:email', async(req, res)=>{
      console.log(req.params.email);
      const result = await userCollection.find({email: req.params.email}).toArray();
      console.log(result);
      res.send(result);
    })

    app.get('/spot/:id', async(req, res)=>{
      const id = req.params.id;
      const cursor = {_id: new ObjectId(id)};
      const result = await userCollection.findOne(cursor);
      console.log("rest", result);
      res.send(result);
    })

    app.put('/spot/:id', async(req, res)=>{
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};
      const updateSpot = req.body;
      const spot = {
        $set:{
          spot: updateSpot.spot,
          country: updateSpot.country, 
          location: updateSpot.location, 
          AvgConst: updateSpot.AvgConst, 
          seasonality: updateSpot.seasonality, 
          photoUrl: updateSpot.photoUrl, 
          travel_time: updateSpot.travel_time, 
          totalVisitorsPerYear: updateSpot.totalVisitorsPerYear, 
          description: updateSpot.description, 
        }
      }
      const result = await userCollection.updateOne(filter, spot, options);
      console.log(result);
      res.send(result)
    })

    app.delete('/spot/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await userCollection.deleteOne(query)
      res.send(result);
    })

    
    
    // app.get('/allList/:id', async(req, res)=>{
    //   console.log(req.params.id);
    //   const result = await userCollection.find({id: req.params.id}).toArray();
    //   console.log("result", result);
    //   res.send(result);
    // })



    // app.get('/alltouris/:id', async(req,res)=>{
    //   const id = req.params.id;
    //   console.log(id);
    //   const query = {_id: new ObjectId(id)}
    //  const result = await userCollection.findOne(query);
    // // const result = await userCollection.find({email: email}).toArray();
    // //  console.log(result);
    //  res.send(result);
    // })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`server is running port${port}`);
})


