import dayjs from 'dayjs';
import {mySQL} from '../../utils/mysql';
var express = require("express");
var router = express.Router();


router.get("/test", async (req, res, next) => {
    let {id, op} = req.query;
    let data = await mySQL.query('SELECT', `SELECT * FROM users WHERE id = 1`, []);
    res.json({
        code : 'Y',
        message : '测试成功！',
        id, op,
        date : dayjs().format('YYYY-MM-DD'),
        sql : data
    })
});


module.exports = router;
