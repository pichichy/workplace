require('./config/config')
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(require('./routers/routers'));
app.use(express.json({ limit: '50mb' }));
app.use(require('./routers/routers'));
const port = process.env.PORT;

// mongoose.connect('mongodb://localhost:27017/workplace', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) throw err;
//     console.log('Data Base started in a port ');
// });

app.listen(port, () => {
    console.log(`Server started on port`, port);
});

app.get('/', (req, res) => {
    res.json('hola');
});