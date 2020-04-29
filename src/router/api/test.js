import dayjs from 'dayjs';
var express = require("express");
var router = express.Router();



router.get("/test", async (req, res, next) => {
    let {id, op} = req.query;
    let data = await mySQL.query('SELECT', `SELECT * FROM users WHERE id = 1`, []);
    let c = JSON.stringify({name : 5, code : '6'});
    let redisData = await redis.set('2', 'ccc', c);
    res.json({
        code : 'Y',
        message : '测试成功！',
        id, op,
        date : dayjs().format('YYYY-MM-DD'),
        sql : data,
        redisData
    })
});


module.exports = router;
