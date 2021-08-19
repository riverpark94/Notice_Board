const checkPassword = (paw) => {
  const paw_num = paw.search(/[0-9]/);
  const paw_eng = paw.search(/[a-zA-Z]/);
  // const paw_ENG = paw.search(/[A-Z]/);

  if (paw_num < 0 || paw_eng < 0) {
    return false;
  }
  else {
    return true;
  }


}

module.exports = checkPassword