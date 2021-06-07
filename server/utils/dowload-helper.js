const { DownloaderHelper } = require('node-downloader-helper');
var path = require('path');
const { getPhotoData, extractPhotoUrls } = require('./photo-utils');
const destPath = path.join(__dirname, '..', '..', 'public', 'images')

const handleError = (error) => {
    console.log('handle your error nhi')
    console.log(error)
}
const downloadFile = async (url, destPath) => {

    try{
        const fileName = path.basename(url);
        const options = {
            fileName : fileName,
            httpRequestOptions: {
                timeout:  5 * 60 * 1000,
            }
        };

        const downloader = new DownloaderHelper(url, destPath, options);

        downloader
            .on('error', (error) => {
                downloader.stop();
                handleError(error);
            })
            .on('timeout', () => {
                console.log('damn it');
            })
            .on('progress', (stats) => console.log(stats.progress))
            .once('download', (downloadInfo) => {
                downloader.__request.connection.on('close', () => console.log(`=> File ${downloadInfo.fileName} has been downloaded.`));
                downloader.__request.connection.on('connect', () => console.log('*** Request connected again'));
                downloader.__request.on('timeout', () => {
                    console.log("Timeout Trigger");
                    downloader.__request.destroy();
                });
            })
            .start();
    }
    catch (err) {
        console.log('catch your damn error', err);
    }

    
    // const dl = new DownloaderHelper(url, destPath, {
    //     fileName : fileName,
    //     httpRequestOptions: {
    //         timeout:  5 * 60 * 1000
    //     }
    // });
    // dl.start();
    // // dl.on('download', (downloadInfo) => console.log(`\ndownloading ${downloadInfo.fileName}...`))
    // dl.on('progress', (stats) => console.log(stats.progress))
    // dl.on('timeout', () => { 
    //     console.log('this is time out ');
    //     dl.stop()
    // })
    // dl.on('resume', (isResume) =>  console.log(`Resume`));
    // dl.on('error', (error) => {
    //     console.log('NHI ',error.status)
    //     dl.stop();
    // })
    // dl.once('download', (downloadInfo) => {
    //     dl.__request.connection.on('close', () => console.log(`=> File ${downloadInfo.fileName} has been downloaded.`));
    //     dl.__request.connection.on('connect', () => console.log('*** Request connected again'));
    //     dl.__request.on('timeout', () => {
    //         console.log("Timeout Trigger");
    //         dl.__request.destroy();
    //     });
    // });
}

exports.downloadImages = async (filePath) => {

    try {
        const photoData = await getPhotoData(filePath);
        const photoUrls = await extractPhotoUrls(photoData);
    
        photoUrls.map( url => {
            downloadFile(url, destPath);
        })
    }
    catch(err){
        console.log(err);
    }
}