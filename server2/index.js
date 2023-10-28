// Import packages
const express = require("express");
const cors = require('cors');
const home = require("./routes/home");
const dbRouter = require('./routes/dbRouter');
const db = require('mongoose');

let persons = [];
const api = '/api'
// Middlewares
const app = express();

app.use(cors({
    // origin: ['https://hat-ten.vercel.app'],
    // origin: ['http://localhost:3000'],
    methods: ['POST', 'GET'],
    credentials: true,
}))
app.use(express.json());

// Routes
app.use("/home", home);
app.use(api, dbRouter);

app.get('/', (req, res) => {

    const pp = req.headers
    res.send(pp);
});

// app.post(`${api}/persons`, (req, res) => {
//     const message = req.body;
//     console.log(message);
//     persons = [...persons, ...message];
//     res.send(message);
// });

// app.get(`${api}/persons`, (req, res) => {

//     res.send(persons);
// });

// connection
const port = process.env.PORT || 9001;
const url = 'mongodb+srv://maxemov:O9hY8t2qCxhKAAEY@cluster0.uduxszj.mongodb.net/';
const start = async () => {
    try {
        // db.connect(url, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true
        //  }).then(() => {
            // console.log('Connected to MongoDB');
            app.listen(port, () => console.log(`Listening to port ${port}`));
        //  }).catch((err) => {
        //     console.log('Error connecting to MongoDB: ', err);
        //  });
    } catch (e) {
        console.log('errrrrrrrrrrror')
    }
}

start()