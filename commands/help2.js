const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Help")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Help","A list of bot commands")
    .addField("Food","Gets the bot to get you food")
    .addField("Ban","As the name says bans a user")
    .addField("Kick","As it says kicks the user a lot less harsh than ban")
    .addField("Ping","Pings the bots conection speed")
    .addField("invite","Gives you a link to invite the bot")


    message.channel.send(botembed);
}

module.exports.help = {
  name:"Help"
}