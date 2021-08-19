const express = require('express');
const router = express.Router();

const { userController } = require('../controllers');


router.get('/', (req, res) => {
  res.send("Site access success");
});

router.post('/user/join', userController.join.post);

module.exports = router;