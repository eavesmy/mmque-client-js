const Data = {};

Data.id = 4;

Data.Struct = {
    len: Number,
    Channal: String
}

Data.Pack = function(pack) {

    pack.len = Buffer.from(pack.Channal).length + 2;

    let buf = Buffer.alloc(pack.len + 4).fill();

    let index = 0;
    buf.writeInt16BE(Data.id, index);
    index += 2;

    buf.writeInt16BE(pack.len, index);
    index += 2;

    buf.writeInt16BE(Buffer.from(pack.Channal).length, index);
    index += 2;

    buf.write(pack.Channal, index, "utf8");

    return buf;
}

module.exports = Data;
