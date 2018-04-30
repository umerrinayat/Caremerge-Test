const cheerio = require('cheerio')
const request = require('request')
const Rx = require('rx');
const rp = require('request-promise');

exports.urlParamCounter = (addressParam) => {
    if(typeof addressParam === 'string')
        return new Array(addressParam)
    else
        return addressParam
}


//
exports.urlHttpChecker = (url) => {
    let prefixHTTP = 'http://';
    let prefixHTTPS = 'https://';
    if (url.substr(0, prefixHTTP.length) !== prefixHTTP && url.substr(0, prefixHTTPS.length) !== prefixHTTPS){
        console.log('Http is missing ', url)
        url = prefixHTTP + url;
        console.log('Http was missing ', url)
    }
    return url
}



// This create the HTML page
exports.createListItems = (titles) => {
    let listItem = '<html><body><h1> Following are the titles of given websites: </h1><ul>' ;
    titles.forEach((title) => {
        listItem += `<li> ${title.url} - ${title.title}</li>\n`
    });
    listItem += '</ul></body></html>';
    return listItem
}

// Using Request Promise Package
exports.getTitlePromise = (url) => {
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



// RXJS 
exports.getRXJSRequestPromise = (url) => {
    var promise = rp( {
            uri: url,
            transform: function (body) {
                return cheerio.load(body);
            }
        }).then(($) => {
            let title = $("title").text()
            return ({url: url,title: title});
        }).catch((err) => {
            return ({url: url,title: err});
        })
    return Rx.Observable.fromPromise(promise);
}

