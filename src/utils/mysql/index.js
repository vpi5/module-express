let mysql = require('mysql');


class mySQL {
    constructor(config) {
        if(!config){
            return;
        }
        this.config = config;
    }

    query = (sqlType, sql, params) => {
        return new Promise(callback => {
            this.sendQuery(sql, params).then(res => {
                if(sqlType === 'UPDATE' || sqlType === 'DELETE'){
                    if(res.affectedRows > 0){
                        callback(true);
                    }else {
                        callback(false)
                    }
                    return;
                }
                if(res.length === 0){
                    res = null;
                }
                callback(res)
            }).catch(err => {
                callback(err);
                logger.error(`sql数据库操作失败，sql：${sql}`);
            });
        })
    };

    sendQuery = (sql, params) => {
        return new Promise(callback => {
            //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
            var connection = mysql.createConnection(this.config);
            connection.connect(function(err){
                if(err){
                    logger.error('数据库链接失败，sql：', sql);
                    throw err;
                }
                //开始数据操作
                connection.query( sql, params, function(err,results,fields ){
                    if(err){
                        logger.error('数据操作失败，sql：', sql);
                        throw err;
                    }
                    //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
                    callback && callback(JSON.parse(JSON.stringify(results)));
                    //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
                    //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                    connection.end(function(err){
                        if(err){
                            logger.error('关闭数据库连接失败！');
                            throw err;
                        }
                    });
                });
            });
        })
    }
}

module.exports = mySQL;
