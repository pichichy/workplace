const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let groupShema = new Schema({

    id_group: { type: String },
    name: { type: String },
    privacy: { type: String },
    purpose: { type: String },
    cover: {
        cover_id: { type: String },
        offset_x: { type: Number },
        offset_y: { type: Number },
        source: { type: String },
        id: { type: String },
    },
    icon: { type: String },
    owner: {
        name: { type: String },
        id: { type: String },
    },
    post_requires_admin_approval: { type: Boolean },
    post_permissions: { type: String },
    join_setting: { type: String }


});

module.exports = mongoose.model('Group', groupShema);