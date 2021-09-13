const { Boards } = require('../../models');
const { Op } = require("sequelize");

module.exports = {
  get : async (req, res) =>{
    const { search } = req.params;

    Boards.findAll({
      where : {
        [Op.or] : [
          {
            title : {
              [Op.like]: "%" + search + "%"
            }
          }, {
            content : {
              [Op.like]: "%" + search + "%"
            }
          }
        ]          
      },
      order: [['createdAt', 'DESC']]
    }).then(data => {
        res.status(200).send(data)
    })
  }
}
