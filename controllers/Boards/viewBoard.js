const { Boards } = require('../../models');
const { Users } = require('../../models');

module.exports = {
  get : async (req, res) =>{
    const { id } = req.params;

    Boards.findAll({
      where : {
        id      
      },
      include : [
        { model : Users, 
          required: true, 
          attributes : {exclude :["id","email","password", "salt", "createdAt", "updatedAt"]} }
      ]
    }).then(data => {
        res.status(200).send(data)
    })
  }
}
