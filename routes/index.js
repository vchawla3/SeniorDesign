
/*
 * GET home page.
 */
var models = require("../models"); // place on top of the file</pre>

exports.getAllScoreData = function(req, res) {
	var allData = [];
	//get latest report score object using report id
	models.reportScore.findAll({where: {report_id:req.query.id}, Limit: 1, order: 'created_at DESC' }).then(function(reportScore){
        allData.push(reportScore);
        
        //using report score id, get all the dimension scores associated with it
        models.dimensionScore.findAll({where: {report_score_rs_id:reportScore.id}}).then(function(Dimscores){
        		allData.push(Dimscores);
        		
        		var dimScoreIDs = [];
        		//loop through each dimension score id, and push into array of metric IDs
        		for(var i = 0 ; i < Dimscores.length ; i++) {
        			dimScoreIDs.push(Dimscores[i].id);
        		} 
        		
        		//get all metrics scores associated with any of the IDs found in the dimScoreIDs array
        		models.metricScore.findAll({where: {dimension_score_ds_id:dimScoreIDs}}).then(function(metScores){
        				allData.push(metScores);
    			});
    			console.log(allData);
        		res.send(allData);
    	});
        
    });
}

//sends report ID in params and gets the most recent score associated with it
exports.getReportScore = function(req, res) {
    models.reportScore.findAll({where: {report_id:req.query.id}, Limit: 1, order: 'created_at DESC' }).then(function(data){
        res.send(data);
    });
}

//sends report score ID in params and gets back all the dimension score objects associated with it
exports.getDimensionScores = function(req, res){
    models.dimensionScore.findAll({where: {report_score_rs_id:req.query.id}}).then(function(data){
        res.send(data);
    });
}

//sends dimension score ID in params and gets back all the metric score objects associated with it
exports.getMetricScores = function(req, res){
    models.metricScore.findAll({where: {dimension_score_ds_id:req.query.id}}).then(function(data){
        res.send(data);
    });
}

exports.gettodos = function(req, res) {
    models.Todo.findAll().then(function(todos){
        res.json(todos);
    });
};

exports.getReports= function(req, res) {
    models.report.findAll().then(function(report){
    	console.log('getting all reports');
        res.send(report);
    });
};

//Return all dimensions with 
exports.getDims = function (req, res) {
	models.dimension.findAll({where: {report_id:req.query.id}}).then(function(data){
		res.send(data);
		console.log(data);	
		console.log(req.query.id);
	});
};

exports.getMetrics = function (req, res) {
	models.metric.findAll({where: {dimension_id:req.query.id}}).then(function(data){
		res.send(data);
		console.log(data);	
		console.log(req.query.id);
	});
};
/*
exports.getDimScores = function (req, res) {
	models.metric.findAll({where: {report_score_rs_id:req.query.id}}).then(function(data){
		res.send(data);
		console.log(data);	
		console.log(req.query.id);
	});
};*/
 
exports.savetodos = function(req, res) {
    models.Todo.create({
        text: req.body.text,
        done: req.body.done
    }).then(function(todos){
        res.json(todos.dataValues);
    }).catch(function(error){
        console.log("ops: " + error);
        res.status(500).json({ error: 'error' });
    });
    models.Todo.find({
        where: {
           id: req.body.id
        }
        }).then(function (todo) {
        todo.updateAttributes({
            text: req.body.text,
            done: req.body.done,
        }).then(function (todo) {
            res.json(todo);
        }).catch(function (err) {
            console.log(err);
        });
        }).catch(function (err) {
            console.log(err);
    });
};
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
