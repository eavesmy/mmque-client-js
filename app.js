const net = require("net");
const models = require("./models");

function connection(port, host) {
    return net.createConnection(port, host)
}

var Client = function(options) {

    this.target_host = options.host;
    this.target_port = options.port;

    this.reConnectCount = 0;
    this._client = connection(this.target_port, this.target_host);

    this.keepAlive = options.keepAlive ? this.KeepAlive() : false;

    this._client.on("end", () => console.log("Mmque connection down"));
}

// Client.prototype.Write = function(data){
// this._client.write(data);
// }

Client.prototype.ReConnect = function() {

    this.reConnectCount++;
    this._client = null;
    this.errorCount = 0;

    if (this.reConnectCount >= 5) return;

    this._client = connection(this.target_port, this.target_host);
}

Client.prototype.KeepAlive = function() {

    let that = this;
    let buf = Buffer.alloc(2).fill();
    buf.writeInt16BE(-1, 0);

    function send() {
        that._client.write(buf);
    }

    return setInterval(send, 5000);
}

Client.prototype.Close = function() {

    clearInterval(this.keepAlive);

    this._client.end();
}

Client.prototype.Receive = function(fn) {

    this._client.on("data", data => {

        try {
            data = String(data);
            data = JSON.parse(data);
        } catch (e) {
            return
        }
		
        fn(data)
    });

    return this;
};

Client.prototype.Error = function(fn) {

    let that = this;

    this._client.on("error", err => {
        // that.ReConnect();
        that.errorCount++;

        fn(err);
    });

    return this;
};

Client.prototype.Push = function(pack) {

    let o = Object.assign({}, models.Push.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;
    o.Msg = pack.Msg;

    let buf = models.Push.Pack(o);

    this._client.write(buf);
};

Client.prototype.QueryOne = function(pack) {

    let o = Object.assign({}, models.QueryOne.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;

    let buf = models.QueryOne.Pack(o);

    this._client.write(buf);
};

Client.prototype.Pull = function(pack) {

    let o = Object.assign({}, models.Pull.Struct)
    o.Channal = pack.Channal;

    let buf = models.Pull.Pack(o);

    this._client.write(buf);
}

Client.prototype.Ack = function(pack) {

    let o = Object.assign({}, models.Ack.Struct);

    o.Channal = pack.Channal;
    o.Version = pack.Version;

    let buf = models.Ack.Pack(o);

    this._client.write(buf);
};

Client.prototype.NewVersion = function(pack) {
    let o = Object.assign({}, models.Version.Struct);

    o.Channal = pack.Channal;

    let buf = models.Version.Pack(o);

    this._client.write(buf)
};

module.exports = Client;
