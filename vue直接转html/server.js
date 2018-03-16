let http = require('http');
let fs = require('fs');
let path = require('path')

//需要访问的文件的存放目录
let documentRoot = 'E:/vue-html';


//根据文件确定mine类型
function content_type(file){
    var extname = path.extname(file);
    var type;
    switch(extname.toLowerCase()){
        case '.html':
            type = 'text/html';
            break;
        case '.js':
            type = 'text/javascript';
            break;
        case '.css':
            type = 'text/css';
            break;
        case '.jpg':
            type = 'image/jpg';
            break;
        default:type = 'text/plain';
    }
    return type;
}

http.createServer(function(req,res){
    let url = req.url;
    let file = documentRoot + url;
    console.log(file)
/*

    fs.readFile(file,function(err,data){
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }

        res.writeHead(200,{'content-type':content_type(file)+';charset="utf-8'});
        res.write(data);
        res.end();
    });
*/


    fs.readFile( file , function(err,data){
        console.log(data)
        if(err){
            res.writeHeader(404,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
            res.end();
        }else{
            res.writeHeader(200,{
                'content-type' : 'text/html;charset="utf-8"'
            });
            res.write(data);//将index.html显示在客户端
            res.end();
        }
    });

}).listen(8082);

console.log('服务开启成功')