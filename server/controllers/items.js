'use strict';

const db = require('../server').db;
const ObjectID = require('mongodb').ObjectID;
const collection = db.collection('items');
var UserPermission = require('../services/userPermission');
const noPermissionMsg = 'You do not have permission to do this action.';

module.exports = {
  getItems: function getItems(req, res) {
    if(collection) {
      collection.find({}).toArray( (err, result) => {
        if(err) {
          return res.json({error: err});
        }

        return res.json(result);
      });
    }
  },
  deleteItem: function deleteItem(req, res) {
    let userPermission = new UserPermission(req.cookies);
    userPermission.canDelete(canDelete => {
      if(!canDelete) {
        return res.json({error: noPermissionMsg});
      }
      let id = ObjectID(req.params.id);
      if(collection) {
        collection.removeOne({_id: id}, (err, result) => {
          if(err) {
            return res.json({error: err});
          }

          return res.json(result);
        });
      }
    });

  },
  findItemByName: function findItem(req, res) {
    let query = {};
    if(req.params.name) {
      query = {name: {$regex: req.params.name}};
    }

    if(collection) {
      collection.find(query).toArray( (err, result) => {
        if(err) {
          return res.json({error: err});
        }

        return res.json(result);
      });
    }
  },

  findItem: function findItem(req, res) {
    let query = {};
    if(req.params.id) {
      query = {_id: ObjectID(req.params.id)};
    }

    if(collection) {
      collection.findOne(query).toArray( (err, result) => {
        if(err) {
          return res.json({error: err});
        }

        return res.json(result);
      });
    }
  },
  createItem: function createItem(req, res) {
    let userPermission = new UserPermission(req.cookies);
    userPermission.canDelete(canDo => {
      if (!canDo) {
        return res.json({error: noPermissionMsg});
      }
      let name = req.body.name;
      let imageData = req.body.imageData;
      if (collection) {
        collection.insertOne({name, imageData}, (err, result) => {
          if (err) {
            return res.json({error: err});
          }

          return res.json(result.ops[0]);
        });
      }
    });
  }
};
