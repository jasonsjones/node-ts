import { DbEnv } from './config/enums';
import config from './config/config';
import DbManager from './config/dbmanager';

import app from './config/app';

let dbmanager = new DbManager(DbEnv.DOCKER);

app.listen(config.port, () => {
    console.log('node (typscript) server listening on port ' + config.port);
})
