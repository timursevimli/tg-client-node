'use strict';

const fs = require('node:fs/promises');
const path = require('node:path');
const { StringSession } = require('telegram/sessions');

const SESSIONS_PATH = 'sessions';

const getSessionFile = (name) =>
  path.join(process.cwd(), SESSIONS_PATH, name + '.session');

const getSession = async (name = 'session') => {
  let session = new StringSession('');
  const sessionFile = getSessionFile(name);
  try {
    const data = await fs.readFile(sessionFile, { encoding: 'utf8' });
    session = new StringSession(data.trim());
  } catch {}
  return session;
};

const saveSession = async (session, name = 'session') => {
  const sessionFile = getSessionFile(name);
  const sessionString = session.save();
  await fs.writeFile(sessionFile, sessionString, 'utf8');
  return sessionString;
};

module.exports = { getSession, saveSession };
