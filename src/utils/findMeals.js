const request = require('request');


const searchMeal = (searchTerm, callback) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
    request({ url, json: true  }, (error, {body} ) => {
        if (error) {
            callback('Cannot connect to service', undefined)
        } else if (body.error) {
            callback('Not working /:', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = {
    searchMeal
}