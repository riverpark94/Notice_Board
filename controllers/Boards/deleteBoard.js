const { Boards } = require('../../models');
const { Users } = require('../../models');

module.exports = {
  delete : async (req, res) =>{
    const { id } = req.params;
    const email = req.user;

    const dbUserId = await Users.findOne({
      where : {
        email
      } 
    }).then(data => data.dataValues.id)
    const dbWriterId = await Boards.findOne({
      where : {
        id
      }
    }).then(data => data.dataValues.userId)

    if(dbUserId != dbWriterId) {
      res.status(400).send("You're not the author of this post.");
    }
    else {
      Boards.destroy({
        where : {
          id
        }
      }).then(data =>{
        res.status(205).send("delete post success")
      })
    }
  }
}
