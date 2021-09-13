const { Users } = require('../../models');

module.exports = {
  delete : async (req, res) =>{
    const { nickname } = req.body;
    const email = req.user;

    Users.destroy({
      where : {
        email
      }
    }).then(data =>{
      res
        .status(205)
        .clearCookie("sid")
        .send("Withdrawal success");
    })
  }
}