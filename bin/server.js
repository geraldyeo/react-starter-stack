import debug from 'debug';
import config from '../config';
import server from '../server/main';

const print = debug('app:bin:server');
const port = config.server_port;
const host = config.server_host;

server.listen(port);
print(`Server is now running at ${host}:${port}.`);
