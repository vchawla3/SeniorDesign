var models = require("../models");

exports.enterScore = function(req, res) {
	// console.log('create dimension');
	res.render('enterScore', {
		title : 'Enter Score'
	});
};

// Return all dimensions with
exports.getDimensions = function (req, res) {
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

exports.getData = function (req, res) {
	models.metric.findAll({where: {dimension_id:req.query.ids}}).then(function(data){
		res.send(data);
		console.log(data);	
		console.log(req.query.ids);
	});
};

function getMetrics(id){
	models.metric.findAll({where: {dimension_id:id}}).then(function(data){
		console.log(data)
		return data;
	});
}

exports.saveScores = function(req, res) {
	var reportId = req.body.reportId;
	var data = req.body.data;
	var dimScores = [];
	var metrics2 = {};
	for ( var k = 0 ; k < data.length ; k++ ) {
		var dimScore = 0;
		var dimWeightTotal = 0;
		metrics2[data[k].id] = data[k].metrics;
		for ( var j = 0 ; j < data[k].metrics.length ; j++ ) {
			if (data[k].metrics[j].metric_type === 'binary') {
				dimScore += data[k].metrics[j].metric_score * 100 * data[k].metrics[j].metric_weight;
			} else {
				dimScore += data[k].metrics[j].metric_score * data[k].metrics[j].metric_weight;
			}
			dimWeightTotal += data[k].metrics[j].metric_weight;
		}
		dimScores.push(dimScore/dimWeightTotal);
	}
	
	var reportScore = 0;
	var reportWeightTotal = 0;
	
	for (var l = 0 ; l < dimScores.length ; l++ ) {
		reportScore += dimScores[l] * data[l].dimension_weight;
		reportWeightTotal += data[l].dimension_weight;
	}
	
	var reportScoreFinal = reportScore/reportWeightTotal;
	
	var r = models.reportScore.create({
		rs_value: reportScoreFinal,
		report_id: reportId
		}).then(function(r){
			
			for (var l = 0 ; l < dimScores.length ; l++ ) {
				var d = models.dimensionScore.create({
					ds_value: dimScores[l],
					dimension_id: data[l].id,
					report_score_rs_id: r.get('rs_id')
				}).then(function(d){
					var metricArray = metrics2[d.dimension_id];
					for ( var j = 0 ; j < metricArray.length ; j++ ) {
						var m = models.metricScore.create({
							ms_value: metricArray[j].metric_score,
							metric_id: metricArray[j].id,
							dimension_score_ds_id: d.get('ds_id')
						});
					}
				});
			}	
			res.json({ success: 'success' });
	});
	
};