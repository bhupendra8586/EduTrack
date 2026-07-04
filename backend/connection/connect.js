const mongoose = require("mongoose");

async function connect_to_DB(url){
    return await mongoose.connect(url);
}

module.exports = connect_to_DB;