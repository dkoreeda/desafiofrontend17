const express = require('express');
const app = express();

app.use(express.static('build'));

const PORT = process.env.port || 8080;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log('alive on port', PORT);
})
