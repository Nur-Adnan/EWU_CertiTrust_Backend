const { Magic } = require("@magic-sdk/admin");

const magic = new Magic(process.env.AUTH_KEY);

module.exports = magic;
