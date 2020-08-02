const express = require('express');
const groupsController = require('../controllers/groupsController');
const app = express();

app.get('/groups', (req, res) => {
    groupsController.getAllGroups((err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err.message
            });
        }
        //console.log('OK');
        res.json(data);
    });
});

module.exports = app;