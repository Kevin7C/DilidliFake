<template lang="pug">
  .user
    ul
      li(class="item" v-for="item in list") {{item.name}}
    .image
      img(:src="img")
</template>

<script>
    export default {
        name: "user",
        data(){
          return {
            list:[
              {"name":"我的收藏"},
              {"name":"我的追番"},
              {"name":"播放记录"},
              {"name":"问题反馈群"},
              {"name":"D站大本部一群"},
              {"name":"D站大本部二群"},
              {"name":"D站公众号"}
            ],
            img:"http://www.dilidili.wang/uploads/allimg/180622/290_1918297861.png"
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .user
    display: flex;
    flex-direction: column;
    padding: 60px;
    background: #333;
    height: 100%;
    .item
      display: block;
      width: 100%;
      padding: 60px 0;
      color: white;
      text-align: left;
    
    .image
      vertical-align: middle;
      width: 100%;
      img
        width: 100%;
      
    
  

</style>
