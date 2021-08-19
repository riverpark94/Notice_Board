const { Users } = require('../../models');
const checkPassword = require("../../middlewares/CheckPassword");
const checkEmailForm = require("../../middlewares/CheckEmailForm");
require('dotenv').config();

module.exports = {
  post : async (req, res) =>{
    console.log(req.body);
    const { email, nickname, password } = req.body;
    // console.log("[nickname 길이] : ", nickname.length)
    // console.log("[checkPassword(password)] : ", checkPassword(password));

    if( !email || !nickname  || !password) {
      res.status(400).send("not enough user information.");
    }
    else if (nickname.length > 10) {
      res.status(403).send("make nickname less than 10 characters.");
    }
    else if (!checkPassword(password)) {
      res.status(403).send("Special Characters or Numbers or English were not included in password.");
    }
    else if (!checkEmailForm(email)) {
      res.status(403).send("Keep e-mail form.");
    }
    else{
      await Users.findOrCreate({
        where : {
          email
        }
      }).then(([data, created]) => {
        if (!created) {
          res.status(402).send("existed email");
        }
        else {
          res.status(201).json(data);
        }
      })
    }
  }
}