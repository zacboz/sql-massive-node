var app = require('./index');
var db = app.get('db');

module.exports = {

    Create: function(req, res) {
        var products = req.body;
        var values = [products.Name, products.Description, products.Price, products.Imageurl];
        db.create_product(values, function(err, response) {
            console.log('creating')
            res.json(response);
        });
    },

    GetAll: function(req, res) {
        db.read_products(function(err, response) {
            console.log(response);
            res.status(200).json(response);
        });
    },

    GetOne: function(req, res) {
        var id = req.body.id;
        if (id) {
            db.read_product([id], function(err, response) {
                console.log('Get just one');
                res.status(200).json(response);
            });
        } else {
            db.read_products(function(err, response) {
                console.log('Get all');
                res.status(200).json(response);
            });
        }
    },

    Update: function(req, res) {
        var products = req.body;
        var value = [req.params.productId, products.description];
        db.update_product(value, function(err, response) {
            console.log('updating: ', value);
            res.status(200).json(response);
        })
    },

    Delete: function(req, res) {
        var record = req.body;
        var recordId = [record.id];
        if (recordId) {
            db.delete_product(recordId, function(err, response) {
                console.log('deleting product')
                res.status(200).json(response);
            })
        }
    }





};
