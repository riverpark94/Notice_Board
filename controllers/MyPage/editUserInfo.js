const { Users } = require('../../models');
require('dotenv').config();

module.exports = {
  put : async (req, res) =>{
    const { nickname } = req.body;
    const email = req.user;

    Users.update({
        nickname
      },{
        where: {email}
      })
      .then(data => {
        console.log(data)
        res.status(200).send(data)
      });
  }
}