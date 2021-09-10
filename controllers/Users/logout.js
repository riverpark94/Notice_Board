const { Users } = require('../../models');
const secretObj = require("../../config/jwt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();


module.exports = {
  post : async (req, res) =>{
    res.clearCookie("sid");
    res.status(205).send("logged out success");
  }
}