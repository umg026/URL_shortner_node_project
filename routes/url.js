const express = require("express")
const router = express.Router();
const {handelGenrateNewUrl, handelGetAnalytics } = require("../controller/url")



router.post("/", handelGenrateNewUrl);
router.get("/analytics/:shortId", handelGetAnalytics )
module.exports = router;