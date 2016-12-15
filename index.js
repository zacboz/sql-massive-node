var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var app = module.exports = express();
app.use(bodyParser.json());

var port = 3001;

var conn = massive.connectSync({
  connectionString : "postgres://postgres:@localhost/sql-massive-node"
});
app.set('db', conn);
var db = app.get('db');
var productsCtrl = require('./productsCtrl');



app.post('/api/product', productsCtrl.Create);

app.get('/api/products', productsCtrl.GetAll);

app.get('/api/product/:productId', productsCtrl.GetOne);

app.put('/api/product/:productId', productsCtrl.Update);

app.delete('/api/product/:productId', productsCtrl.Delete);





app.listen(port, function() {
  console.log("Started server on port", port);
});
