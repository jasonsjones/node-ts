import config from './config/config';
import app from './config/app';

app.listen(config.port, () => {
    console.log('node (typscript) server listening on port ' + config.port);
});
