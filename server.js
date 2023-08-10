const express = require("express")
const PORT = 8080
require("./config/database")
const router = require("./routes/studentRouter")

const app = express()
app.use(express.json())
app.use("/api",router)
app.use("/uploads", express.static("uploads"))



app.listen(PORT, () => {
    console.log(`server is listening to port ${PORT}`);
})