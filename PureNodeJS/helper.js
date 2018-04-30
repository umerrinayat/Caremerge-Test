const cheerio = require('cheerio')
const request = require('request')

exports.urlParamCounter = (addressParam) => {
    if(typeof addressParam === 'string')
        return new Array(addressParam)
    else
        return addressParam
}


exports.createListItems = (titles) => {
    let listItem = '<html><body><h1> Following are the titles of given websites: </h1><ul>' ;
    titles.forEach((title) => {
        listItem += `<li> ${title.url} - ${title.title}</li>\n`
    });
    listItem += '</ul></body></html>';
    return listItem
}

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