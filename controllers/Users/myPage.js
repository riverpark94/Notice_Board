const { Users } = require('../../models');

require('dotenv').config();

module.exports = {
  get : async (req, res) =>{
    console.log(req.user);
    const email = req.user;

    Users.findOne({
      where : {email}
    })
    .then(data => {
      res
        .status(201)
        .send({
          user : {
            email : data.email,
            nickname : data.nickname
          }
        })
    })


  }
}