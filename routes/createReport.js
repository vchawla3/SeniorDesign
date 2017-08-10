var models = require("../models");
exports.renderReport = function(req, res) {
	res.render('createReport', {
		title : 'Create Report'
	});
};

exports.getReports= function(req, res) {
    models.report.findAll().then(function(report){
        res.send(report);
    });
   
};

function updateDimension(report, id, weight){
	//TODO: update weight as well
	console.log("updating ID - " + id);
	var dim = models.dimension.upsert({
		id: id,
		dimension_weight: weight,
		report_id: report.get('id')
	});
}

exports.saveReport = function(req, res) {
	//using sequelize model, cretae new report object (which saves to db)
	 var report = models.report.create({
		 report_name: req.body.name,
		 report_description: req.body.description
	    }).then(function(report){
	    	var length = req.body.dimensions.length;
	    	
	    	for (var i = 0; i < length; i++) {
	    		var id = updateDimension(report, req.body.dimensions[i].id, req.body.dimensions[i].weight);
	    		console.log('updated dimension # ' + i);	
	    	}
	    	
	    	console.log('now send to home page');
	    	res.json({ success: 'success' });
	    }).catch(function(error){
	        console.log("ops: " + error);
	        res.status(500).json({ error: 'error' });
	    });
};