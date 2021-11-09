
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser=require('body-parser')
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

//define mongoose schema
const contactSchema= new mongoose.Schema({
    Name : String,
    number : String,
    email: String,
    address: String,
    age: String,
  });
  const contact = mongoose.model('contact', contactSchema); 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params ={ }
    res.status(200).render('index.pug',params);
})

app.get(`/contact`, (req, res)=>{ 
    const params ={}
    res.status(900).render('contact.pug',params);
});
app.get(`/classinfo`, (req, res)=>{ 
    const params ={}
    res.status(500).render('classinfo.pug',params);
})
app.post(`/contact`, (req, res)=>{ 
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send('this item has been saved to the database successfully')
    }).catch(()=>{
        res.status(400).send('item was not saved')
    })

})
// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});