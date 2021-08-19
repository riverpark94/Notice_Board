const Users = require('../../models');


module.exports = {
  post : (req, res) =>{
    console.log(req.body);
    const { email, nickname, password } = req.body;

    if( !email || !nickname  || !password) {
      res.status(400).send("not enough user information.");
    }
  }
}