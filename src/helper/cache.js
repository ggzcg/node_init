const {cache} = require('../config/defaultConfig')

function refreshRes(stats, res) {
    const {maxAge, expires, cacheControl, lastModified, etag} = cache
    // 1.0 服务器返回--强缓存
    if(expires) {
        res.setHeader('Expires', (new Date(Date.now()+ maxAge*1000)).toUTCString()) 
    }
    // 1.1 服务器返回--强缓存
    if(cacheControl) {
        res.setHeader('Cache-control', `puclic, max-age=${maxAge}`)
    }
    // 1.0 服务器返回--协商缓存
    if(lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }
    // 1.1 服务器返回--协商缓存
    if(etag) {
        res.setHeader('ETag', `${stats.size}-${stats.mtime}`)
    }
}
module.exports = function isFresh(stats, req, res) {
    refreshRes(stats, res)
    // 1.0 客户端给与--协商缓存
    const lastModified = req.headers['if-modified-since']
    // 1.1 客户端给与--协商缓存
    const etag = req.headers['if-none-match']

    if(!lastModified && !etag) {
        return false
    }

    if(lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false
    }

    if(etag && etag !== res.getHeader('ETag')) {
        return false
    }

    return true
}

