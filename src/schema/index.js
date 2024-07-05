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
    MONITORING_CHANNEL: {
      type: 'string',
      default: 2021157282,
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
