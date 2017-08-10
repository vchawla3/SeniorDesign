var dashboard = angular.module('dashboard', [ 'ui.bootstrap' ]);

/** For use with redirecting to the correct enterScores page */
dashboard.config(['$locationProvider', function AppConfig($locationProvider) {
	$locationProvider.html5Mode({
		  enabled: true,
		  requireBase: false
		});
}]);
dashboard.run(['$location', function AppRun($location) {

}]);

/**
 * This is the controller for the Enter Score Page
 */
dashboard.controller('EnterScore', [ '$scope', '$http', '$q',
	'$window', 'DimensionService','ReportService', '$location',
	function($scope, $http, $q, $window, DimensionService, ReportService, $location) {
	
		// Usage: localhost:3000/enterScores/?reportid=IdGoesHere
		var reportId = $location.search().reportId;
		console.log(reportId);
	
		// Store data for dimensions associated with report and underlying metrics
		// To be displaye on the page
		$scope.dimensionData = [];

		$scope.saveScores = saveScores;
		
		getDimensions();
			
		function getDimensions(){
			$http({
	            method: 'GET',
	            url: '/enterScore/getDimensions',
	            params: { id : reportId }	
	        }).then(function (result) {
	        	$scope.dimensionData = result.data;
	        	console.log($scope.dimensionData);
	        	var dimIDs = [];
	        	for ( var i = 0 ; i < $scope.dimensionData.length ; i++ ) {
	        		dimIDs.push($scope.dimensionData[i].id);
	        	}
	        	$http({
    	            method: 'GET',
    	            url: '/enterScore/getData',
    	            params: { ids : dimIDs }
    	        }).then(function (result2) {
    	        	// nest the metrics within their associated dimensions
    	        	for ( var k = 0 ; k < result2.data.length ; k++) {
    	        		for ( var j = 0 ; j < $scope.dimensionData.length ; j++) {
    	        			if ( result2.data[k].dimension_id === $scope.dimensionData[j].id ) {
    	        				if (typeof $scope.dimensionData[j].metrics == 'undefined') {
    	        					$scope.dimensionData[j].metrics = [];
    	        				}
    	        				$scope.dimensionData[j].metrics.push(result2.data[k]);
    	        			}
    	        		}
    	        	}
    	        	console.log($scope.dimensionData);
    	        });
	        });
			
		}
	
		function saveScores() {
			return $http.post('/enterScore/saveScores', {
				data: $scope.dimensionData,
				reportId: reportId,
			}).then(function(response) {
				 $window.location.href = '/';
				 $window.location.href;
			}, function(errResponse) {
				console.error('Error while saving scores');
				console.error(errResponse);
				return $q.reject(errResponse);
			});
		};	
		
	} ]
);


/**
 * This is the controller used for Add Dimension Page
 */
dashboard.controller('DimensionController', [ '$scope', '$http', '$q',
	'$window', 'DimensionService','ReportService',
	function($scope, $http, $q, $window, DimensionService, ReportService) {
		// create Dimension page setup
		$scope.dim = {};
		$scope.model = {};
		$scope.model.metrics = [];
		$scope.addMetric = newMetric;
		$scope.populateDimension = populateDimension;
		$scope.saveDimension = saveDimension;
		$scope.existingDimensions = [];
		getExisting();
		
		//Gets existing dimensions along with their respective metrics
		function getExisting() {
			$http({
	            method: 'GET',
	            url: '/createDimension/existing'
	        }).then(function (result) {
	        	console.log(result.data);
	        	$scope.existingDimensions = result.data;
	        });
		};
		newMetric();
		
		 /**
		 * JSON format calls to API to create new dimension in DB
		 */
		function saveDimension() {
			console.log('tests');
			return $http.post('/createDimension', {
				name : $scope.dim.name,
				description : $scope.dim.description,
				metrics : $scope.model.metrics,
			}).then(function(response) {
				DimensionService.Add(response.data.dimID, response.data.dimName, response.data.dimDesc);
				// succesfully saved to db, so redirect to index page for
				// now
				console.log(response.data.dimID, response.data.dimName, response.data.dimDesc);
				$window.history.back();
				// $window.location.href = '/';
				// $window.location.href;
			}, function(errResponse) {
				console.error('Error while creating dimension');
				console.error(errResponse);
				return $q.reject(errResponse);
			});
		};

		//Adds new metric fields to form
		function newMetric() {
			// push an empty object onto the array
			console.log("Adding a new metric");
			$scope.model.metrics.push({});
		}

		//Populates the add dimension page with an existing dimensions info and metric data
		function populateDimension() {
			console.log("dimension");
			$scope.model.metrics = [];
			var selectedMetrics = [];
			
			$scope.dim.name = $scope.selectedExistingDimension.Dimension_Name;
			$scope.dim.description = $scope.selectedExistingDimension.Dimension_Description;
			$http({
	            method: 'GET',
	            url: '/createDimension/getExistingMetrics',
	            params : { id : $scope.selectedExistingDimension.Dimension_ID }	
	        }).then(function (result) {
	        	console.log(result.data);
	        	selectedMetrics = result.data;
	        	for (var k = 0 ; k < selectedMetrics.length ; k++ ) {
					var met = {name: selectedMetrics[k].metric_name, 
							description: selectedMetrics[k].metric_description,
							type: selectedMetrics[k].metric_type,
							weight: selectedMetrics[k].metric_weight};
					$scope.model.metrics.push(met);
				}
	        });	
		}
	}]
);

