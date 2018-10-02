exports.run = (client, message, args) => {
    message.channel.send("Commands: food,ping,kick,ban,restart").catch(console.error);
}