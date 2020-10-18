const axios = require('axios');

const getInstance = async(url, token) => {
    const instance = axios.create({
        url,
        timeout: 0,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const resp = await instance.get();
    return resp;
};

const postInstance = async(url, token, data) => {

    console.log(url);
    console.log(token);
    console.log(data);

    const resp = await axios({
        method: 'POST',
        url,
        data,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    return resp
};

// const url = 'https://graph.workplace.com/community/groups/';
// const token = 'DQVJ0OExjS3FTOE8tWS1yV1UzbjB5YVU1TThlM3FfNVVXN3RaM0txQjBQMUhQQjUtRFplZAzMzRzh6M0FuWDFvOTF5Ujc2WU1sWS1ESW5SRmtMMzZAuWTJ1RUltcHphSHdMRDB4RGNGRnV1R0ZAiWEgxcm44OW1GNzRFb2tKcUh4Yk1CZAEVKZAjdJdDQ1eHhNRzhqWWZAzdnRTUTJXLUh2SGtvOWZA0Nm5sYlAyMVRzbnViLUFvS2VrTWN5WEdCUHNINlM1VTVlWERQcE9Cem9MYk8wQQZDZD'
// const data = {
//     "name": "New Group Name Test ABC"
// }

// postInstance(url, token, data)


module.exports = {
    getInstance,
    postInstance
}