<template>
  <div>
    test

    {{ test.test }}
  </div>
</template>

<script>
  import XHR from '@/model/api/xhr'
  export default {
    data () {
      return {
        test: ''
      }
    },
    mounted () {
     let that = this
     let xhr = new XHR()
      xhr.request.method = 'get'
      xhr.request.url = 'http://192.168.10.105:8888/test'
      xhr.request.params = {}
      xhr.httpSuccess = res => {
        that.test = res
      }
     xhr.httpRequest()

    /* let that = this
     let xhr = new XMLHttpRequest()
      xhr.open("GET", 'http://192.168.10.105:8888/test',true);
      xhr.onreadystatechange=function(res){
        if(xhr.readyState==4) {
          if(xhr.status==200) {
            that.test = JSON.parse(res.target.response)
            console.log('success')
          } else {
            console.log('error')
          }
        }
      };
      xhr.send(null);*/
    }
  }
</script>
