const checkEmailForm = (email) => {
  const emailCheck = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  if (!emailCheck.test(email)) {
    return false;
  }
  else {
    return true;
  }
}

module.exports = checkEmailForm