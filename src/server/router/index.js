module.exports = function(app)
{
  var client_id = 'client_id';
  var client_secret = 'cliend_secret Key';

  app.get('/search/news', function (req, res) {
     console.log("검색 API 요청 :: " + req.query.query);
     var api_url = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(req.query.query); // json 결과
  //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
     var request = require('request');
     var options = {
         url: api_url,
         headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
      };
     request.get(options, function (error, response, body) {
       if (!error && response.statusCode == 200) {
         res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
         res.end(body);
       } else {
         res.status(response.statusCode).end();
         console.log('error = ' + response.statusCode);
       }
     });
   });
}
