var express = require("express");
var router = express.Router();



router.get("/test", async (req, res, next) => {
    res.json({
        code : 'Y',
        message : '测试成功！',
    })
});


module.exports = router;
