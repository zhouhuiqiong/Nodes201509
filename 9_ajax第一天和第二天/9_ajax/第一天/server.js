/**
 * Created by 银鹏 on 2016/3/5.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var server=http.createServer(function (request, response) {
    var urlInfo = url.parse(request.url, true);
    var pathname = urlInfo.pathname;
    if (pathname === '/getInfo') {
        setTimeout(function () {
            response.writeHead(200);
            response.end('hello-world');
        }, 5000);
        return;
    }

    fs.readFile(pathname.slice(1), function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end();
        } else {
            response.writeHead(200);
            response.end(data);
        }
    })
});
server.listen(8080, function () {
    console.log('done1');
});