const express = require("express")
const app = express();
const PORT = 5000
const path = require("path")
const urlRoute = require("./routes/url");
const { handelConnectMongoDB } = require("./connect");
const staticRoute = require("./routes/statsicRouter")



handelConnectMongoDB("mongodb://localhost:27017/newtest")
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log("error", err))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))

// Frontend Side
// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({})
//     return res.render("home", {
//         urlss : allUrls
//     })
// })

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // that means our html support multi data ...json , ...html form data



app.use("/url", urlRoute)
app.use("/", staticRoute)

app.listen(PORT, () => console.log("server started at PORT", PORT))