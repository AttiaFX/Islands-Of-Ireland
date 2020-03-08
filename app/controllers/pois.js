'use strict';

const Poi = require('../models/poi');
const User = require('../models/user');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');

const Pois = {
  home: {
    handler: async function(request, h) {
      return h.view('home', { title: 'Make a POI' });
    }
  },
  fulllist: {
    handler: async function(request, h) {
      try {
        const pois = await Poi.find().lean();
        return h.view('fulllist', {
          title: 'POIs to Date',
          pois: pois
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  showUpdatePoi: {
    handler: async function(request, h) {
      try {
        const id = request.params.id;
        const poi = await Poi.findById(id).lean();
        return h.view('updatepoi', {
          title: 'Edit POI',
          poi: poi
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  addpoi: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const newPoi = new Poi
        ({
          name: data.name,
          description: data.description,
          category: data.category,
          location: data.location,
          image: data.image,
        });
        await newPoi.save();
        return h.redirect('/fulllist');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  updatePoi: {
    handler: async function(request, h) {
      try {
        const data = request.payload;
        const id = request.params.id;
        const poiToUpdate = await Poi.findById(id);
        poiToUpdate.name = data.name;
        poiToUpdate.description = data.description;
        poiToUpdate.category = data.category;
        poiToUpdate.location = data.location;
        poiToUpdate.image = data.image;
        await poiToUpdate.save();
        return h.redirect('/fulllist');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  deletepoi:
    {
      handler: async function(request, h) {
        try {
          const id = request.params.id;
          await Poi.findByIdAndDelete(id);

          return h.redirect('/fulllist');
        } catch (err) {
          return h.view('main', { errors: [{ message: err.message }] });
        }
      }
    }
};

module.exports = Pois;
