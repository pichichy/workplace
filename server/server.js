require('./config/config');
const express = require('express');

const app = express();
app.use(require('./routers/routers'));
app.use(express.json({ limit: '50mb' }));
app.use(require('./routers/routers'));
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server started on port`, port);
});