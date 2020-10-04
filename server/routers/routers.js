const { getAllGroups } = require('../controllers/groupsController');
const { saveMembers } = require('../controllers/membersController');
const { processParameters } = require('../controllers/parametersController');

const { mainGroup } = require('../controllers/copy_data/createGroupsController');


const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json());

app.get('/groups/:id', (req, res) => {

    const id = req.params.id;

    getAllGroups(id, (err, data) => {
        if (err) {
            console.log('ERROR : ', err);
            return res.status(400).json({
                ok: false,
                err: err.message
            });
        }
        res.json({
            ok: true,
            message: "success, income groups"
        });
    });
});

app.get('/members/:id', (req, res) => {

    const id = req.params.id;

    saveMembers(id, (err, data) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err.message
            });
        }
        res.json({
            ok: true,
            message: "success, income members"
        });
    });

});


app.post('/encrypt', (req, res) => {

    if (!req.body || !req.body.id || !req.body.name || !req.body.token) {
        return res.status(400).json({
            ok: false,
            err: 'undefined body'
        });
    }

    processParameters(req.body.id, req.body.name, req.body.token, (err) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            message: "succes, entered parameters"
        })

    });

});


app.post('/prueba', (req, res) => {

    if (!req.body) {

        return res.status(400).json({
            ok: false,
            err: 'undefined body'
        });

    }

    mainGroup(req.body, (err, data) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err: err.message
            });
        }

        res.json({
            ok: true,
            message: `succes, create group`,
            group_id: data.group_id,
            respUpdate: data.restatusUpdate
        })

    });

});

module.exports = app;