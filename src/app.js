const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
// const promisify = require('util').promisify;
// const stat = promisify(fs.stat);
// const readdir = require(fs.readdir);
const conf = require('./config/defaultConfig')

const route = require('./helper/routes')
const openUrl = require('./helper/openurl')

class Server {
    constructor (config) {
        this.conf = Object.assign({}, conf, config);
    }

    start() {
        const server = http.createServer((req, res)=> { //req客户端传来的流对象，res服务端传回的流对象
            const url = req.url
            const filepath = path.join(this.conf.root, url);
            route(req, res, filepath, this.conf)
        })

        server.listen(this.conf.port, this.conf.hostname, ()=>{
            const addr = `http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`server started at ${chalk.green(addr)}`);
            openUrl(addr)
        })
    }
}
module.exports = Server