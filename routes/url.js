const express = require("express")
const router = express.Router();
const { handelGenrateNewUrl, handelGetAnalytics } = require("../controller/url");
const URL = require("../models/url");


router.post("/", handelGenrateNewUrl);

router.get("/:shortId", async (req, res) => {
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


router.get("/analytics/:shortId", handelGetAnalytics);

module.exports = router;