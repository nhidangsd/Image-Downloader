const fs = require('fs');
const https = require('https');
const path = require('path');

module.exports.downloadFile = (url, callback) => {

    const fileName = Date.now()+ '-' + path.basename(url);
    const relativePath = `../public/images/${fileName}`;
    const fullPath = path.join(__dirname, relativePath);

    const req = https.get( url, (res) => {
        const fileStream = fs.createWriteStream(fullPath);
        res.pipe(fileStream);

        fileStream.on("error", (err) => {
            console.log("Error writing to the stream");
            console.log(err);
        })

        
        fileStream.on("close", () => {
            callback(fileName);
        })

        // close fileStream to prevent memoryleaks
        fileStream.on("finish", () => {
            fileStream.close();
            console.log("Done");
        })
    })

    // Handle Error
    req.on("error", (err) => {
        console.log("Error downloading the file");
        console.log(err);
    });

}
