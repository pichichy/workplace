require('../config/config');
var constants = require('../database/querys');
const { Pool } = require('pg');

const config = {
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE
};

const pool = new Pool(config);

const selectToken = async(value) => {
    const { rows } = await pool.query(constants.SELECT_TOKEN, [value]);
    return rows[0].token;
}

const deleteGroupsBd = async() => {
    await pool.query(constants.DELETE_GROUPS);
}

const insertGroupBd = async(value, imagen) => {
    //const values = [value.id, JSON.stringify(value), JSON.stringify(newValue)];
    const values = [value.id, JSON.stringify(value), imagen];
    pool.query(constants.INSERT_GROUP, values, (err) => {
        if (err) {
            console.log('err INSERT_GROUP', err);
        }
    });
}

const selectAllIdGroups = async(value) => {
    const { rows } = await pool.query('SELECT id FROM grupo');
    return rows;
}

const update = async(data) => {
    const values = [JSON.stringify(data.members), data.id];
    await pool.query(constants.UPDATE_GROUP, values, (err) => {
        if (err) {
            console.log('err updateGroupMembers', err);
        }
    });



    // pool.query(constants.UPDATE_GROUP, values)
    //     .then(res => console.log(res.rows[0]))
    //     .catch(e => console.error(e.stack))
}

// const update = async(data) => {

//     return new Promise((resolve, reject) => {

//         const values = [JSON.stringify(data.members), data.id];
//         pool.query(constants.UPDATE_GROUP, values)
//             .then(res => resolve(res))
//             .catch(e => reject(err))
//     });

// }

const insertGroupMembersBd = async(data) => {
    const values = [data.id, JSON.stringify(data.members), data.id_instance];
    await pool.query(constants.INSERT_GROUP_MEMBERS, values, (err) => {
        if (err) {
            console.log('err INSERT_GROUP_MEMBERS', err);
        }
    });
}

const selectAllNewGroups = async(value) => {
    const { rows } = await pool.query('SELECT new FROM grupo');
    return rows;
}


//PARAMETERS
const insertParameters = async(id, name, value, callback) => {
    const values = [id, name, value];
    await pool.query(constants.INSERT_PARAMETERS, values, (err, resp) => {
        if (err) {
            callback('error insertParameters');
        } else {
            callback(null)
        }
    });
}


const selectParameters = async(id) => {
    const values = [id];
    const resp = await pool.query(constants.SELECT_PARAMETERS, values);
    if (resp.rowCount === 0) {
        return null;
    }

    return resp.rows[0].value;
}

const deleteMembersByGroup = async(id_instance) => {
    const values = [id_instance];
    await pool.query(constants.DELETE_MEMBERS, values);
}


// const selectParameters = async(id, callback) => {
//     const values = [id];
//     await pool.query(constants.SELECT_PARAMETERS, values, (err, resp) => {
//         if (err) {
//             callback('error selectParameters');
//         } else {
//             if (resp.rows.length === 0) {
//                 callback('error selectParameters void');
//             } else {
//                 callback(null, resp.rows[0].value)
//             }
//         }
//     });
// }

module.exports = {
    insertGroupBd,
    deleteGroupsBd,
    selectToken,
    selectAllIdGroups,
    update,
    selectAllNewGroups,
    insertGroupMembersBd,
    insertParameters,
    selectParameters,
    deleteMembersByGroup
}