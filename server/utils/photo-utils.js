
const fetch = require('node-fetch');
const { getDates } = require('./date-utils');
const { getApiUrls } = require('./url-helper');

const fetchData = (apiUrls) => {

    return Promise.all(apiUrls.map( apiUrls => fetch(apiUrls) ))
    .then( resp => Promise.all( resp.map( r => r.json() )))
    .catch(err => console.log(err));
    
}

const beautifyPhotoData = async (data) => {

    try {
        const photoDataByDate = await data.map( d => d.photos)
        const photoDataArray = await [].concat.apply([], photoDataByDate);
        return photoDataArray;
    }
    catch(err){
        console.log(err);
    }
}

exports.extractPhotoUrls = async (photoDataList) => {

    const urls =  await photoDataList.map( p => p.img_src);
    return urls;
}

exports.getPhotoData = async (filePath) => {
    let photoData = [];
    try {
        const dates = getDates(filePath);
        const apiUrls = await getApiUrls(dates);
        photoData = await fetchData(apiUrls).then( data => beautifyPhotoData(data))

    }
    catch (err){
        console.log(err);
    }
    return photoData;
}