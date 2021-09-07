const express = require('express');
const router = express.Router();

const checkToken = require('../middlewares/checkToken');
const { userController, myPageController } = require('../controllers');


router.get('/', (req, res) => {
  res.send("Site access success");
});

router.post('/user/join', userController.join.post);
router.post('/user/login', userController.login.post);

router.use(checkToken);
router.post('/user/logout', userController.logout.post);
router.get('/user/myPage', myPageController.myPage.get);
router.put('/user/myPage', myPageController.editUserInfo.put);




module.exports = router;