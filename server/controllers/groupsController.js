const axios = require('../axios/instance');
const Group = require('../models/group');

const getGroups = async(url, callback) => {
    try {
        const resp = await axios.getInstance(url);
        const data = resp.data.data;
        const next = resp.data.paging.next;
        callback(null, {
            data,
            next
        });
    } catch (err) {
        callback(err);
    }
};

const getAllGroups = async(callback) => {
    let url = `https://graph.workplace.com/community/groups?fields=id,name,privacy,purpose,cover,description,icon,owner,post_requires_admin_approval,post_permissions,join_setting`;;
    try {
        let array = [];
        let cicle = 1;
        do {
            console.log(`Ciclo: ${cicle}`);
            await getGroups(url, (err, data) => {
                if (err) {
                    console.log('throw new Error(err);');
                    throw err;
                }
                array = array.concat(data.data);
                url = data.next;

            })
            cicle++;
            // } while (url)
        } while (cicle < 1)

        //console.log(array);

        // await saveGroups(array);

        callback(null, array);
    } catch (err) {
        console.log(err);
        callback(err);
    }
}

const saveGroups = (groups) => {
    for (let i = 0; i < groups.length; i++) {
        let group = new Group({
            id_group: groups[i].id,
            name: groups[i].name,
            privacy: groups[i].privacy,
            purpose: groups[i].purpose,
            cover: {
                cover_id: groups[i].cover.cover_id,
                offset_x: groups[i].cover.offset_x,
                offset_y: groups[i].cover.offset_y,
                source: groups[i].cover.source,
                id: groups[i].cover.id,
            }
        });

        group.save((err, groupDB) => {
            if (err) {
                console.log('error al salvar');
                console.log(err);
            } else {
                console.log('save OK');
            }
        });
    }
}

module.exports = {
    getAllGroups
}