/**
 * This is the controller used for the Add Report Page
 */
dashboard.controller('ReportController', [ '$scope', '$http', '$q',
	'$window', 'DimensionService','ReportService',
	function($scope, $http, $q, $window, DimensionService, ReportService) {
		// create Report page setup
		$scope.dimensions = [];
		$scope.rep = {};
		$scope.addDimension = addDimension;
		$scope.saveReport = saveReport;
		$scope.deleteDimension = deleteDimension;
		setReportInfo();
		function setReportInfo() {
			repInfo = ReportService.GetModel();
			$scope.rep.name = repInfo.name;
			$scope.rep.description = repInfo.description;
		};
		getIDs();
		function getIDs() {
			$scope.dimensions = DimensionService.GetDims();
		};
		function addDimension() {
			//this simply links this button to the add dimension page
			DimensionService.Save($scope.dimensions);
			ReportService.Add($scope.rep.name, $scope.rep.description);
			$window.location.href = '/createDimension';
			$window.location.href;
		};
		function deleteDimension(id){
			var l = $scope.dimensions.length;
			for(var i = 0; i < l; i++){
				if ($scope.dimensions[i].id == id) {
					$scope.dimensions.splice(i, 1);
				}
			}
			DimensionService.Save($scope.dimensions);
			console.log(id);
			return $http.post('/deleteDimension', {
				id : id,
			});
		}
	
		function saveReport() {
			return $http.post('/createReport', {
				name : $scope.rep.name,
				description : $scope.rep.description,
				dimensions : $scope.dimensions,
			}).then(function(response) {
				DimensionService.Clear();
			//	ReportService.Clear();
				// succesfully saved to db, so redirect to index page for
				// now
				console.log(response);
				$window.location.href = '/';
				$window.location.href;
			}, function(errResponse) {
				console.error('Error while creating report');
				console.error(errResponse);
				return $q.reject(errResponse);
			});
		};
	}]
);

/**
 * Not necessarily all of these skeleton functions will be used or useful, nor
 * are they guaranteed to be possible. They are for use in building business
 * logic elsewhere. If sequelize does ORM in a proper, traditional OOP sense,
 * then almost none of these will be necessary.
 */
dashboard.controller('DashboardController', [ '$scope', '$http', '$q',
	'$window', 'DimensionService','ReportService',
	function($scope, $http, $q, $window, DimensionService, ReportService) {
		$scope.selectedReportId = JSON.parse(sessionStorage.getItem('selectedReportId'));
		$scope.reports = [];
		$scope.dimension = null;
		$scope.dimensionData = [];
		$scope.dimensionScores = [];
		$scope.reportScore = 0;
		$scope.metricScores = [];
		$scope.metricScores2 = [];
		$scope.metrics = [];
		$scope.metricNames = [];
		//allow easier retrieval of metric information
		$scope.imptMetricData = [{
		    name: $scope.metricNames,
		    score: $scope.metricScores2
		}];
		var dimIDs = [];
		var dimScoreIDs = [];
		
		
		$scope.selectArray = function(idOfReport) {
			
			
			
			//get the report score
			$http({
	            method: 'GET',
	            url: '/getReportScore',
	            params: { id : idOfReport }	
	        }).then(function (result) {
	        	$scope.reportScore = result.data; 
	        	console.log($scope.reportScore);
	        	if (typeof JSON.stringify($scope.reportScore).split(":")[3] != 'undefined'){
	        		var repScore = JSON.stringify($scope.reportScore).split(":")[3].split(",")[0];
	        		sessionStorage.setItem('repScore', JSON.stringify(repScore)); //put dimension data in session storage
	        	}
	        });
			//get the dimension names
			$http({
	            method: 'GET',
	            url: '/getDimensionsWithReportID',
	            params: { id : idOfReport }	
	        }).then(function (result) {
	        	$scope.dimensionData = result.data; //not defined yet
	        	console.log($scope.dimensionData);
	        	var dimNames = [];
	        	
	        	for ( var i = 0 ; i < $scope.dimensionData.length ; i++ ) {
	        		dimIDs.push($scope.dimensionData[i].id);
	        		dimNames.push($scope.dimensionData[i].dimension_name);
	        	}
	        	
	        	sessionStorage.setItem('dimNames', JSON.stringify(dimNames)); //put dimension data in session storage
	        	sessionStorage.setItem('reportSelected', JSON.stringify(true));
	        	sessionStorage.setItem('selectedReportId', JSON.stringify(idOfReport));
	        	
	        });	
			
			
	        	
	        	
	        	
	        //get the dimension scores for the pieces of the graph
        	$http({
	            method: 'GET',
	            url: '/getDimensionScores',
	            params: { id : idOfReport }	
	        }).then(function (result) {
	        	$scope.dimensionScores = result.data; 
	        	console.log($scope.dimensionScores);
	        	var dimWeights = [];
	        	
	        	for ( var i = 0 ; i < $scope.dimensionScores.length ; i++ ) {
	        		dimWeights.push($scope.dimensionScores[i].ds_value);
	        		dimScoreIDs.push($scope.dimensionScores[i].ds_id);
	        	}
	        	sessionStorage.setItem('dimIDs', JSON.stringify(dimScoreIDs));
	        	sessionStorage.setItem('pieData', JSON.stringify(dimWeights)); //put dimension data in session storage
	        	
	      
	        });
			
			
			location.reload();
			//$scope.reportSelected = false;
			//$scope.selectedReportId = idOfReport;
			
			
	    }
		
		$scope.getMetricScores = function getMetricScores(){
			
			var selectedDimensionScoreID = JSON.parse(sessionStorage.getItem('selectedDimScoreID'));
			$http({
	            method: 'GET',
	            url: '/getMetricScores',
	            params: { id : selectedDimensionScoreID }
	        }).then(function (result) {
	        	$scope.metricScores.push(result.data);
	        	
	        	for ( var i = 0 ; i < $scope.metricScores[0].length ; i++ ) {
	        		$scope.metricScores2.push($scope.metricScores[0][i].ms_value);
	        	}
	        	sessionStorage.removeItem('selectedDimScoreID');
	        });
			
			$http({
	            method: 'GET',
	            url: '/getMetrics',
	            params: { id : selectedDimensionScoreID }
	        }).then(function (result) {
	        	$scope.metrics.push(result.data);
	        	
	        	for ( var i = 0 ; i < $scope.metrics[0].length ; i++ ) {
	        		$scope.metricNames.push($scope.metrics[0][i].metric_name);
	        	}
	        });
		}
			
		
	    getReports();
	    
	    function getReports(){
			$http({
	            method: 'GET',
	            url: '/getReports'
	           // params: { id : reportId }	
	        }).then(function (result) {
	        	
	        	$scope.reports = result.data;
	        });
		}
	    
	    $scope.enterScores = function() {
	    	if ($scope.selectedReportId === null) {
	    		alert("Please select a report!");
	    	} else{
	    		$window.location.href = '/enterScore/?reportId=' + $scope.selectedReportId;
				$window.location.href;
	    	}
	    	
	    };	
	
	} ]
);

