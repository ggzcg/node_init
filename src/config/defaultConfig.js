module.exports = {
    root: process.cwd(),
    // root: 'E:/my_program/webApp/node_demo/08_path.js',
    hostname : '127.0.0.1',
    port: 9527,
    compress: /\.(html|js|css|md)/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        etag: true
    }
}