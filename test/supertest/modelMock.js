"use strict";
module.exports = function (SequelizeMock, DataTypes) {
    var report = SequelizeMock.define("report", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'Report_ID'
        },
        report_name : {
            type : DataTypes.STRING,
            field : 'Report_Name'
        },
        report_description : {
            type : DataTypes.STRING,
            field : 'Report_Description'
        },
        report_weight : {
            type : DataTypes.INTEGER,
            field : 'Report_Weight'
        },
        report_permissionlevel : {
            type : DataTypes.INTEGER,
            field : 'Report_PermissionLevel'
        },
    }, {
        underscored : true
    });

    var dimension = SequelizeMock.define("dimension", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'Dimension_ID'
        },
        // report_id: {
        // type: DataTypes.INTEGER,
        // field: 'Report_ID'
        // },
        dimension_name : {
            type : DataTypes.STRING,
            field : 'Dimension_Name'
        },
        dimension_description : {
            type : DataTypes.STRING,
            field : 'Dimension_Description'
        },
        dimension_weight : {
            type : DataTypes.INTEGER,
            field : 'Dimension_Weight'
        },
    }, {
        underscored : true
    });

    dimension.belongsTo(report); // should add report_id to dimension

    var metric = SequelizeMock.define("metric", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'Metric_ID'
        },
        // dimension_id: {
        // type: DataTypes.INTEGER,
        // field: 'Dimension_ID'
        // },
        metric_name : {
            type : DataTypes.STRING,
            field : 'Metric_Name'
        },
        metric_type : {
            type : DataTypes.STRING,
            field : 'Metric_Type'
        },
        metric_description : {
            type : DataTypes.STRING,
            field : 'Metric_Description'
        },
        metric_weight : {
            type : DataTypes.INTEGER,
            field : 'Metric_Weight'
        },
    }, {
        underscored : true
    });

    metric.belongsTo(dimension); // should add dimension_id to metric

    var reportScore = SequelizeMock.define("reportScore", {
        rs_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'RS_ID'
        },
        rs_date : {
            type : DataTypes.DATE,
            field : 'RS_Date'
        },
        rs_value : {
            type : DataTypes.INTEGER,
            field : 'RS_Value'
        }
    }, {
        underscored : true
    });

    reportScore.belongsTo(report);

    var dimensionScore = SequelizeMock.define("dimensionScore", {
        ds_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'DS_ID'
        },
        ds_value : {
            type : DataTypes.INTEGER,
            field : 'DS_Value'
        }
    }, {
        underscored : true
    });

    dimensionScore.belongsTo(dimension);
    dimensionScore.belongsTo(reportScore);

    var metricScore = SequelizeMock.define("metricScore", {
        ms_id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            field : 'MS_ID'
        },
        ms_value : {
            type : DataTypes.INTEGER,
            field : 'MS_Value'
        },
    }, {
        underscored : true
    });

    metricScore.belongsTo(metric);
    metricScore.belongsTo(dimensionScore);

    return [ report, dimension, metric, metricScore, dimensionScore,
            reportScore ];
};