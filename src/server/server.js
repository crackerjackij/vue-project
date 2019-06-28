// 네이버 검색 API예제는 블로그를 비롯 전문자료까지 호출방법이 동일하므로 blog검색만 대표로 예제를 올렸습니다.
// 네이버 검색 Open API 예제 - 블로그 검색
var express = require('express');
var app = express();
var router = require('./router/index')(app);

 var server = app.listen(3000, function () {
   console.log('http://127.0.0.1:3000/search/news?query=검색어 app listening on port 3000!');
 });
