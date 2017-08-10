var assert = require('assert'), proxyquire = require('proxyquire'), SequelizeMock = require('sequelize-mock'), pathstub = {};
var httpMocks = require('node-mocks-http');
var createDimension = proxyquire('../../routes/createDimension.js', {
    'path' : pathstub
});

pathstub.models = require('./modelMock.js');
pathstub.Sequelize = require('sequelize-mock');
pathstub.env = process.env.NODE_ENV || "Testing";
pathstub.sequelize = SequelizeMock;

exports.it_should_save_a_dimension = function (done) {
    var met1 = {
        name : "metName",
        type : "binary",
        description : "metric description",
        weight : 10
    };

    var req  = httpMocks.createRequest({
        method: 'POST',
        url: '/createDimension',
        body: { name : "testName",
            description : "test descriptions",
            metrics : met1 }
    });
    
    var res = httpMocks.createResponse();
    createDimension.saveDimension(req, res);

    
    //var data = JSON.parse( res._getData() );
    console.log(res);
    assert.ok(res.json._isJSON());
    //assert.equal("testName", data.dimName);

    return done();
};

// exports.it_should_add_two_negative_numbers = function(done){
// var result = add(-2,-2);
// assert.ok(result === -4);
// return done();
// };
