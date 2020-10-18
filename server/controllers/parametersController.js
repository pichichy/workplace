require('../config/config');
const { encrypt, decrypt } = require('../util/crypto');
const { insertParameters } = require('../database/database');

const processParameters = async(id, name, token, callback) => {
    try {
        const data = encrypt(token);

        await insertParameters(id, name, data, (err) => {
            if (err) {

                callback(err);
            } else {
                decrypt(data);
                callback(null);
            }
        })

    } catch (err) {
        callback('error process parameters');
    }

}

module.exports = {
    processParameters
}