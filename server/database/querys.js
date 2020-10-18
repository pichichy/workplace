const DELETE_GROUPS = 'DELETE FROM grupo';
const DELETE_MEMBERS = 'DELETE FROM group_members where id_instance = $1';
const INSERT_GROUP = 'INSERT INTO grupo (id, grupo, imagen) VALUES($1, $2, $3)';
const SELECT_TOKEN = 'SELECT  token FROM parametros WHERE id_empresa = $1';
const INSERT_MEMBERS = 'INSERT INTO miembros(id_group, members) VALUES ($1, $2)';
const UPDATE_GROUP = 'UPDATE grupo SET members = $1 WHERE ID = $2';
const INSERT_GROUP_MEMBERS = 'INSERT INTO group_members(id_group, members, id_instance) VALUES ($1, $2, $3)';

//TABLE PARAMETERS
const INSERT_PARAMETERS = 'INSERT INTO parameters (id, name, value) VALUES ($1, $2, $3)';
const SELECT_PARAMETERS = 'SELECT ID, NAME, VALUE FROM parameters WHERE ID = $1';


module.exports = Object.freeze({
    DELETE_GROUPS,
    INSERT_GROUP,
    SELECT_TOKEN,
    INSERT_MEMBERS,
    DELETE_MEMBERS,
    UPDATE_GROUP,
    INSERT_GROUP_MEMBERS,
    INSERT_PARAMETERS,
    SELECT_PARAMETERS
});