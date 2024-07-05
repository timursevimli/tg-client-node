'use strict';

const readline = require('node:readline/promises');
const { TelegramClient, Api } = require('telegram');
const {
  logger,
  getSession,
  saveSession,
  env,
  config,
  parseMessage,
  createConnection,
} = require('./lib');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { APPID, APPHASH, PHONE, API_KEY, MONITORING_CHANNEL } = env;
const { host, port } = config;

const init = async (client, sessionName) => {
  await saveSession(client.session, sessionName);
  const me = await client.getMe();
  logger.log(`Connected as: ${me.username}`);
  const result = await client.invoke(new Api.help.GetNearestDc({}));
  const { thisDc, nearestDc } = result;
  logger.log(`Current DC: ${thisDc} Nearest DC: ${nearestDc}`);
};

const getClient = async (sessionName) => {
  const session = await getSession(sessionName);
  const client = new TelegramClient(session, APPID, APPHASH);
  await client.start({
    phoneNumber: () => PHONE,
    phoneCode: async () => await rl.question('Please enter the code: '),
    onError: (err) => {
      logger.error(err);
      process.exit(1);
    },
  });
  return client;
};

(async () => {
  const sessionName = 'first';
  const ws = await createConnection({ host, port, apiKey: API_KEY });
  ws.on('close', () => {
    logger.log('Connection closed');
    process.exit(1);
  });
  const client = await getClient(sessionName);
  await init(client, sessionName);
  client.addEventHandler((event) => {
    const data = parseMessage(event);
    if (!data || data.channelId === MONITORING_CHANNEL) return;
    const { image } = data;
    if (!image) return void ws.send(JSON.stringify(data), { binary: false });
    client.downloadMedia(image, {}).then(
      (buffer) => {
        const base64Image = buffer.toString('base64');
        const payload = { ...data, image: base64Image };
        ws.send(JSON.stringify(payload), { binary: true });
      },
      (err) => void logger.error(err),
    );
  });
})();

process.on('uncaughtException', (err) => {
  logger.error(err);
  process.exit(1);
});
