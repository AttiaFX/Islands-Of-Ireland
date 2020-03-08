'use strict';

const Accounts = require('./app/controllers/accounts');
const Pois = require('./app/controllers/pois');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/signup', config: Accounts.showSignup },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'POST', path: '/signup', config: Accounts.signup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },
  { method: 'GET', path: '/useradmin', config: Accounts.useradmin },
  { method: 'GET', path: '/useradmin/{id}', config: Accounts.deleteuser },

  { method: 'GET', path: '/home', config: Pois.home },
  { method: 'GET', path: '/fulllist', config: Pois.fulllist },
  { method: 'POST', path: '/addpoi', config: Pois.addpoi },
  { method: 'GET', path: '/fulllist/{id}', config: Pois.deletepoi },
  { method: 'POST', path: '/updatepoi/{id}', config: Pois.updatePoi },
  { method: 'GET', path: '/updatepoi/{id}', config: Pois.showUpdatePoi },






  { method: 'GET', path: '/{param*}', handler: {
      directory:
      {
        path: './public'
      }
    },
    options: { auth: false }
  }
];
