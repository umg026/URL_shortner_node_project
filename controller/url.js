const shortid = require("shortid")
const URL = require("../models/url")

async function handelGenrateNewUrl(req, res) {

    const body = req.body
    if (!body.url) return res.status(400).json({ error: "URL is required" })

    const shortId = shortid()

    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: [],
    })

}

async function handelGetAnalytics(req,res) {
   const shortId = req.params.shortId;
   const results = await URL.findOne({ shortId})

   return res.json({
      totalClicks : results.visitHistory.length,
      analytics : results.visitHistory
   })
}
module.exports = { handelGenrateNewUrl, handelGetAnalytics }