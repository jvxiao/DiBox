const fs = require('fs')
const { resolve } = require('path')
const path = require('path')




// function getFileContent(filename, callback) {  
//     const fullFileName = path.resolve(__dirname,'files', filename )
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.error(err)
//             return 
//         }
//         callback(JSON.parse(data.toString()))
//         // console.log(data.toString())
//     })
// }

// // callback-hell 回调地狱
// getFileContent('a.json', Adata => {
//     console.log('a data', Adata)
//     getFileContent(Adata.next, Bdata => {
//         console.log('b data', Bdata),
//         getFileContent(Bdata.next, Cdata => {
//             console.log(Cdata)
//         })
//     })
// })

// 用promise 获取文件内容

function getFileContent(filename) {
    const promise = new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname,'files', filename )
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                // console.error(err)
                reject(err)
                return 
            }
            resolve(
                JSON.parse(data.toString())
            )
            // callback(JSON.parse(data.toString()))
            // console.log(data.toString())
        })
    })
    return promise
}

getFileContent('a.json').then(aData => {
    console.log('aData', aData)
    return getFileContent(aData.next)
}).then(bData => {
    console.log('bData', bData)
    return getFileContent(bData.next)
}).then(cData => {
    console.log('cData', cData)
})