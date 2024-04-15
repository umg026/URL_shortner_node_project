const User = require("../models/user")
const { v4: uuidv4 } = require("uuid")
const { setUser } = require("../service/auth")

async function handelUserSignUp(req, res) {
    const { name, email, password } = req.body

    await User.create({
        name,
        email,
        password
    })
    return res.redirect("/")
}

async function handelUserLogin(req, res) {
    const { email, password } = req.body

    const user = await User.findOne({ email, password })

    if (!user) res.render("login", {
        error: "Invalid Username or password"
    })

    // const sessionId = uuidv4();   //for session id
   const token =  setUser(user);
    res.cookie("uid" , token);

    return res.redirect("/")
}

module.exports = {
    handelUserSignUp, handelUserLogin
}