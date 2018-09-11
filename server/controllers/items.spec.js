const expect    = require('chai').expect;
const sinon     = require('sinon');
const sinonTest = require('sinon-test');
sinon.test     = sinonTest.configureTest(sinon);

describe('Server Controller of List items', () => {

  var server = require( '../server');
  var req = {params: {name:'', id:''}};
  var res = {};
  res.json = function() {};

  it('should return records from db', sinon.test(function() {
    const db = server.db;
    const collection = db.collection('items');
    const ObjectID = require('mongodb').ObjectID;
    const items = require('./items');
    let func = items.getItems;
    let spy = this.spy(func);
    func(req, res);
    expect(spy.calledOnce);
  }));

  it('should call findItemByName', sinon.test(function() {
    const db = server.db;
    const collection = db.collection('items');
    const ObjectID = require('mongodb').ObjectID;
    const items = require('./items');
    let func = items.findItemByName;
    let spy = this.spy(func);
    func(req, res);
    expect(spy.calledOnce);
  }));



});
