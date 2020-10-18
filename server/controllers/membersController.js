const { getInstance } = require('../axios/instance');
const { decrypt } = require('../util/crypto');
const { selectToken, selectAllIdGroups, selectParameters, insertGroupMembersBd, deleteMembersByGroup } = require('../database/database');

const getMembers = async(id, id_instance, token) => {
    const url = `https://graph.facebook.com/${id}/members?fields=name,id,administrator,moderator,email`;
    const resp = await getInstance(url, token);
    const members = resp.data.data;

    return {
        id,
        id_instance,
        members
    };
};

const promiseMembers = async(group, id_instance, token) => {

    let promises = [];

    for (const data of group) {
        promises.push(getMembers(data.id, id_instance, token));
    }

    return new Promise((resolve, reject) => {
        Promise.all(promises)
            .then((res) => {
                for (const members of res) {
                    insertGroupMembersBd(members);
                }
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

const saveMembers = async(id_instance, callback) => {

    try {
        const data = await selectParameters(id_instance);
        if (!data) {
            throw new Error('error querying parameters')
        }
        const token = decrypt(data);
        await deleteMembersByGroup(id_instance);
        const groups = await selectAllIdGroups();
        console.log(`Cantidad de grupos a procesar: ${groups.length}`);

        await promiseMembers(groups, id_instance, token);
        callback(null, 'FIN');
    } catch (err) {
        console.log(err);
        callback(err);
    }

}

const saveMembers22 = async(callback) => {
    const range = 100;
    let init = 0;
    let end = init + range;
    let continueLoop = true;

    const token = await selectToken(1);
    const groups = await selectAllIdGroups();
    console.log(`Cantidad de grupos a procesar: ${groups.length}`);

    do {
        console.log(`desde ${init} hasta ${end}`);
        const result = await promiseMembers(groups, token, init, end);

        if (end == groups.length) {
            continueLoop = false;
        } else {
            init = end;
            end = end + range;
            if (end > groups.length) {
                end = groups.length;
            }
        }

    } while (continueLoop)

    callback(null, 'OK');
}


module.exports = {
    saveMembers
}