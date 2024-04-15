// const sessionIdToUserMap = new Map();
// stateless  
const jwt = require("jsonwebtoken")
const secret = "umg$2609$$"

function setUser(user) {
    // sessionIdToUserMap.set(id , user) // session (stateful server)

    return jwt.sign({
        _id: user._id,
        email: user.email
    }, secret)
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret)

    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}