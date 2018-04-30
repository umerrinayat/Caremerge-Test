const cheerio = require('cheerio')
const request = require('request')
const helper = require('./helper')


exports.getTite = function (req, res, next) {
    let titleArray = [];
    let counter = 0;
    let addressParam = helper.urlHelper(req.query.address)
    
    for (var add in addressParam) {
        console.log('Address ' , addressParam[add]);
        let urlNew = helper.urlHttpChecker(addressParam[add])
        
        request(urlNew, function(error, response, html){
            if(!error){
                let $ = cheerio.load(html)
                let title = $("title").text()
                console.log('Title is ', title)
                titleArray.push({url: urlNew,title: title})
            }else{
                console.log(error)
                titleArray.push({url: urlNew,title: error})
            }
            counter++;
            if(counter === addressParam.length){
                res.render('index', {urls: titleArray})
            }
        })
    }
}
