import config from './config/config';
console.log("Hello Node from typescript and express!");

import app from './config/app';

app.listen(config.port, () => {
    console.log('TS node application listening on port ' + config.port);
})
