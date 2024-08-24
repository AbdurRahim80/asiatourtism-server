
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// midleware 
app.use(cors());
app.use(express.json());

// wuxPevXUU2ucyl6a






app.get('/', (req, res) => {
    res.send("server is running")
})

app.listen(port, () => {
    console.log(`server is running port${port}`);
})


