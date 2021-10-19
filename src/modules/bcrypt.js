const bcrypt = require("bcrypt")

async function createCrypt(data) {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(data, salt);
}

async function compareCrypt(data, hash) {
    return await bcrypt.compare(data, hash)
}

module.exports = {
    createCrypt,
    compareCrypt,
}