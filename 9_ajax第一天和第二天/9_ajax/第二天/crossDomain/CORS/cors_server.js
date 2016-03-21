/**
 * Created by 银鹏 on 2016/3/6.
 */
var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
    var urlInfo = url.parse(request.url, true);
    var pathname = urlInfo.pathname;

    if (pathname === '/cors') {
        response.writeHead(200, {
            'Access-Control-Allow-Origin': '*'
        });
        response.end('garts to you')
    }
});
server.listen(8087, function () {
    console.log('done')
});