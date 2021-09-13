const { Boards } = require('../../models');
const { Op } = require("sequelize");

module.exports = {
  get : async (req, res) =>{
    const { search } = req.body;

    Boards.findAll({
      where : {
        title : {
                [Op.like]: "%" + search + "%"
            }
      }
    }).then(data => {
        res.status(200).send(data)
    })
  }
}
