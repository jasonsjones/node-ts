const debug = require('debug')('node-ts:server');

import config from './config/config';
import app from './config/app';

app.listen(config.port, () => {
    debug(`server listening on port ${config.port}`);
});
