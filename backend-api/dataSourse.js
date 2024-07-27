const { default: mongoose } = require("mongoose")

const connect = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
}

module.exports = {
    connect
}