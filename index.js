process.env.NTBA_FIX_319 = 1;
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome", {
    "reply_markup": {
      "keyboard": [["Sample text", "Second sample"], ["Keyboard"], ["I'm robot"]]
    }
  });
});

bot.onText(/\/leave_group/, (msg) => {
  const chatId = msg.chat.id;

  bot.kickChatMember(chatId, msg.from.id).catch((error) => {
    console.log(error.code);  // => 'ETELEGRAM'
    console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: ...' }
    bot.sendMessage(chatId, error.response.body.description)
  });;
});


// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.onText(/\/get_month/, (msg) => {
  // 'msg' is the received Message from Telegram
  const chatId = msg.chat.id;
  switch (new Date().getMonth() + 1) {
    case 1:
      mm = "January";
      break;
      break;
    case 2:
      mm = "February";
      break;
    case 3:
      mm = "March";
      break;
    case 4:
      mm = "April";
      break;
    case 5:
      mm = "May";
      break;
    case 6:
      mm = "June";
      break;
    case 7:
      mm = "July";
      break;
    case 8:
      mm = "August";
      break;
    case 9:
      mm = "September";
      break;
    case 10:
      mm = "October";
      break;
    case 11:
      mm = "November";
      break;
    case 12:
      mm = "December";
      break;
  }
  bot.sendMessage(chatId, mm);
});

bot.onText(/\/get_day/, (msg) => {
  // 'msg' is the received Message from Telegram
  const chatId = msg.chat.id;
  switch (new Date().getDay()) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }
  bot.sendMessage(chatId, day);
});

bot.onText(/\/get_tithi/, (msg) => {
  // 'msg' is the received Message from Telegram
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "To Be Implemented! Need to gather data!!");
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  var send_msg = 1
  var send_audio = 0
  switch (msg.text.toString().toLowerCase()) {
    // Greetings here...
    case "hi":
    case "jai jinendra":
      msg = "Jai Jinendra"
      break;

    case "bye":
    case "ciao":
    case "see you":
      msg = "Hope to see you around again, Bye"
      break;

    case "thanks":
    case "thank you":
      msg = "My pleasure :+1: "
      break;

    case "leave group":
      msg = "Do you want to leave group? click here: /leave_group."
      break;
    case "play song":
      send_audio = 1
      send_msg = 0
      break
    default:
      send_msg = 0
      break;
  }
  if (send_msg) {
    bot.sendMessage(chatId, msg, reply_to_message_id => msg.body.from.id)
    return
  }
  if (send_audio) {
    var song = "/Users/abhijith.da/desktop backup/songs/karishma nagda/jeni aankho prasam zarti.mp3"
    bot.sendMessage(chatId, "Sending song: " + song)
    console.log("Sending audio " + song)

    bot.sendAudio(chatId, song).catch((error) => {
      console.log(error.code);  // => 'ETELEGRAM'
      console.log(error.response.body); // => { ok: false, error_code: 400, description: 'Bad Request: ...' }
      bot.sendMessage(chatId, error.response.body.description)
    });
    return
  }

  // send a message to the chat acknowledging receipt of their message
  // bot.sendMessage(chatId, chatId.toString() + '...!');
  bot.sendMessage(chatId, '...!');

  // getUserProfilePhotos(chatId)
});

