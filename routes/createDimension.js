var models = require("../models");
var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + '/../config/config.json')[env];
var sequelize = new Sequelize(config.database, config.username,
		config.password, config);

exports.createDimension = function(req, res) {
	// console.log('create dimension');
	res.render('createDimension', {
		title : 'Create Dimension'
	});
};

exports.deleteDimension = function (req, res) {
	models.dimension.destroy({
		dimension_id: req.id 
	}).then(function(rowDeleted){
		if(rowDeleted === 1){
			console.log('Deleted successfully');
		}
	}, function(err){
		console.log(err);
	});
};

// Return all dimensions with
exports.getDimensionsDropdown = function (req, res) {
	sequelize.query('SELECT * FROM DIMENSIONS', { raw: true }).then(function(data){
        res.send(data[0]);
		console.log(data[0]);
    });
};

// Return all dimensions with
exports.getMetricsForDimension = function (req, res) {
	models.metric.findAll({where: {dimension_id:req.query.id}}).then(function(data){
		res.send(data);
		console.log(data);	
		console.log(req.query.id);
	});
};

exports.getDimensions= function(req, res) {
    models.dimension.findAll().then(function(dimension){
        res.send(dimension);
    });
   
};

exports.getMetrics= function(req, res) {
	 models.metric.findAll().then(function(metric){
	        res.send(metric);
	    });
};

function makeMetric(dimension, metric){
	models.metric.create({
		metric_name: metric.name,
		metric_type: metric.type,
		metric_description: metric.description,
		metric_weight: metric.weight,
		dimension_id: dimension.get('id')
	});
};

exports.saveDimension = function(req, res) {
	// using sequelize model, cretae new dimension object (which saves to db)
	 var dimension = models.dimension.create({
		 dimension_name: req.body.name,
		 dimension_description: req.body.description
	    }).then(function(dimension){
	    	var length = req.body.metrics.length;
	    	
	    	for (var i = 0; i < length; i++) {
	    		makeMetric(dimension, req.body.metrics[i]);
	    		console.log('made metric # ' + i);
	    	}
	    	console.log('now send to home page');
	    	res.json({ dimID: dimension.get('id'),
	    		dimName: dimension.get('dimension_name'),
	    		dimDesc: dimension.get('dimension_description'),
	    		dimWeight: dimension.get('dimension_weight')
	    			 });
	    }).catch(function(error){
	        console.log("ops: " + error);
	        res.status(500).json({ error: 'error' });
	    });
};

exports.deleteDimension = function(req, res) {
	models.dimension.destroy({
		   where: {
		      id: req.body.id
		   }
		}).then(function(rowDeleted){ // rowDeleted will return number of rows
                                        // deleted
		  if(rowDeleted === 1){
		     console.log('Deleted successfully');
		   }
		});
};


