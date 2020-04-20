const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const chalk = require('chalk')

// console.log(__dirname)
// console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// *Define paths for Express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// *Setup handlebars engine and views(default folder) location and partials Path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// *Setup static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render("index", {
        title: 'Weather App',
        name: 'Tushar Bana'
    })
});

app.get("/about", (req, res) => {
    res.render("about", {
      title: "About Me",
      name: "Tushar Bana",
    });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    helpText: "I am here to help",
    name: "Tushar Bana"
  });
});


app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: "Must provide an address term"
    })
  }  
  
  geocode(req.query.address, (error, {
    latitude,
    longitude,
    location
  } = {}) => {
    if (error) {
       return res.send({error})
      //console.log('Data', data.longitude, data.latitude)
    } else {
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({error})
        } else {
          return res.send({
            location,
            forecast: forecastData,
            address: req.query.address
          })
        }
      })
    }
  })

})


app.get('/products', (req, res) => {
  if(!req.query.search){
    return res.send({
      error: "Must Provide a search term"
    })
  }
  res.send({
  products: []
  })
})


app.get("/help/*", (req, res) => {
  res.render("404", {
      title: 'Error 404',
      textMessage: "Help Article not found!",
      name: 'Tushar Bana'
  })
});

app.get('*', (req,res) => {
    res.render("404", {
      title: "Error 404",
      textMessage: "Page not found!",
      name: "Tushar Bana",
    });
})

app.listen(port, () => {
    console.log('Server started on port' + port)
})




// ? Notes
// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Tushar',
//         age: 23
//     },{
//         name: 'Khushi',
//         age: 13
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>ABOUT PAGE</h1>')
// })