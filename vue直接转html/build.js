let fs = require('fs')
let path = require("path")

//获取当前目录绝对路径，这里resolve()不传入参数
let filePath = path.resolve()

// 读取html头部内容
let head = fs.readFileSync(filePath + '/layout/head.html', 'utf8');

// 读取html底部内容
let foot = fs.readFileSync(filePath + '/layout/foot.html', 'utf8');

let filelist = require('./filelist')
let files = filelist.files

files.forEach(function(filename) {
    if(filename) {
        fs.readFile(filePath + filename, 'utf8', function(err, data) {
            if(err) {console.log(err);return false;}

            if(filename.indexOf('.html') === -1) {
                let start = data.indexOf('<template>')
                let end = data.indexOf('<\/template>')
                let template = data.substring(start + 10, end)

                let start1 = data.indexOf('<script>')
                let end1 = data.indexOf('<\/script>')
                let script = data.substring(start1 + 8, end1)

                script = '<script type="module">' + script + '</script>\n'

                data = head + '<div class="main-content">'+ template +'</div>' + '\n' + script + foot
            }

            let pagePath = filename.replace('/pages', '').replace('.vue', '.html')
            let arr = (filePath + '\\admin' + pagePath).split('/')
            let baseUrl = arr.slice(0, arr.length - 1).join('\\')


            //  如果没有目录创建目录
            if (!fs.existsSync(baseUrl)) {
                fs.mkdirSync(baseUrl);
            }
            fs.writeFile(filePath + '/admin' + pagePath, data, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log(pagePath +" 文件生成完成");
            });
        })
    }
})

