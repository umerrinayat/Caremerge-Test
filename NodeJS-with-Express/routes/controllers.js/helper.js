

exports.urlHelper = (addressParam) => {
    if(typeof addressParam === 'string')
        return new Array(addressParam)
    else
        return addressParam
}