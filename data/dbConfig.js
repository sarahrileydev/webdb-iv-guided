//layer of protection between knex and routes

const knex = require('knex');
const knexConfig = require('../knexfile')

//pick the development configuration
module.exports = knex(knexConfig.development)