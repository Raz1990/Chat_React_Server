import * as http from 'http';
import app from './app';

const server = http.createServer(app);
const port = 4000;
server.listen(port, () => console.log('im running on port',port));