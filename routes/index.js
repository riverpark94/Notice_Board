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

router.get('/board', BoardController.getBoards.get);
router.get('/board/search/:search', BoardController.searchBords.get);
router.get('/board/view/:id', BoardController.viewBoard.get);

router.use(checkToken);

router.post('/user/logout', userController.logout.post);
router.delete('/user/withdrawal', userController.withdrawal.delete);

router.get('/user/myPage', myPageController.myPage.get);
router.put('/user/myPage', myPageController.editUserInfo.put);

router.post('/board/write', BoardController.writeBoard.post);
router.put('/board/view/:id/edit', BoardController.editBoard.put);
router.delete('/board/delete/:id', BoardController.deleteBoard.delete);

module.exports = router;