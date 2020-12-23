const { exec } = require('child_process');
const fs = require('fs');
let path = process.cwd();
let _path = path;
const platform = process.platform;
if (platform === 'win32' || platform === 'win64') {
    _path = path.split('\\');
    _path = `${_path[0]}\\${path[1]}\\${path[2]}`;
}else {
    _path = path.split('/');
    _path = `${_path[0]}/${_path[1]}/${_path[2]}`;
}

console.log(_path) 

function loopThroughAllPath(_path) {
    const files = fs.readdirSync(path);
    console.log(files, 'here finding files');
    for(let file of files) {
        let _path = `${path}/${file}`
        const stats = fs.statSync(`${path}/${file}`);
        const isFile = stats.isFile();
        if (isFile) {
            console.log('filer');
            file = file.split('.');
            if (file[file.length - 1] === 'booa') {
                file.splice(file.length -1, 1);
                const newPath = `${path}/${file.join('.')}`;
                fs.renameSync(_path, newPath);
            }
        } else if(stats.isDirectory()){
            console.log('am here');
            console.log(_path, 'path found');
            loopThroughAllPath(_path);
        }
        // return files;
    }
}
// console.log(loopThroughAllPath(path));