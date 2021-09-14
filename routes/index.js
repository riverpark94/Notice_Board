const express = require('express');
const router = express.Router();

const checkToken = require('../middlewares/checkToken');
const { userController, 
        myPageController, 
        BoardController } = require('../controllers');

router.get('/', (req, res) => {
  res.send("Site access success");
});

router.post('/user/join', userController.join.post);
router.post('/user/login', userController.login.post);
router.get('/board/:search', BoardController.searchBords.get);
router.get('/board/:id', BoardController.viewBoard.get);

router.use(checkToken);

router.post('/user/logout', userController.logout.post);
router.delete('/user/withdrawal', userController.withdrawal.delete);

router.get('/user/myPage', myPageController.myPage.get);
router.put('/user/myPage', myPageController.editUserInfo.put);

router.post('/board/write', BoardController.writeBoard.post);

module.exports = router;