const { Users } = require('../../models');
const checkPassword = require("../../middlewares/CheckPassword");
const checkEmailForm = require("../../middlewares/CheckEmailForm");
const crypto = require('crypto');


require('dotenv').config();

module.exports = {
  post : async (req, res) =>{
    const { email, nickname, password } = req.body;

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
      const createSalt = () => 
        new Promise ((resolve, reject) => {
          crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
          })
        })

      const createHashedPassword = (pass) => 
        new Promise(async (resolve, reject) =>{
          const salt = await createSalt();
          crypto.pbkdf2(pass, salt, 1009, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ hashpaw: key.toString('base64'), salt })
          });
        });

      const { hashpaw, salt } = await createHashedPassword(password);
      
      await Users.findOrCreate({
        where : {
          email
        },
        defaults: {
          nickname, 
          password : hashpaw,
          salt:salt
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