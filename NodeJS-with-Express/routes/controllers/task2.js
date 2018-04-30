const async = require("async")
const cheerio = require('cheerio')
const request = require('request')
const helper = require('./helper')


exports.getTite = (req, res, next) => {
    let titleArray = [];
    let addressParam = helper.urlHelper(req.query.address)
    async.each(addressParam, (url, callback) => {
        let urlNew = helper.urlHttpChecker(url)
        request(urlNew, (error, response, html) => {
            if(!error){
                let $ = cheerio.load(html)
                let title = $("title").text()
                titleArray.push({url: url,title: title})
                callback();
            }else{
                console.log('Yahoo ', error)
                titleArray.push({url: url,title: error})
                callback(`url: ${url} - ${error}`);
            }
        })
    }, function(err) {
        if( err ) {
            console.log(`Error occured :  ${err}`);
            res.render('index', {urls: titleArray})
        } else {
            console.log('All files have been processed successfully');
            res.render('index', {urls: titleArray})
        }
    });
}
