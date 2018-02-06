const Client = require("./app.js");
// const docs = require("docsMgr");

// const config = docs.config.index;

// let options = Object.assing({
// keepAlive: true
// }, config.MmqueOption);

let client = new Client({
    keepAlive: true,
    host: "127.0.0.1",
    port: 8081
});

client.NewVersion({Channal:"BBB"})

client.Error(error => console.log(error))
/*
client.Pull({
    Channal: "test",
    Version: 2,
})
*/

client.Receive(data => console.log(String(data)));
