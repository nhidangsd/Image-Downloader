
const { getPhotoData } = require('../utils/photo-utils');
var path = require('path');
const filePath = path.join(__dirname, '..', '..', 'dates.txt');

module.exports.imageController = function(req, res, next) {

    getPhotoData(filePath)
        .then(data => res.json({
            photos: data,
        }))
        .catch(err => console.log(err));

}