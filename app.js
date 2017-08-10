
/**
 * Module dependencies.
 */

var routes = require('./routes'); //place on top of the file</pre>
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
var createReport = require('./routes/createReport');
app.post('/createReport', createReport.saveReport);
app.get('/createReport', createReport.renderReport);
var createDimension = require('./routes/createDimension');
app.get('/createDimension', createDimension.createDimension);
app.get('/createDimension/getd', createDimension.getDimensions); //this may or may not work. for testing.
app.get('/createDimension/getm', createDimension.getMetrics); //this may or may not work. for testing.
app.post('/createDimension', createDimension.saveDimension);
app.get('/createDimension/existing', createDimension.getDimensionsDropdown);
app.get('/createDimension/getExistingMetrics', createDimension.getMetricsForDimension);
app.post('/deleteDimension', createDimension.deleteDimension);
var enterScore = require('./routes/enterScore');
app.get('/enterScore', enterScore.enterScore);
app.get('/enterScore/getDimensions', enterScore.getDimensions);
//app.get('/enterScore/getMetrics', enterScore.getMetrics);
app.get('/enterScore/getData', enterScore.getData);
app.post('/enterScore/saveScores', enterScore.saveScores);
var valuesToFront = require('./routes/index');
app.get('/getMetricScores', valuesToFront.getMetricScores); //route for getting metric scores
app.get('/getMetrics', valuesToFront.getMetrics); //route for getting metrics
app.get('/getDimensionsWithReportID', valuesToFront.getDims); //route for getting dimensions
app.get('/getReports', valuesToFront.getReports); //route for getting reportS
app.get('/getDimensionScores', valuesToFront.getDimensionScores); //route for getting dim scores
app.get('/getReportScore', valuesToFront.getReportScore); //route for getting report scores

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app; //required for mocha