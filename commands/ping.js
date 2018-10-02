exports.run = (client, message, args) => {
    message.channel.send("PONG!").catch(console.error);
}