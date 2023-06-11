const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const PORT = 5000;

const newPerson = {
  name: '',
}

const createPersons = () => {
  const newPersons = [];
  const countNumber = Number(4);
  for (let i = 0; i < (countNumber > 10 ? 10 : countNumber); i++) {
    newPersons.push({ ...newPerson, name: i });
  }
  return newPersons;
}
let persons = [];
let playPersons = [...persons]
console.log(playPersons);
const getRandomPerson = () => {
  if (playPersons.length === 0) return -1
  const index = Math.floor(Math.random() * playPersons.length);
  const person = playPersons[index].name;
  console.log(person)
  playPersons = playPersons.filter((person, i) => index !== i);
  return person;
}




const api = '/api'

const app = express();
// app.use(cors({
//   origin: ['https://hat-api2.vercel.app/'],
//   methods: ['POST', 'GET'],
//   credentials: true,
// }))
app.use(bodyParser.json());


// app.use(express.static(path.join(__dirname, '../cap/build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/', (req, res) => {
  res.send('Привет!');
});

// app.get(api, (req, res) => {
//   res.send('Сука');
// });

// app.get(`${api}/person`, (req, res) => {
//   const person = getRandomPerson();
//   if (person === -1) {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
//   } else {
//     res.send(`${person}`);

//   }
// });

// app.get(`${api}/persons`, (req, res) => {

//     res.send(persons);
// });

// app.post(`${api}/persons`, (req, res) => {
//   const message = req.body;
//   console.log(message);
//   persons = [...persons, ...message];
//   res.send(message);
// });

// app.post(`${api}/update`, (req, res) => {
//   const message = req.body.message;
//   playPersons = [...persons]
//   const person = getRandomPerson();
//   console.log(`Received message: ${message}`);
//   res.send(`${person}`);
// });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});