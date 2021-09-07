const jwt = require('jsonwebtoken');
let secretObj = require("../config/jwt");

const checkToken = (req, res, next) => {
  // console.log("[req.cookies] : ", req.headers.cookie.split("=")[1]);

  const cookie = req.headers.cookie;
  const secret = secretObj.secret;

  if (!cookie){
    res.status(401).json({
      success:false,
      message:'unvaild token'
    })
  }

  const token = cookie.split("=")[1];
  const check = new Promise((resolve, reject) =>{
    jwt.verify(token, secret, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    })
  })

  check.then(user => {
    req.user = user;
    console.log("[user] :", req.user)
    next();
  }).catch(err => {
      res.status(401).json({
        success: false,
        message: err
      })
  })
}

module.exports = checkToken