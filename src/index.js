const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const { check } = require('./utils/findMeals');
const { searchMeal } = require('./utils/findMeals');

// Confugre express server PORT
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// Serve up folders (public, partials, views)
app.use(express.static(publicDirectoryPath));

// Handlebars config and serve
hbs.registerPartials(partialsDirectoryPath);;
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);


app.listen(port, () => {
    console.log(`Port is listening on port ${port}`)
})

// End Configuration
// Bringing in other files

   app.get('/', (req,res) => {
       res.render('meals')
   })

   app.get('/meals', (req, res) => {
    if(!req.query.s){
        return console.log('Enter search term');
    }

    searchMeal(req.query.s, (error, data) => {
        if (error) {
            return res.send({ error: 'Cannot connect' });
        } 

        if (!data.meals ){
            return res.send({ error: 'No results found, try again :)' });
        }
        
        const mealsData = data.meals;

            res.send({
                mealsData
            })      
       })
   })


