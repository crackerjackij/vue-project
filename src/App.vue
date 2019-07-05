<template>
  <div id="app">
    <h1>NAVER 뉴스 검색 서비스</h1>
    <input type="text" v-model="searchTxt" @keyup.enter="search()" autofocus/>
    <!--<p>{{searchTxt}}</p>-->
    <p><button v-bind:class="{ active: isActive }" @click="search()">검색</button></p>

    <div>
      <div style="float:right">
        <span><input type='radio' value='sim' id='simR' v-model='sort'><label for='simR'>유사도순</label></span>
        <span><input type='radio' value='date' id='dateR' v-model='sort'><label for='dateR'>날짜순</label></span>
        <select v-model="displayCnt">
          <option v-for=' option in displayCnts ' :value=' option ' :key=' option '>
            {{ option }}
          </option>
        </select>
      </div>
      <table class='tb-border'>
        <colgroup>
          <col style='width:30%'/>
          <col style='auto'/>
          <col style='width:12%'/>
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
          <tr v-for=' (item, index) in resultJson' :key=' index ' class='tr-align'>
            <td v-html="item.title"></td>
            <td><a v-bind:href="item.link" target="_blank"><span v-html="item.description"></span></a></td>
            <td>{{item.pubDate | parsePrintDate}}</td>
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
      resultJson: [],
      isActive: false,
      displayCnt: 10,
      displayCnts: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
      sort: 'sim'
    }
  },
  methods: {
    search () {
      this.isActive = true
      axios.get(this.searchUrl, { params: this.param() })
        .then(result => {
          this.resultJson = result.data.items
        }).catch(function (error) {
          console.log(error)
        }).finally(() => { this.isActive = false })
    },
    param () {
      var param = {}
      param.query = this.searchTxt
      param.display = this.displayCnt
      param.start = '1'
      param.sort = this.sort
      return param
    }
  },
  filters: {
    parsePrintDate (pubDate) {
      var date = new Date(pubDate)
      return date.getFullYear() + '년' + (date.getMonth() + 1) + '월' + date.getDate() + '일'
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

table {
  width : 100%;
  border-top : 1px solid #92969a;
  border-collapse : collapse;
}
th, td {
  border-bottom : 1px solid #92969a;
  padding : 10px;
}
.tr-align {
  text-align : left;
}
.active {
  display : none;
}
</style>
