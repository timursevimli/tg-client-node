'use strict';

const Ajv = require('ajv');

const ajv = new Ajv({ useDefaults: true });

const validate = (schema, data) => {
  const validator = ajv.compile(schema);
  if (validator(data)) return true;
  const [{ instancePath: key, message }] = validator.errors;
  const prop = key.includes('/') ? key.replace('/', '') : key;
  throw new Error(`${prop} ${message}`);
};

const sleep = (ms) => new Promise((r) => void setTimeout(r, ms));

const bindMethods = (object) => {
  const propNames = Object.getOwnPropertyNames(object);
  for (const propName of propNames) {
    const prop = object[propName];
    const isMethod = typeof prop === 'function';
    if (isMethod) object[propName] = prop.bind(object);
  }
};

const parseFromChat = (data) => {
  const { chatId, date, message, id } = data;
  const messageTime = date * 1000;
  const currentTime = Date.now();
  return {
    message,
    channelId: Number(chatId),
    messageId: id,
    messageTime,
    currentTime,
    differenceTime: currentTime - messageTime,
  };
};

const parseFromChannel = (data) => {
  const { peerId, date, message, id } = data.message;
  const { channelId } = peerId;
  const messageTime = date * 1000;
  const currentTime = Date.now();
  return {
    message,
    channelId: Number(channelId),
    messageId: id,
    messageTime,
    currentTime,
    differenceTime: currentTime - messageTime,
  };
};

const parsers = {
  UpdateShortChatMessage: parseFromChat,
  UpdateNewChannelMessage: parseFromChannel,
};

const parseMessage = (event) => {
  const { className, originalArgs } = event;
  const parser = parsers[className];
  if (!parser) return null;
  const result = parser(originalArgs);
  const image = event?.message?.media?.photo || null;
  if (!image) return result.message ? result : null;
  return { ...result, image };
};

module.exports = {
  sleep,
  validate,
  bindMethods,
  parseMessage,
};
