'use strict';

const db = require('../server').db;
const ObjectID = require('mongodb').ObjectID;

class UserPermission {
  constructor(token, dbs) {
    dbs = dbs || db;
    this.userCollection = dbs.collection('users');
    this.userInfo = {};
    if(token) {
      this.userInfo = JSON.parse(Buffer.from(token.jwt.split('.')[1], 'base64').toString());
    }
  }

  async getPermission() {
    let userId = this.userInfo.sub;
    let permission = await this.userCollection.findOne({_id: ObjectID(userId)});

    return permission.permission;
  }

  canDelete(cb) {
    this.getPermission().then(perm => {
      if(cb) {
        cb(perm && perm !== 'viewOnly');
      }
    });

  }

  canCreate(cb) {
    this.getPermission().then(perm => {
      if(cb) {
        cb(perm && perm === 'all');
      }
    });

  }
}

module.exports = UserPermission;
