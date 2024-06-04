'use strict';

const env = {
  type: 'object',
  required: ['APPID', 'APPHASH', 'PHONE', 'API_KEY'],
  properties: {
    APPID: {
      type: 'number',
    },
    APPHASH: {
      type: 'string',
    },
    PHONE: {
      type: 'string',
    },
    API_KEY: {
      type: 'string',
    },
  },
};

const config = {
  type: 'object',
  required: ['host', 'port'],
  properties: {
    host: {
      type: 'string',
    },
    port: {
      type: 'number',
    },
  },
};

module.exports = { env, config };
