const fs = require('fs');

const isDate =  (str) => {
    const date = Date.parse(str);
    return isNaN(date) ? false : true; 
}

const toISODate = function (str) {
    const date = new Date(str);
    return date.getFullYear()+ '-' + (date.getMonth()+1) + '-'+date.getDate();
}

const convertRtfToPlainText = function (rtfStr) {

    rtfStr = rtfStr.replace(/\\par[d]?/g, "");
    return rtfStr.replace(/\{\/?\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]*\n?(?:-?\d+)?[ ]?/g, "").trim();
}

exports.getDates = function (fileName) {

    try {
        const readFileLines = fileName =>
        fs
          .readFileSync(fileName)
          .toString('UTF8')
          .split('\n');
        
        
        let arr = readFileLines(fileName);
        let raw_dates = arr.map(line => convertRtfToPlainText(line)).filter(line => (line.length > 0 && isDate(line)))
        let dates = raw_dates.map( date => toISODate( date));
        return dates;
    }
    catch (err) {
        throw new Error(err)
    }
}

