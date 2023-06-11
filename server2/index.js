// Import packages
const express = require("express");
const cors = require('cors');
const home = require("./routes/home");
let persons = [];
const api = '/api'
// Middlewares
const app = express();

app.use(cors({
  origin: ['https://hat-ten.vercel.app'],
  methods: ['POST', 'GET'],
  credentials: true,
}))
app.use(express.json());

// Routes
app.use("/home", home);

app.get('/', (req, res) => {
    res.send('Привет!');
});

app.post(`${api}/persons`, (req, res) => {
    const message = req.body;
    console.log(message);
    persons = [...persons, ...message];
    res.send(message);
});

app.get(`${api}/persons`, (req, res) => {

    res.send(persons);
});

// connection
const port = process.env.PORT || 9001;
app.listen(port, () => console.log(`Listening to port ${port}`));
