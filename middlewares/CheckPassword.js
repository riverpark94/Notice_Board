const checkPassword = (paw) => {
  const pawNum = paw.search(/[0-9]/);
  const pawEng = paw.search(/[a-zA-Z]/);
  // const paw_ENG = paw.search(/[A-Z]/);

  if (pawNum < 0 || pawEng < 0) {
    return false;
  }
  else {
    return true;
  }


}

module.exports = checkPassword