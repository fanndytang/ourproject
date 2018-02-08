<template>
  <div>
    test
  </div>
</template>

<script>
  export default {
    mounted () {
     /* this.$http.get('http://192.168.10.105:8888/test', (res) => {
        console.log('请求结束')
        console.log(res)
      }).catch(() => {
        console.log('catch请求结束')
      })*/

     let xhr = new XMLHttpRequest()
      xhr.open("GET", 'http://192.168.10.105:8888/test',true);
      xhr.onreadystatechange=function(res){
        if(xhr.readyState==4) {
          if(xhr.status==200) {
            console.log(JSON.parse(res.target.response))
            console.log('success')
          } else {
            console.log('error')
          }
        }
      };
      xhr.send(null);
    }
  }
</script>
