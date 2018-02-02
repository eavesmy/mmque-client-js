const net = require("net");
const models = require("./models");

var Client = function(options) {

    this.target_host = options.host;
    this.target_port = options.port;
    this._client = net.createConnection(this.target_port, this.target_host);

    this._client.on("end", () => console.log("Mmque connection down"));
}

// Client.prototype.Write = function(data){
// this._client.write(data);
// }

Client.prototype.Receive = function(fn) {
    this._client.on("data", fn);
}

Client.prototype.Error = function(fn) {
    let that = this;
    that._client.on("error", fn);
}

Client.prototype.Push = function(pack) {

    let o = Object.assign({}, models.Push.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;
    o.Msg = pack.Msg;

    let buf = models.Push.Pack(o);

    this._client.write(buf);
}

Client.prototype.Pull = function(pack) {

    let o = Object.assign({}, models.Pull.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;

    let buf = models.Pull.Pack(o);

    this._client.write(buf);
}

Client.prototype.Ack = function(pack) {

    let o = Object.assign({}, models.Ack.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;

    let buf = models.Ack.Pack(o);

    this._client.write(buf);

}

module.exports = Client;
