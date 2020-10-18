require('../config/config');
const { decrypt } = require('../util/crypto');
const { download } = require('../download-images/image-downloader');
const { getInstance } = require('../axios/instance');
const { insertGroupBd, deleteGroupsBd, selectParameters } = require('../database/database');
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const fs = require('fs');

const ruta = './server/download-images/images/';
const url = `https://graph.workplace.com/community/groups?fields=id,name,privacy,purpose,cover,description,icon,owner,post_requires_admin_approval,post_permissions,join_setting`;

const storage = new Storage({
    projectId: PROJECTID,
    keyFilename: path.join(__dirname, KEYFILENAME)
});

const bucket = storage.bucket(NAMEBUCKET);

const getGroups = async(url, token) => {

    const resp = await getInstance(url, token);
    await saveGroupsPostgres(resp.data.data);
    return resp.data.paging.next;

}

const saveGroupsPostgres = async(groups, token) => {

    for (let i = 0; i < groups.length; i++) {


        //let members = await getMembers(groups[i].id, token);

        //let groupNew = groups[i];
        let gcpCoverSource = '';

        if (groups[i].cover) {
            const imageUrl = groups[i].cover.source;
            const filename = ruta.concat(`${groups[i].id}.jpg`);
            //groupNew.cover.source = `https://storage.googleapis.com/${NAMEBUCKET}/${groups[i].id}.jpg`;
            gcpCoverSource = `https://storage.googleapis.com/${NAMEBUCKET}/${groups[i].id}.jpg`;

            await download(imageUrl, filename, () => {
                bucket.upload(filename, {}, () => {
                    fs.unlinkSync(filename);
                });
            });
        }

        await insertGroupBd(groups[i], gcpCoverSource);
    }

}

const getAllGroups = async(id, callback) => {

    let next = url;
    let cicle = 1;

    try {
        const data = await selectParameters(id);
        if (!data) {
            throw new Error('error querying parameters')
        }
        const token = decrypt(data);

        await deleteGroupsBd();
        do {
            console.log(`Ciclo: ${cicle}`);
            next = await getGroups(next, token);
            cicle++;
        } while (next);

        callback(null);

    } catch (error) {
        callback(error);
    }

}

module.exports = {
    getAllGroups
}