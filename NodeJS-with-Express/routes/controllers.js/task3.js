const cheerio = require('cheerio')
const request = require('request')
const helper = require('./helper')



const getTitlePromise = (url) => {
    return new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if(!error){
                let $ = cheerio.load(html)
                let title = $("title").text()
                resolve({url: url,title: title});
            }else{
                reject({url: url,title: error});
            }
        })
    }).catch(function (err) {
        return err;
    });
}

exports.getTite = (req, res, next) => {
    let promiseArray = []
    let titleArray = []
    let addressParam = helper.urlHelper(req.query.address)
    for (var add in addressParam) {
        console.log('Address ' , addressParam[add]);
        let url = addressParam[add]
        promiseArray.push(getTitlePromise(url));
    }

    Promise.all(promiseArray).then((data) => {
        console.log('This is data ', data);
        titleArray.push(data);
        res.render('index', {urls: data})
    })
}
