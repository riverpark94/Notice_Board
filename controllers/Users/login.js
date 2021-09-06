const { Users } = require('../../models');
const secretObj = require("../../config/jwt");
const jwt = require("jsonwebtoken");
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
        const dbSalt = userInfo.dataValues.salt
    const dbPass = userInfo.dataValues.password
    console.log("[salt] : ", dbSalt);
    console.log("[Infopass] : ", password);
    console.log("[dbPass] : ", dbPass);
    console.log("[InfoPassword] :", password)

    const createHashedPassword = (pass) => 
      new Promise(async (resolve, reject) =>{
        crypto.pbkdf2(pass, dbSalt, 1009, 64, 'sha512', (err, key) => {
          if (err) reject(err);
          resolve({ hashpaw: key.toString('base64'), dbSalt })
        });
      });

      console.log(await createHashedPassword(password))

    const {hashpaw} = await createHashedPassword(password);
    console.log("[hashpaw] :", hashpaw)

    if(dbPass !== hashpaw) {
      res.status(403).send("The password is incorrect.");
      return;
    } 
    else{
      const token = jwt.sign(
        email,
        secret,
        // {expiresIn: "7d"}
      );

      res
        .cookie("sid", token, {
                  maxAge: 1000 * 60 * 60 * 24 * 7, // 7일간 유지
                  httpOnly: true,
                })
        .status(200)
        .send({
          token,
          user : {
            id : userInfo.dataValues.id,
            email,
            nickname : userInfo.dataValues.nickname
          }
        })
    }
  }
}