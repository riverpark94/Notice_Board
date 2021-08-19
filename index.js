const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())
app.listen(port, () => {
  console.log(`http://localhost:${port} port success`);
})

app.post('/', (req, res, next) => {
  console.log(req.body)
  res.json(req.body)
})