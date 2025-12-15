const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;

const app = express();
const bot = new TelegramBot(TOKEN, { polling: true });

let CHAT_ID = null;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

bot.on('message', (msg) => {
  if (!CHAT_ID) {
    CHAT_ID = msg.chat.id;
    bot.sendMessage(CHAT_ID, '✅ Чат подключён. Сайт готов принимать данные.');
    console.log('Chat ID:', CHAT_ID);
  }
});

app.post('/send', (req, res) => {
  const number = req.body.number;

  if (!CHAT_ID) {
    return res.send('❌ Сначала напишите боту в Telegram');
  }

  bot.sendMessage(CHAT_ID, `📩 С сайта пришло число: ${number}`);
  res.send('');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server started'));
