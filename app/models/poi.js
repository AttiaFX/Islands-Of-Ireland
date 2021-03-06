'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  category: String,
  location: String,
  image: Buffer,
});

module.exports = Mongoose.model('Poi', poiSchema);
