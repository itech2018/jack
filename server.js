const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const prefix = (":");
const xp = require("./xp.json");
const spamFilter = {}; //It will hold 3 most recent messeges per user, making it harder to spam


// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on('ready', () => {
  client.user.setActivity('Bot in dev mode', { type: 'PLAYING' });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) { //I changed this to startsWith so it's shorter and more readable
    if (spamFilter.hasOwnProperty(message.author.id)) {
      if (spamFilter[message.author.id].includes(message.content)) return;  //return if the message content is in spamFilter array
    }
    if (!xp.hasOwnProperty(message.author.id)) {
      xp[message.author.id] = 2; //make the property if it doesn;t exist
    } else {
      xp[message.author.id] += 2; //increase the xp count
    }
    if (!spamFilter.hasOwnProperty(message.author.id)) {
      spamFilter[message.author.id] = [message.content]; //Makes the first array entry if it doesn't exist
    } else if (spamFilter[message.author.id].length < 3) {
      spamFilter[message.author.id].push(message.content); //Adds to the array if it exists and is smaller than 3
    } else {
      spamFilter[message.author.id].shift();
      spamFilter[message.author.id].push(message.content); //Adds and removes from the array if it's bigger than three
    }
    fs.writeFile("./xp.json", JSON.stringify(xp, null, 4), (err) => {
      if (err) console.error(err.message);
    }); //For some reason it isn't saving
  } else {
    
    // This is the best way to define args. Trust me.    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // The list of if/else is replaced with those simple 2 lines:
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args);
    } catch (err) {
      console.error(err);
    }
  }
});



client.login("NDUwOTg0OTU3NDY1MDY3NTIy.DjWuuQ.uaIjFjJ5OdcKQigT9prCvU1gGJc")
