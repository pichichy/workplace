const { decrypt } = require('../../util/crypto');
const { postInstance } = require('../../axios/instance');
const { insertGroupBd, deleteGroupsBd, selectParameters } = require('../../database/database');


const createGroup = async(token, data) => {

    const url = 'https://graph.workplace.com/community/groups/';


    const info = {
        name: data.name,
        privacy: data.privacy,
        post_permissions: data.post_permissions,
        post_requires_admin_approval: data.post_requires_admin_approval
    }

    const resp = await postInstance(url, token, info);

    console.log('respuesta interna');
    console.log(resp.data.id);

    return resp.data.id;

}

const updateGroup = async(token, data, group_id) => {

    console.log('policia updateGroup');

    let url = `https://graph.workplace.com/${group_id}`

    const info = {
        description: data.description,
        cover_url: data.cover_url,
        join_setting: data.join_setting
    }
    console.log('policia updateGroup 2');

    const resp = await postInstance(url, token, info);

    console.log('respuesta interna updateGroup');
    console.log(resp);

    return resp;

}

const mainGroup = async(data, callback) => {

    try {
        const dataToken = await selectParameters('1');
        if (!dataToken) {
            throw new Error('error querying parameters')
        }

        const token = decrypt(dataToken);
        let group_id = await createGroup(token, data);
        let resp = await updateGroup(token, data, group_id);

        callback(null, {
            group_id,
            restatusUpdate: resp.status
        });

    } catch (error) {
        callback(error);
    }

}

module.exports = {
    mainGroup
}