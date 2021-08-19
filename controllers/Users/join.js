const Users = require('../../models');


module.exports = {
  post : (req, res) =>{
    console.log(req.body);
    const { email, nickname, password } = req.body;
    // console.log("[nickname 길이] : ", nickname.length)

    if( !email || !nickname  || !password) {
      res.status(400).send("not enough user information.");
    }
    else if (nickname.length > 10) {
      res.status(403).send("make nickname less than 10 characters.");
    }
  }
}