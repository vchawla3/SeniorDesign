'use strict';
dashboard.factory('DimensionService', ['$http', '$q', function($http, $q){
	function dimension(id, name, description, formula, metrics, drugtest) {
	  	  this.id=id;
	  	  this.name=name;
	  	  this.description=description;
	  	  this.formula=formula;
	  	  this.metrics=metrics;
	}
	return {
		createDimension : function(dimension){
			//will be called from dashboard controller when creating a dimension
			return $http.post('/createDimension/', dimension)
			.then(
				function(response){
					return response.data;
				}, 
				function(errResponse){
					console.error('Error');
					return $q.reject(errResponse);
				}
			);
		},
		updateDimension : function(dimension, id){
			//does nothing yet
		}
	};
}]);