## 创建 express 项目

    1、 依次执行 以下 命令 添加项目依赖

        1、 npm install express - S  // 添加 express 应该框架
        2、 npm install body-parser -S // 添加 post body 参数解析
        3、 npm install mysql2  // 添加 mysql 数据库框架 配合 sequelize 和 sequelize-cli使用
        4、 npm install sequelize sequelize-cli -S  // 添加  sequelize 数据库应该
        5、 npm install nodemon -D  // 添加 nodemon 开发环境中 项目自动重启 框架
        6、 npm install pm2 -g  // 添加项目 生产环境 运维管理
        
    2、 package.json  script 中 添加  start  启动项
        
        "start" : "nodemon app.js"   
        
    3、 项目根目录下 添加 src 文件夹
    
    4、 添加线上环境 运维管理
        
        1、 执行命令 pm2 init
        2、 修改 init 后出现的 ecosystem.config.js 文件
            1、修改脚本名称
            2、添加 启动脚本 文件路径
            3、添加 启动服务的内核数量   
        
## pm2 运维命令

    1、 pm2 start ecosystem.config.js    // 启动命令
    2、 pm2 log  // 查看 log 日志
    3、 pm2 list // 查看 启动的 node 进程
    4、 pm2 restart [id]  // 重新启动 某一下 node 进程
