const { Users } = require('../../models');
const secretObj = require("../../config/jwt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();


module.exports = {
  post : async (req, res) =>{
    console.log("로그아웃 접근")
    res.clearCookie("sid");
    // res.cookie("sid");
    res.status(205).send("logged out success");
  }
}