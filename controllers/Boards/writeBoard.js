const { Users } = require('../../models');
const { Boards } = require('../../models');

module.exports = {
  post : async (req, res) =>{
    const { title, content } = req.body;

    if(!title||!content) {
      if(!title && !content) {
        res.status(403).send("Please write down the title and content.");
      }
      else if(!title) {
        res.status(403).send("Please write down the title.");
      }
      else if(!content) {
        res.status(403).send("Please write down the content.");
      }
    }
    else{
      const email = req.user;
      const userInfo =await Users.findOne({
        where : {email}
      })
      const dbId = userInfo.dataValues.id;
      const dbNickname = userInfo.dataValues.nickname;

      await Boards.create({
        userId : dbId,
        title : title,
        content : content,
        like : 0
      })
      .then (data => {
        res.status(200).json({
          userId: data.userId,
          user : {
            nickname: dbNickname,
          },
          title : data.title,
          content : data.content,
          like :data.like
        });
      })
    }
  }
}
