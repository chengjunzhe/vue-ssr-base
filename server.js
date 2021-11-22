const express = require('express')
const fs = require('fs')
const serverBundle=require('./dist/vue-ssr-server-bundle')
const clientManifest=require('./dist/vue-ssr-client-manifest')

const template = fs.readFileSync('./index.template.html','utf8')
const renderer=require('vue-server-renderer').createBundleRenderer(serverBundle,{
    template,
    clientManifest
})

const server = express()
server.use('/dist',express.static('./dist'))
server.get('/', (req, res) => {
    renderer.renderToString({
        title:'ssr',
        meta:`<meta name="cjz" content="用户的个人简介">`
    } ,(err, html) => {
        if (err) {
            res.status(500).end('服务器出错了')
        }
        res.setHeader('Content-Type', 'text/html;charset=utf8')
        res.end(html)
    })
})



server.listen(3000, () => {
    console.log(`server listen`);
})