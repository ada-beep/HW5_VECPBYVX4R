

/*Using Mongo CLient*/

const express = require('express')
const app = express()
const port = 4000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


const url = "mongodb+srv://adaobi:adaobi@cluster0.t2ein.mongodb.net/ADA-DATA";
// const url = "mongodb+srv://adaobi:adaobi@cluster0.t2ein.mongodb.net/ADA_DATA?retryWrites=true&w=majority"


/*Name of DB*/
const dbName = 'ADA-DATA';


/*New MongoClient*/
const client = new MongoClient(url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {

    /*Stating Constants*/
    const db = client.db(dbName);
    const collection = db.collection('covid');



    /*Finding all the cases*/
    collection.find({}).toArray(async function (err, cases_list) {
        assert.equal(err, null);
        let cases = await cases_list;
        res.render('index.ejs', { 'corona_cases': cases })
    });
})



// Connecting to server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('Connected successfully to DataBase');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
})



