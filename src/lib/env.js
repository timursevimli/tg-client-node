'use strict';

const envSchema = require('env-schema');
const schema = require('../schema');

const env = envSchema({ schema: schema.env, dotenv: true });

module.exports = { env };
