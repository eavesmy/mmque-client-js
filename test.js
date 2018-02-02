const Client = require("./app.js");
const docs = require("docsMgr");

const config = docs.config.index;

let client = new Client(config.MmqueOption);

client.Ack({
    Channal: "test",
    Version: 2,
})

client.Receive(data => console.log(String(data)));
