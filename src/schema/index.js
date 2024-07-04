'use strict';

const env = {
  type: 'object',
  required: ['APPID', 'APPHASH', 'PHONE', 'API_KEY', 'AUTH_TOKEN'],
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
    AUTH_TOKEN: {
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
    ignoredChannels: {
      type: 'array',
      default: [],
    },
  },
};

module.exports = { env, config };
