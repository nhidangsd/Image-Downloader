const NASA_API_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`;
const API_KEY = `TSPJnfspg1UHHElksj3PmNoPa5Aq1ijAb36c6UD7`;

const computeApiUrl = (date) => {
    const dateQs = `earth_date=${date}`;
    const apiQs = `api_key=${API_KEY}`;
    return `${NASA_API_URL}?${dateQs}&${apiQs}`;
  }
  
exports.getApiUrls = (dates) => {
      let ans = [];
  
      try{
          ans = dates.map( d => computeApiUrl(d));
      }
      catch (err){
          console.log(err)
      }
      return ans;
}