const fs = require('fs');
const path = require('path')
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const Handlebars = require('handlebars'); 
// const config = require('../config/defaultConfig.js')

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath);
const template = Handlebars.compile(source.toString()) // 服务器文件的套用模板

const mime = require('./mime') //Content-type的类型
const compress = require('./compress') //指定要压缩的文件和压缩方式
const range = require('./range') // 获取文件指定size
const isFresh = require('./cache') // 强缓存和协商缓存

module.exports = async function(req, res, filepath, config) {
    try {
        const stats = await stat(filepath)

        if(stats.isFile()) {
            const contentType = mime(filepath)
            
            res.setHeader('Content-Type', contentType);

            if(isFresh(stats, req, res)) {
                res.statusCode = 304;
                res.end();
                return
            }

            let rs;
            const {code, start, end} = range(stats.size, req, res);
            if(code == 200) {
                res.statusCode = 200;
                rs = fs.createReadStream(filepath);
            } else {
                res.statusCode = 206;
                rs = fs.createReadStream(filepath, {start, end});
            }
            // let rs = fs.createReadStream(filepath); // 如果用读取文件的形式获取数据会非常慢，所以用流
            if(filepath.match(config.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else if(stats.isDirectory()) {
            // const files = await readdir(filepath)
            fs.readdir(filepath, (err, files)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                const dir = path.relative(config.root, filepath)
                let ext_html = [];
                let ext_js = [];
                let ext_css = [];
                let ext_else = [];
                files.map(item=>{
                    if(item.match(/\.(html)/)) {
                        ext_html.push({files:item,icon: mime(item)})
                    } else if(item.match(/\.(js|json)/)) {
                        ext_js.push({files:item,icon: mime(item)})
                    } else if(item.match(/\.(css)/)) {
                        ext_css.push({files:item,icon: mime(item)})
                    } else {
                        ext_else.push({files:item,icon: mime(item)})
                    }
                })
                var files = files.map(item=>{
                    return {
                        files:item,
                        icon: mime(item)
                    }
                })
                const data = {
                    title: path.basename(filepath), 
                    dir: dir?`/${dir}`:'',
                    ext_else,
                    ext_html,
                    ext_js,
                    ext_css
                }
                res.end(template(data))
                // res.end(filepath.join(','))
            })
        }
    } catch(ex) {
        console.error(ex)
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`${filepath} is not a directory or file\n ${ex.toString()}`);
        return
    }
}