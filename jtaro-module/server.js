/*! JTaro-Module server.js v0.0.1 ~ (c) 2017 Author:BarZu Git:https://github.com/chjtx/JTaro-Module/ */
var fs = require('fs')
var path = require('path')
var http = require('http')
var url = require('url')
var jtaroModule = require('./parse')
var port = process.argv[2] || 3000

var mime = {
  'css': 'text/css',
  'gif': 'image/gif',
  'html': 'text/html',
  'ico': 'image/x-icon',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tiff': 'image/tiff',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'wma': 'audio/x-ms-wma',
  'wmv': 'video/x-ms-wmv',
  'xml': 'text/xml'
}

http.createServer((req, res) => {
  var parseURL = url.parse(req.url)
  var pathname = parseURL.pathname
  var ext = path.extname(pathname)
  var realPath = '.' + pathname
  ext = ext ? ext.slice(1) : 'unknown'
  var contentType = mime[ext] || 'text/plain'

  fs.stat(realPath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write('This request URL ' + pathname + ' was not found on this server.')
      res.end()
    } else {
      fs.readFile(realPath, 'binary', function (err, file) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end(err)
        } else {
          if (ext === 'js') {
            file = jtaroModule(file, req.url)
          }

          res.writeHead(200, { 'Content-Type': contentType })
          res.write(file, 'binary')
          res.end()
        }
      })
    }
  })
}).listen(port)

console.log('JTaro Module Server run on port: ' + port)
