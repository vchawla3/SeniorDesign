

//reports and dimensions need to all be made together for this to work. Not really sure why
describe('Create a new Report', function() {
	  it('should add a dimension with special characters', function() {
	    
	//	 browser.ignoreSynchronization = true;
	    browser.get('http://localhost:3000/');

	    /*
	    element(by.id('dropdownCreate')).click();
	    element(by.id('createDimensionButton')).click();
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 1');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 1');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 1');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 1');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('saveDimension')).click();
	    
	    element(by.id('dropdownCreate')).click();
	    element(by.id('createDimensionButton')).click();
	    
	    var EC = protractor.ExpectedConditions;
	    var isClickable = EC.elementToBeClickable(element(by.id('addDimensionName')));
	    browser.wait(isClickable, 30000);

	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 2');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 2');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 2');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 2');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('addNewMetric')).click();
	    element(by.id('metricNameInput1')).click().sendKeys('Metric Name 3');
	    element(by.id('metricDescriptionInput1')).click().sendKeys('Metric Description 3');
	    element(by.id( "metricTypeInputScalar1")).click()
	    element(by.id('metricWeightInput1')).click().sendKeys('3');
	    element(by.id('saveDimension')).click();

		    
	    element(by.id('dropdownCreate')).click();
	    element(by.id('createDimensionButton')).click();
	    browser.wait(isClickable, 5000);
	    //at this point we are at the create new dimension form
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 3');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 3');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 4');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 4');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('saveDimension')).click();

	    element(by.id('dropdownCreate')).click();
	    element(by.id('createDimensionButton')).click();
	    browser.wait(isClickable, 5000);
	    //at this point we are at the create new dimension form
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 4!@#$%^&*');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 4^%$#@!');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 5()^^%^&');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 5()^^%^&');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('saveDimension')).click();
		
		  */
	    element(by.id('dropdownCreate')).click();
	    element(by.id('createReportButton')).click();
	    
	    //at this point we are at the create new dimension form
	    element(by.id('addReportName')).click().sendKeys('Report 1');
	    
	    
	    
	    
	    
	    
	    element(by.id('addDimension')).click();
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 1');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 1');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 1');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 1');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('saveDimension')).click();
	    
	    
	    browser.sleep(800);
	    element(by.id('addDimension')).click();
	    
	    

	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 2');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 2');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 2');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 2');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('addNewMetric')).click();
	    element(by.id('metricNameInput1')).click().sendKeys('Metric Name 3');
	    element(by.id('metricDescriptionInput1')).click().sendKeys('Metric Description 3');
	    element(by.id( "metricTypeInputScalar1")).click()
	    element(by.id('metricWeightInput1')).click().sendKeys('3');
	    element(by.id('saveDimension')).click();

	    browser.sleep(800);
	    element(by.id('addDimension')).click();
	    
	    //at this point we are at the create new dimension form
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 3');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 3');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 4');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 4');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    element(by.id('saveDimension')).click();

	    browser.sleep(800);
	    element(by.id('addDimension')).click();
	    
	    //at this point we are at the create new dimension form
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 4!@#$%^&*');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 4^%$#@!');
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 5()^^%^&');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 5()^^%^&');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
		
	    
	    browser.sleep(800);
	    
	    element(by.id('weight0')).click().sendKeys('1');
	    element(by.id('weight1')).click().sendKeys('2');
	    element(by.id('weight2')).click().sendKeys('3');
	    element(by.id('weight3')).click().sendKeys('4');
	    element(by.id('saveReport')).click();
	    
	    
	    element(by.id('dashboardButton')).click();
		browser.sleep(1000);
		element(by.id('single-button-rep')).click();
		browser.sleep(1000);
		element(by.id('actualReport')).click();
		browser.sleep(1000);
		
		element(by.id('single-button-score')).click();
	    browser.sleep(800);
	    
	/*    element(by.id('single-button-rep')).click();
		browser.sleep(2000);
		element(by.id('actualReport')).click();
		browser.sleep(1000);
		
		element(by.id('single-button-score')).click();
	    browser.sleep(1000);*/
	    
	    element(by.id('saveScores')).click();
	    
	 //   browser.ignoreSynchronization = false;
	  }); 
	});
/*
describe('Add Weights to Report', function() {
	  it('should add weights to a report', function() {
		//  browser.ignoreSynchronization = true;
		//browser.sleep(3000);
	    //browser.get('http://localhost:3000/enterScore/?reportId=1');
		element(by.id('dashboardButton')).click();
		browser.sleep(1000);
		element(by.id('single-button-rep')).click();
		browser.sleep(1000);
		element(by.id('actualReport')).click();
		browser.sleep(1000);
		
		element(by.id('single-button-score')).click();
	    browser.sleep(3000);
	    
	    //element(by.id('saveScores')).click();
	 //   browser.ignoreSynchronization = false;
	   
	  });
	});*/

describe('Select Report', function() {
	  it('should select a report', function() {
	    browser.get('http://localhost:3000');
	    
	    element(by.id('single-button-rep')).click();
	    browser.sleep(3000);
	    element(by.id('actualReport')).click();
	    
	   
	  });
	});




