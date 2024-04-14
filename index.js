const express = require("express")
const app = express();
const PORT = 5000
const path = require("path")
const { handelConnectMongoDB } = require("./connect");
//routes
const staticRoute = require("./routes/statsicRouter")
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user")
// cookies
const cookieParser = require("cookie-parser")
// when user not login then use this
const {restrictLoggedInUserOnly,checkAuth}= require("./middlewares/auth")


// MOngoDB connection 
handelConnectMongoDB("mongodb://localhost:27017/newtest")
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log("error", err))

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"))


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false })) // that means our html support multi data ...json , ...html form data
app.use(cookieParser()) // cokkie parser

// application routes
app.use("/url", restrictLoggedInUserOnly,urlRoute)
app.use("/user" , userRoute)
app.use("/",checkAuth, staticRoute)

// PORT
app.listen(PORT, () => console.log("server started at PORT", PORT))