const mongoose = require("mongoose")

async function handelConnectMongoDB(url) {
    return mongoose.connect(url)

}
module.exports = { handelConnectMongoDB }