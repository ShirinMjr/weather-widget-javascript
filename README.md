 See this project on S3
 http://shirin-weather-app.s3-website-us-east-1.amazonaws.com/
 
 
 async function api(location) {
   let respons = await fetch(url + location + "&appid=" + apiKey);
   let json = await respons.json();
   console.log(json);
 }
