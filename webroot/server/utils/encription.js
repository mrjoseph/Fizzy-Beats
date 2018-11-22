const crypto = require('crypto');

const genRandomString = length => crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);

const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  const value = hash.digest('hex');
  return {
    salt,
    passwordHash: value,
  };
};

const slatHashPassword = (userPassword) => {
  const salt = genRandomString(16);
  const passwordData = sha512(userPassword, salt);
  return passwordData;
};

const unHashPassword = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('hex');
};

// export default slatHashPassword;
module.exports = {
  slatHashPassword: slatHashPassword,
  unHashPassword: unHashPassword,
};

