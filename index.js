const express = require('express');

require("./models");
const Route = require("./routes/index");


const app = express();
const port = 3000;


app.use(express.json())
app.listen(port, () => {
  console.log(`http://localhost:${port} port success`);
})

app.use(Route);


module.exports = app; 