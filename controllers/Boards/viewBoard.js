const { Boards } = require('../../models');

module.exports = {
  get : async (req, res) =>{
    const { id } = req.params;

    Boards.findAll({
      where : {
        id      
      }
    }).then(data => {
        res.status(200).send(data)
    })
  }
}
