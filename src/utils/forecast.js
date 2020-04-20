const chalk = require('chalk')
const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=07a2ac93a2f177e98f83baee545eed1c&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);

    request({
        url,
        json: true
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to fetch weather for location. Check query parameters again!', undefined)
        } else {
            
            callback(undefined, body.current.weather_descriptions[0] + " : It is currently " + body.current.temperature + " degree Celsius outside. It feels like " + body.current.feelslike + " degrees Celsius.\nObservation Time -> " + body.current.observation_time + "\n. Humidity is " + body.current.humidity + " percent.\nVisibility -> " + body.current.visibility)
        }
    })
}

module.exports = forecast