/**
 * To run: mocha -u exports [path to this directory]/*
 */

var supertest = require('supertest'), app = require('../../app');

beforeEach(function () {
    app = require('../../app', {
        bustCache : true
    });
});

exports.get_main_page = function (done) {
    supertest(app).get('/')
    .expect(200)
    .end(done);
};

exports.post_main_page = function (done) {
    supertest(app)
    .post('/')
    .expect(404) // can't post to main page.
    .end(done);
};

exports.post_main_octothorp = function (done) {
    supertest(app)
    .post('/#')
    .expect(404) // can't post to main page.
    .end(done);
};

exports.get_main_octothorp = function (done) {
    supertest(app)
    .get('/#')
    .expect(200)
    .end(done);
};

exports.get_create_dimension = function (done) {
    supertest(app)
    .get('/createDimension')
    .expect(200)
    .end(done);
};

exports.get_create_report = function (done) {
    supertest(app)
    .get('/createReport')
    .expect(200)
    .end(done);
};

exports.test_other = function (done) {
    supertest(app)
    .get('/otherthing')
    .expect(404)
    .end(done);
};

exports.post_dimension = function (done) {
    supertest(app)
    .post('/createDimension')
    .expect(500) // this is expected behavior (having not
                // been mocked, the table won't be found,
               // this demonstrates that the route/API works; 404 would be failure)
    .end(done);
};

exports.post_report = function (done) {
    supertest(app).post('/createReport').expect(500) // same as above
    .end(done);
};

exports.get_report = function (done) {
    supertest(app).get('/createReport').expect(200).end(done);
};

exports.enter_score_get = function (done) {
    supertest(app).get('/enterScore').expect(200).end(done);
};

exports.enter_score_post = function (done) {
    supertest(app).post('/enterScore').expect(404) // posts to enterScore are
                                                    // not in the api. This is,
                                                    // essentially, a BVA.
    .end(done);
};