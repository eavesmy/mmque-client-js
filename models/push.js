const Data = {};

Data.id = 1;

Data.Struct = {
    len: Number,
    Channal: String,
    Version: Number,
    Msg: String
}

Data.Pack = function(pack) {

    pack.len = Buffer.from(pack.Msg).length + Buffer.from(pack.Channal).length + 2 + 4;

    let buf = Buffer.alloc(pack.len + 4).fill();

    let index = 0;
    buf.writeInt16BE(Data.id, index);
    index += 2;

    buf.writeInt16BE(pack.len, index);
    index += 2;

    buf.writeInt16BE(pack.Version, index);
    index += 2;

    buf.writeInt16BE(Buffer.from(pack.Channal).length, index);
    index += 2;

    buf.write(pack.Channal, index, "utf8");
    index += Buffer.from(pack.Channal).length;

    buf.writeInt16BE(Buffer.from(pack.Msg).length, index);
    index += 2;

    buf.write(pack.Msg, index, "utf8");

	return buf;
}

module.exports = Data;
