'use strict';

const schema = require('../schema');
const config = require('../../config.json');
const { validate } = require('./utils');

validate(schema.config, config);

module.exports = { config };
