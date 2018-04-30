const Rx = require('rx');
const cheerio = require('cheerio')
var rp = require('request-promise');
const helper = require('./helper')







function getCheerio(url) {
    var promise = rp( {
            uri: url,
            transform: function (body) {
                return cheerio.load(body);
            }
        }).then(($) => {
            let title = $("title").text()
            return ({url: url,title: title});
        }).catch((err) => {
            return ({url: url,title: error});
        })
    return Rx.Observable.fromPromise(promise);
}


exports.getTite = (req, res, next) => {
    let observerArray = []
    let titleArray = []
    let addressParam = helper.urlHelper(req.query.address)
    for (var add in addressParam) {
        console.log('Address ' , addressParam[add]);
        let url = addressParam[add]
        observerArray.push(getCheerio(url));
    }

    const example = Rx.Observable.concat(...observerArray);
    const subscribe = example.subscribe(
        (val) => {
            console.log('Incommplete Data' , val)
            titleArray.push(val)
        },
        (err) => {console.log('Error ', err)},
        () => {
            console.log('Complete Data ')
            res.render('index', {urls: titleArray})
        }
    );
}



  
