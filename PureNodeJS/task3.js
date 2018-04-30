const http = require('http');
const PORT = 3000;
const url = require('url');
const helper = require('./helper')


var server = http.createServer(function (req, res) {
    let route = url.parse(req.url).pathname;
    let queryParams = url.parse(req.url, true).query;
    let addressParam = helper.urlParamCounter(queryParams.address)
    
    if (req.method === 'GET' && route === '/I/want/title') {
        if(!queryParams.address){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<html><body><h1>Error 404</h1> <p>${req.url} - address param is missing</p></body></html>`);
            return;
        }else{
            let titleArray = []
            let promiseArray = []
            
            for (var add in addressParam) {
                console.log('Address ' , addressParam[add]);
                let url = helper.urlHttpChecker(addressParam[add])
                promiseArray.push( helper.getTitlePromise(url));
            }

            Promise.all(promiseArray).then((data) => {
                console.log('This is data ', data);
                titleArray.push(data);
                let html = helper.createListItems(titleArray)
                res.writeHead(200, {'Content-Type': 'text/html','Content-Length':html.length});
                res.write(html);
                res.end();
            })
        }
    }else {
        if(route !== '/I/want/title'){
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<html><body><h1>404</h1> <p>Ooops!  ${req.url} - Route not found</p></body></html>`);
            return;
        }else{
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<html><body><h1>404</h1> <p>Ooops!  Only GET request is supported</p></body></html>`);
            return;
        }
    }
});


server.listen(3000, () => {
    console.log(`App is running on port:${PORT}`)
});