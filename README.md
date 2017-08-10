# 2017SpringTeam06
User’s Guide

This guide is formatted to describe how a typical user would complete tasks relating to each requirement.

F1: The system must allow the user to create risk reports
	1.1: The user must be able to give the risk report a name and description
From the main page, click on “Create New” then “Report”. From there, fill in the name and description of the report.
	
F2: The system must allow the user to create risk dimensions
	2.1: A dimension must be created as a component of a risk report
Navigate to the main page, hover mouse over “create new” then select “report”. On the report page, scroll down to the button that says “add dimension” and click it. You will be redirected to the “Create Dimension” page.
	2.2: The user must be able to give a dimension a name, description, and weight
On the “Create Dimension” page, input the name and description of the dimension, as well as all of the names, descriptions, and binary/scalars of the metrics. Then finally click “Save Dimension.” The dimension weight can be assigned on the “Create Report” page.
2.3: The user must be able to copy a dimension
Navigate to the main page, hover mouse over “create new” then select “report”. On the report page, scroll down to the button that says “add dimension” and click it. You will be redirected to the “Create Dimension” page. On the dimension page, click the “Select existing dimension” drop down, then navigate to the dimension you want to edit, then click it. The fields will fill with the old values for the dimension you just selected. Edit them as you see fit, then click “Save Dimension” when done.
2.4: The user must be able to delete a dimension from a risk report
Navigate to the main page, hover mouse over “create new” then select “report”. While on the “Create Report page”, scroll down to the table that has all of the dimensions in it. Click the delete button in the row of the dimension to be removed. The dimension will be deleted.

F3: The system must allow the user to create risk metrics
3.1: A metric must be created as a component of a risk dimension
While creating a dimension, fill in data corresponding to risk metrics and add additional metrics if desired, using the “Add New Metric” button. 
	3.2: The user must be able to give a metric a name, description, and weight
Type the name in the name box, the description in the description box, and the weight in the weight box.
	3.3: A metric must be able to be assigned a type of scalar or binary
Click either the binary button or the scalar button to choose between scalar or binary.

F4: The system must allow the user to enter scores for a risk report
4.1: The user must be prompted to provide a score for each metric within each dimension associated with the risk report
Upon loading the report, the report will not display until a score is entered. Navigate to the enter scores page using the button on the left hand side of the dashboard after a report has been selected from the drop down.
4.2: A metric of type scalar must be able to be scored as an integer, 0 to 100
Use the sliding bar to score the metrics that are scalar.
4.3: A metric of type binary must be able to be scored as True or False
Use the drop down to give the binary metrics their values.

F5: The system should present risk report results
Open the main page. On the left, select which report you want to view from the drop down that says “Select Reports”.
	5.1: The overall report score should be representative of the scores assigned to
	each metric and the relative weights of each metric and dimension
Once you click “Select Reports”, a doughnut chart will appear on the page that has all of the dimensions represented along the outside of the chart as slices, and the overall report score in the center of the page.
5.2: The user should be able to see the relative contribution of each dimension to the overall report score, as well as the details of dimension and metric scores
Upon clicking any one of the dimension slices, which are sized to show the weight of that dimension in the report, the page will resize and a box will appear, detailing the metric information for the selected dimension.


A Working Walkthrough from Start to Finish

Navigate to application, click the dropdown menu that says “Create new” and select “report.” You will be brought to the create report page. Once there, give your report a name and description. Then click “Add Dimension” to start adding dimensions to reports. You will be brought to the create dimension page. Enter a name and description for the dimension, then as many metrics as you need, also with names and descriptions and weights. The click “Create Dimension” You will be brought back to the create report page. Continue until you have all the dimensions you need, then give each dimension weights (the box next to the delete button). Then once all that is done, click “Create Report”. Then go back to the dashboard page. Click on “Select report” and then choose the report you just created. Then click on “Enter scores” On the page you are brought to, enter scores for each metric in your report using the drop downs and sliding bars. Then click the button at the bottom when you are finished. Then back at the main page, select the report you made. It will be displayed in the form of a doughnut chart, with dimensions all around the outside. Click on any one of the dimensions and information specific to that dimension will be displayed.
