const { Boards } = require('../../models');
const { Users } = require('../../models');

module.exports = {
  put : async (req, res) =>{
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
      const {title , content} = req.body;
      
      if(!title && !content){
        Boards.update({},{
          where : { id }
        })
        .then (data => {
          console.log(data)
          res.status(200).send(data)
        })
      }
      else if(title && content) {
        Boards.update({
          title, content
        },{
          where : { id }
        })
        .then (data => {
          console.log(data)
          res.status(200).send(data)
        })
      }
      else {
        if (!title) {
          Boards.update({
            content
          },{
            where : { id }
          })
          .then (data => {
            console.log(data)
            res.status(200).send(data)
          })
        }
        else if (!content) {
          Boards.update({
            title
          },{
            where : { id }
          })
          .then (data => {
            console.log(data)
            res.status(200).send(data)
          })
        }
      }
    }
  }
}
