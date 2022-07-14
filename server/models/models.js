const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create another project and use that new cluster as a new db for this project


//connect to the mongodb database
const MONGO_URI = 'mongodb+srv://Kagan07:Sailing49er@cluster0.9nqml.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'medDb'
  })
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));


//database schema
const medicationSchema = new Schema({
    brand_name: String,
    generic_name: String,
    pharm_class: [String],
    strength: String,
    route: String,
    active_ingredients: [String],
})


const Meds = mongoose.model('meds', medicationSchema)

module.exports = { Meds }