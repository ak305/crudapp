express = require('express')
bodyParser= require('body-parser')
app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')

MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://admin:admin@ds151917.mlab.com:51917/crudapp', (err, database) => {
  // ... start the server
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

// app.listen(3000, function() {
//     console.log('listening on 3000')
// })

app.get('/', (req, res) => {
    db.collection('quotes').find().toArray(function(err, results) {
      console.log(results)
      // send HTML file populated with quotes here
      res.render('index.ejs', {quotes: results})

    })
    // res.sendFile(__dirname + '/index.html')
})    

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})