dashboard.factory('DimensionService', [ '$rootScope', function($rootScope) {

	var service = {

		model : {
			dimensions: []
		},
		
		GetModel : function() {
			service.model = angular.fromJson(sessionStorage.dimensionService);
			if (typeof service.model == 'undefined') {
				return {dimensions: []};
			}
			return service.model;
		},
		
		Save : function(dimensions) {
			service.model = service.GetModel();
			service.model.dimensions = dimensions;
			sessionStorage.dimensionService = angular.toJson(service.model);
		},

		Add : function(dim_ID, dim_Name, dim_Desc) {
			service.model = service.GetModel();
//			if (typeof angular.fromJson(sessionStorage.dimensionService) != 'undefined') {
//				service.model = angular.fromJson(sessionStorage.dimensionService);
//			}
			//service.model.dim_IDs.push(dim_ID);
			service.model.dimensions.push({id: dim_ID, name: dim_Name, description: dim_Desc});
			sessionStorage.dimensionService = angular.toJson(service.model);
			console.log(angular.toJson(service.model))
		},
		
		
//		Get : function() {
//			service.model = angular.fromJson(sessionStorage.dimensionService);
//			if (typeof service.model == 'undefined') {
//				return [];
//			}
//			console.log(service.model.dim_IDs);
//			return service.model.dim_IDs;
//		},
		
		GetDims : function () {
			service.model = angular.fromJson(sessionStorage.dimensionService);
			if (typeof service.model == 'undefined') {
				return [];
			}
			console.log(service.model.dimensions);
			return service.model.dimensions;
		},
		
		Clear : function() {
			service.model.dimensions = [];
			sessionStorage.dimensionService = angular.toJson(service.model);
		}
	}
	return service;
} ]);
dashboard.factory('ReportService', [ '$rootScope', function($rootScope) {

	var service = {

		model : {
			name: '',
			description: ''
		},
		
		GetModel : function() {
			service.model = angular.fromJson(sessionStorage.reportService);
			if (typeof service.model == 'undefined') {
				return {name: '', description: ''};
			}
			return service.model;
		},

		Add : function(name, description) {
			service.model = service.GetModel();
//			if (typeof angular.fromJson(sessionStorage.dimensionService) != 'undefined') {
//				service.model = angular.fromJson(sessionStorage.dimensionService);
//			}
			service.model.name = name;
			service.model.description = description;
			sessionStorage.reportService = angular.toJson(service.model);
			console.log(angular.toJson(service.model))
		},
		
		Clear : function() {
			service.model.name = '';
			service.model.description = '';
			sessionStorage.reportService = angular.toJson(service.model);
		}
	}
	return service;
} ]);