const mongoose = require("mongoose");
const URI = "mongodb+srv://myBlog:Z1aGdtJAuZyA95SF@myblog.iguvv.mongodb.net/SertifikatSHirin"

module.exports = () => {
    //qCIK7k2eUhrfl8Uv
    try {
        mongoose.connect(URI, {
            useNewUrlParser: true, useUnifiedTopology: true
        });
        const db = mongoose.connection;
        db.on("open", () => {
            console.log("mongodb running");
        });
    } catch (error) {
        db.on("error", () => {
            console.log("server error");
        });
    }
};