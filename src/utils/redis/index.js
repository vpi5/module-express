var redis = require("redis");

let client;


/**
 *
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 * @param callback 回调
 */

class Redis {
    constructor(config) {
        // 当 redis 配置不存在 那么就不在继续连接
        if(!config) return;
        client = redis.createClient(config.port, config.host);

        client.on('error',function (err) {
            logger.error('redis 创建连接时发生错误：'+ err);
        });

        client.auth(config.password, function(){
            logger.info('redis验证成功！')
        });

        client.on('connect',function () {
            logger.info('redis连接成功！')
        });
    }

    set = (dbNum, key, value, expire) => {
        return new Promise(callback => {
            client.select(dbNum, (err) => {
                if (err){
                    logger.error('redis set 选库失败：'+err);
                    callback(null);
                }else {
                    client.set(key,value, (err,result) => {
                        if (err){
                            logger.error('redis插入失败：'+err);
                            callback(null);
                            return
                        }
                        if (!isNaN(expire) && expire>0){
                            client.expire(key, parseInt(expire));
                        }
                        callback(result);
                    })
                }

            })
        })
    };

    get = (dbNum, key) => {
        return new Promise(callback => {
            client.select(dbNum, (err) => {
                if (err){
                    logger.error('redis get 选库失败：'+err);
                    callback(null);
                }else {
                    client.get(key, (err,result) => {
                        if (err){
                            logger.error('redis获取失败：'+err);
                            callback(null);
                            return
                        }
                        callback(result);
                    })
                }
            })
        })
    }
}

export default Redis;
