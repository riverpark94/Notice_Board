const { Users } = require('../../models');
const secretObj = require("../../config/jwt");
const crypto = require('crypto');
require('dotenv').config();


module.exports = {
  post : async (req, res) =>{
    const {email, password} = req.body
    const secret = secretObj.secret;

    const userInfo = await Users.findOne({
      where : {
        email
      } 
    });

    if(!userInfo) {
      res.status(403).send("Non-Existent User.");
      return;
    }
  }
}