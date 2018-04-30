const http = require('http');
const PORT = 3000;
const cheerio = require('cheerio')
const request = require('request')
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
            let titleArray = [];
            let counter = 0;
            
            for (var add in addressParam) {
                console.log('Address ' , addressParam[add])
                let url = addressParam[add]
                request(url, function(error, response, html){
                    if(!error){
                        let $ = cheerio.load(html)
                        let title = $("title").text()
                        console.log('Title is ', title)
                        titleArray.push({url: url,title: title})
                    }else{
                        console.log(error)
                        titleArray.push({url: url,title: error})
                    }

                    counter++;
                    if(counter === addressParam.length){
                        let html = helper.createListItems(titleArray)
                        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':html.length});
                        res.write(html);
                        res.end();
                    }
                })
            }
        }
    }else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`<html><body><h1>Error 404</h1> <p>${req.url} - Invalid URL</p></body></html>`);
        return;
    }
});


server.listen(3000, () => {
    console.log(`App is running on port:${PORT}`)
});