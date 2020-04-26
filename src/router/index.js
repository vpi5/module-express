
// TODO 引用 node  fs、join 模块
var fs = require('fs');
var join = require('path').join;

function getJsonFiles(jsonPath){
    var jsonFiles = [];
    function findJsonFile(path){
        var files = fs.readdirSync(path);
        files.forEach(function (item, index) {
            if(item === 'index.js'){
                return;
            }
            var fPath = join(path,item);
            var stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                fileFile(fPath, item)
            }
            if (stat.isFile() === true) {
                var pathA = item.split('.js')[0];
                jsonFiles.push({
                    filePath : fPath,
                    apiPath : `/${pathA}`,
                });
            }
        });
    }

    function fileFile (pathName, name) {
        var files = fs.readdirSync(pathName);
        files.forEach(function (item) {
            var fPath = join(pathName,item);
            var stat = fs.statSync(fPath);
            if(stat.isDirectory() === true) {
                fileFile(fPath, `${name}/${item}`);
            }
            if (stat.isFile() === true) {
                jsonFiles.push({
                    filePath : fPath,
                    apiPath : `/${name}`,
                });
            }
        });
    }
    findJsonFile(jsonPath);
    return jsonFiles;
}

module.exports = getJsonFiles("src/router");
