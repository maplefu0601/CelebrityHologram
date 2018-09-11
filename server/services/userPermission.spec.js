const expect    = require('chai').expect;
const sinon     = require('sinon');
const sinonTest = require('sinon-test');
import UserPermission from './userPermission';
sinon.test     = sinonTest.configureTest(sinon);

describe('UserPermission', () => {
  const tokenFalse = {
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YjkzMzQ5ZmY3NjllODM4ZDQ5MjI1NjUiLCJpYXQiOjE1MzY1Mzc1OTUzNTIsImV4cCI6MTUzNzE0MjM5NTM1Mn0.9zWkorFXAct2PoWHz1Vmvd4m27xd93h9coPQ7kHz5Rg"
  };
  const tokenTrue = {
    jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1Yjk1OTA3OWYyZmZlZjc3NjY2MGE3N2QiLCJpYXQiOjE1MzY2MDk0ODIxMDYsImV4cCI6MTUzNzIxNDI4MjEwNn0.DWdaDd0umOpyEbh1bsSQQvdKbxaU8W8In5IbzzKG0kk"
  };
  var server = require( '../server');
  it('canDelete should callback false for viewOnly user', sinon.test(function() {
    const db = server.db;
    //const ObjectID = require('mongodb').ObjectID;
    //console.log(db);
    let spy = this.spy(UserPermission.prototype, 'canDelete');
    let userP = new UserPermission(tokenFalse, db);

    return userP.canDelete((ret)=>{
      expect(ret).to.equal(false);
    });
  }));

  it('canCreate should callback false for viewOnly user', sinon.test(function() {
    const db = server.db;
    //const ObjectID = require('mongodb').ObjectID;
    //console.log(db);
    let spy = this.spy(UserPermission.prototype, 'canCreate');
    let userP = new UserPermission(tokenFalse, db);

    return userP.canCreate((ret)=>{
      expect(ret).to.equal(false);
    });
  }));

  it('canDelete should callback TRUE for user who has delete permission', sinon.test(function() {
    const db = server.db;
    //const ObjectID = require('mongodb').ObjectID;
    //console.log(db);
    let spy = this.spy(UserPermission.prototype, 'canDelete');
    let userP = new UserPermission(tokenTrue, db);

    return userP.canDelete((ret)=>{
      expect(ret).to.equal(true);
    });
  }));

  it('canCreate should callback TRUE for user who has create permission', sinon.test(function() {
    const db = server.db;
    let spy = this.spy(UserPermission.prototype, 'canCreate');
    let userP = new UserPermission(tokenTrue, db);

    return userP.canCreate((ret)=>{
      expect(ret).to.equal(true);
    });
  }));
});
