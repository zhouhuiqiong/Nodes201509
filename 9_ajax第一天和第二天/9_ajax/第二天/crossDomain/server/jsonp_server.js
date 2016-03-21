/**
 * Created by 银鹏 on 2016/3/6.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var studentsList = require('./studentsList');
var studentListString = JSON.stringify(studentsList);
var server = http.createServer(function (request, response) {
    var urlInfo = url.parse(request.url, true);
    var pathname = urlInfo.pathname;

    if (pathname === '/getStudentsInfo') {
        var valName = urlInfo.query['valNameMustBe'];
        response.writeHead(200, {'content-type': 'text/javascript; charset=utf-8'});
        response.end(valName + '(' + studentListString+')');
    }
    fs.readFile(pathname.slice(1), function (err, data) {
        if (err) {
            response.writeHead(404);
            response.end('');
        } else {
            response.writeHead(200, {'content-type': 'text/javascript; charset=utf-8'});
            response.end(data);
        }
    })
});
server.listen(12345, function () {
    console.log('done')
});