describe('Create New Dimension 1', function() {
	  it('should add a dimension', function() {
		 
	    browser.get('http://localhost:3000/');

	    
	    element(by.id('dropdownCreate')).click();
	    element(by.id('createDimensionButton')).click();
	    
	    //at this point we are at the create new dimension form
	    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 1');
	    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 1');
	    
	    
	    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 1');
	    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 1');
	    element(by.id( "metricTypeInputScalar0")).click()
	    element(by.id('metricWeightInput0')).click().sendKeys('1');
	    
	    
	    element(by.id('saveDimension')).click();
	  });
	});




	describe('Create New Dimension 2', function() {
		  it('should add a dimension', function() {
		    browser.get('http://localhost:3000/');

		    
		    element(by.id('dropdownCreate')).click();
		    element(by.id('createDimensionButton')).click();
		    
		    //at this point we are at the create new dimension form
		   // browser.actions().mouseMove(element(by.id('addDimensionName'))).click().sendKeys('Dimension Name 2');
		   element(by.id('addDimensionName')).click().sendKeys('Dimension Name 2');
		    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 2');
		    
		    
		    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 2');
		    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 2');
		    element(by.id( "metricTypeInputScalar0")).click()
		    element(by.id('metricWeightInput0')).click().sendKeys('1');
		    
		    element(by.id('addNewMetric')).click();
		    element(by.id('metricNameInput1')).click().sendKeys('Metric Name 3');
		    element(by.id('metricDescriptionInput1')).click().sendKeys('Metric Description 3');
		    element(by.id( "metricTypeInputScalar1")).click()
		    element(by.id('metricWeightInput1')).click().sendKeys('3');
		    
		    element(by.id('saveDimension')).click();
		  });
		});

	describe('Create New Dimension 3', function() {
		  it('should add a dimension', function() {
		    browser.get('http://localhost:3000/');
		    element(by.id('dropdownCreate')).click();
		    element(by.id('createDimensionButton')).click();
		    
		    //at this point we are at the create new dimension form
		    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 3');
		    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 3');
		    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 4');
		    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 4');
		    element(by.id( "metricTypeInputScalar0")).click()
		    element(by.id('metricWeightInput0')).click().sendKeys('1');
		    element(by.id('saveDimension')).click();
		  });
		});


	describe('Create New Dimension 4 (special characters)', function() {
		  it('should add a dimension with special characters', function() {
		    browser.get('http://localhost:3000/');
		    element(by.id('dropdownCreate')).click();
		    element(by.id('createDimensionButton')).click();
		    
		    //at this point we are at the create new dimension form
		    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 4!@#$%^&*');
		    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 4^%$#@!');
		    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 5()^^%^&');
		    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 5()^^%^&');
		    element(by.id( "metricTypeInputScalar0")).click()
		    element(by.id('metricWeightInput0')).click().sendKeys('1');
		    element(by.id('saveDimension')).click();
		   
		  });
		});


	describe('Create New Dimension 5', function() {
		  it('should add a dimension', function() {
		    browser.get('http://localhost:3000/');
		    element(by.id('dropdownCreate')).click();
		    element(by.id('createDimensionButton')).click();
		    
		    //at this point we are at the create new dimension form
		    element(by.id('addDimensionName')).click().sendKeys('Dimension Name 5');
		    element(by.id('addDimensionDescription')).click().sendKeys('Dimension Description 5');
		    element(by.id('metricNameInput0')).click().sendKeys('Metric Name 7');
		    element(by.id('metricDescriptionInput0')).click().sendKeys('Metric Description 7');
		    element(by.id( "metricTypeInputScalar0")).click()
		    element(by.id('metricWeightInput0')).click().sendKeys('1');
		    element(by.id('saveDimension')).click();
		  });
		});

	//function to make sure that the dimension data created is saved to the database
	describe('Check Dimension Created', function() {
		  it('should retrieve values from database', function() {
			browser.ignoreSynchronization = true;
			  
		    browser.get('http://localhost:3000/createDimension/getd'); 	    
		    expect(element(by.tagName('body')).getText()).toContain('Dimension Name 1');
		    expect(element(by.tagName('body')).getText()).toContain('Dimension Description 1');
		    browser.get('http://localhost:3000/createDimension/getm'); 
		    expect(element(by.tagName('body')).getText()).toContain('Metric Name 1');
		    expect(element(by.tagName('body')).getText()).toContain('Metric Description 1');
		    			  
		    browser.ignoreSynchronization = false;
		  });
	});

	//function to make sure that the dimension data created is saved to the database
	describe('Check Dimension Created', function() {
		  it('should retrieve values from database', function() {
			  browser.ignoreSynchronization = true;
		    browser.get('http://localhost:3000/createDimension/getd'); 	    
		    expect(element(by.tagName('body')).getText()).toContain('Dimension Name 2');
		    expect(element(by.tagName('body')).getText()).toContain('Dimension Description 2');
		    browser.get('http://localhost:3000/createDimension/getm'); 
		    expect(element(by.tagName('body')).getText()).toContain('Metric Name 2');
		    expect(element(by.tagName('body')).getText()).toContain('Metric Description 2');
		    expect(element(by.tagName('body')).getText()).toContain('Metric Name 3');
		    expect(element(by.tagName('body')).getText()).toContain('Metric Description 3');
		    browser.ignoreSynchronization = false;  
		  });
	});
