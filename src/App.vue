<template>
  <div id="app">
    <h1>NAVER 뉴스 검색 서비스</h1>
    <input type="text" v-model="searchTxt" />
    <p>{{searchTxt}}</p>
    <p><button @click="search()">검색</button></p>

    <div>
      <table id='tb'>
        <colgroup>
          <col style='width:30%'/>
          <col style='auto'/>
          <col style='width:10%'/>
        </colgroup>
        <thead>
          <tr>
            <th scope='col'>제목</th>
            <th scope='col'>내용</th>
            <th scope='col'>일자</th>
          </tr>
        </thead>
        <tbody v-if='resultJson.length == 0'>
          <tr>
            <td colspan='3'>검색결과가 없습니다.</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for=' item in resultJson' :key=' item.title '>
            <td>{{item.title}}</td>
            <td>{{item.description}}</td>
            <td>{{item.pubDate}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      searchTxt: '',
      searchUrl: '/search/news',
      resultJson: []
    }
  },
  methods: {
    search () {
      axios.get(this.searchUrl, { params: this.param() }).then(result => { this.resultJson = result.data.items }).catch(function (error) {
        console.log(error)
      })
    },
    param () {
      var param = {}
      param.query = this.searchTxt
      param.display = '10'
      param.start = '1'
      param.sort = 'sim'

      return param
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#tb {
  border : '1px solid #92969a'
}
</style>
