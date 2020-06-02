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
// const server = http.createServer((req, res)=> { //req客户端传来的流对象，res服务端传回的流对象
//     const url = req.url
//     const filepath = path.join(conf.root, url);
//     // console.log(filepath)
//     route(req, res, filepath)
//     // try {
//     //     const stats = await stat(filepath)

//     //     if(stats.isFile()) {
//     //         res.statusCode = 200;
//     //         res.setHeader('Content-Type', 'text/plain');
//     //         fs.createReadStream(filepath).pipe(res);
//     //         // res.end(filepath)
//     //     } else if(stats.isDirectory()) {
//     //         fs.readdir(filepath, (err, files)=>{
//     //             res.statusCode = 200;
//     //             res.setHeader('Content-Type', 'text/plain');
//     //             res.end(files.join(','))
//     //         })
//     //     }
//     // } catch(ex) {
//     //     res.statusCode = 404;
//     //     res.setHeader('Content-Type', 'text/plain');
//     //     res.end(`${filepath} is not a directory or file`);
//     //     return
//     // }

//     /* 6-3 */
//     // fs.stat(filepath, (err, stats)=>{
//     //     if(err) {
//     //         res.statusCode = 404;
//     //         res.setHeader('Content-Type', 'text/plain');
//     //         res.end(`${filepath} is not a directory or file`);
//     //         return
//     //     }
//     //     if(stats.isFile()) {
//     //         res.statusCode = 200;
//     //         res.setHeader('Content-Type', 'text/plain');
//     //         fs.createReadStream(filepath).pipe(res);
//     //         // res.end(filepath)
//     //     } else if(stats.isDirectory()) {
//     //         fs.readdir(filepath, (err, files)=>{
//     //             res.statusCode = 200;
//     //             res.setHeader('Content-Type', 'text/plain');
//     //             res.end(files.join(','))
//     //         })
//     //     }
//     // })

//     /* 6-1 HTML格式 */
//     // res.statusCode = 200;
//     // res.setHeader('Content-Type', 'text/html');
//     // res.end(filepath)
//     // res.write('<html>')
//     // res.write('<body>')
//     // res.write('hello HTTP!')
//     // res.write('</body>')
//     // res.end('</html>')
// })

// server.listen(conf.port, conf.hostname, ()=>{
//     const addr = `http://${conf.hostname}:${conf.port}`;
//     console.info(`server started at ${chalk.green(addr)}`);
    
// }) 