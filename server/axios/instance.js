require('../config/config');
const axios = require('axios');

const getInstance = async(url) => {
    const instance = axios.create({
        url,
        timeout: 0,
        headers: { 'Authorization': `Bearer ${process.env.SECRETTOKEN}` }
    })
    const resp = await instance.get();
    return resp;
};

module.exports = {
    getInstance
}