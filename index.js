const express = require("express")
const app = express();
const PORT = 8001
const urlRoute = require("./routes/url");
const { handelConnectMongoDB } = require("./connect");
const URL = require("./models/url");

handelConnectMongoDB("mongodb://localhost:27017/newtest")
    .then(() => console.log("mongoDB connected")).catch((err) => console.log("error", err))


app.use(express.json())
app.use("/url", urlRoute)
app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            },
        }
    })
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log("server started at PORT", PORT))