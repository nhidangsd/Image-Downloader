
var path = require('path');
const { getPhotoData, extractPhotoUrls } = require('./photo-utils');
const destPath = path.join(__dirname, '..', '..', 'downloads')
const fs = require('fs');
const request = require('request');
const { basename } = require('path');
const {chunk} = require('lodash');

var separateReqPool = {maxSockets: 20};
// {url: uri , pool: separateReqPool, hostname: 'mars.nasa.gov'}

const download = (uri, filename, callback) => {

    var options = {
        // host: "proxy",
        // port: 3000,
        // path: uri,
        // method: 'GET',
        // headers: {
        //     Host: "mars.nasa.gov"
        // }
    }
    return new Promise ((resolve, reject) => {
        request.head(uri, (err, res, body) => {
            return request(uri, options).pipe(fs.createWriteStream(filename)).on('close', () => {
                console.log(`=> File ${basename(uri)} has been downloaded.`);
                return resolve(callback)
            });
        });
    });
};

const downloadImageHandler = async (arrayUrls) => {
    /** Create chunks by 20 urls for each batch !*/
    const chunks = chunk(arrayUrls, 20);

    let sequencePromisesChain = Promise.resolve(true);
    chunks.forEach(_Array20Urls => {
        sequencePromisesChain = sequencePromisesChain.then(() => {
            return Promise.all(_Array20Urls.map((url) => {
                const fileName = path.join(destPath, basename(url));
                return download(url, fileName, () => {}); 
            }));
        }).then(() => {
            return new Promise(resolve => {
                /** Each download batch resolved immediately after previous batch finished !*/
                setTimeout(resolve, 0);
            });
        });
    });
    return sequencePromisesChain;
};


exports.downloadImages = async (filePath) => {

    try {
        const photoData = await getPhotoData(filePath);
        const photoUrls = await extractPhotoUrls(photoData);
        
        // Create directory to store images if not exist
        if (!fs.existsSync(destPath)){
            fs.mkdirSync(destPath);
        }
        downloadImageHandler(photoUrls)
        .then( () => {
            console.log("All images has been downloaded.")
        })

    }
    catch(err){
        console.log(err);
    }
}