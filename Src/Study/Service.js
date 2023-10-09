const fs = require("fs");

// function writeFile(path) {
//     const file = fs.openSync(`files/${path}`, 'w+')
//     fs.writeFileSync(file, "Text/n")
//     if (path.includes("temp")) {
//         fs.closeSync(file)
//         return
//     }
//     fs.writeSync(file, "Permanent")
//     fs.closeSync(file)
// }

function writeFile(path) {
    using file = fs.openSync(`files/${path}`, 'w+')
    fs.writeFileSync(file, "Text/n")
    if (path.includes("temp")) {
        // fs.closeSync(file)  no need to cleanup already garbaged when use using
        return
    }
    fs.writeSync(file, "Permanent")
    fs.closeSync(file)
}

writeFile("a.txt");
writeFile("temp.txt")