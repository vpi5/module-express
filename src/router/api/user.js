var express = require("express");
var router = express.Router();



router.post("/user", async (req, res, next) => {
    res.json({
        code : 'Y',
        message : '测试成功！',
        body : req.body
    })
});


module.exports = router;
