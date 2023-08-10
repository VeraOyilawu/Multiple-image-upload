const mongoose = require("mongoose")
const url = "mongodb://localhost/testDB"

mongoose.connect(url)
.then(() => {
    console.log("connected............");
})
.catch(() => {
    console.log("unable to connect...");
})