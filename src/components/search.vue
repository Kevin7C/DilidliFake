<template lang="html">
  <div class="search">
    <div class="menu-wrapper" @click="open">
      <img :src="menuImg">
    </div>
    <div class="search-wrapper">
      <i class="icon-search"></i>
      <input type="text" v-model="query" class="input"/>
      <i class="icon-dismiss"></i>
    </div>
    <div class="user-wrapper">
      <img :src="userImg"/>
    </div>
  </div>
</template>

<script>
    export default {
        name: "search",
        created(){
        },
        data(){
          return {
            menuImg:"http://m.dilidili.wang/dist/18may/images/Menu.png",
            userImg:"http://m.dilidili.wang/dist/18may/images/user.png",
            query:""
          }
        },
        methods:{
          open(){
            this.$emit('open')
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  @import "../common/css/variable.styl";
  .search

    width: 100%;
    display: flex;
    height: 150px;
    flex-direction: row;
    padding:30px 15px;
    background: #fff;
    z-index: 99;
    .menu-wrapper
      width: 60px;
      margin-top: 30px;
      img
        width: 45px;

    .search-wrapper
      flex:1 1 80%;
      display: flex;
      align-items:center;
      box-sizing:border-box;
      width:100%;
      height:120px;
      margin: 0 20px;
      background: #f0f0f0;
      border-radius:90px;
      .input
        width: 100%;
        padding: 0 90px 0 90px;
        margin: 0 30px;
        font-size :50px
        line-height: 50px;
        background:#f0f0f0;
        background-image: url("http://m.dilidili.wang/dist/18may/images/search.png");
        background-repeat: no-repeat;
        background-size: 45px 45px;
        background-position: 30px;
      
    
    .user-wrapper
      width: 60px;
      margin-top: 30px;
      margin-right: 30px;
      img
        width: 45px;
      
    
  
  
</style>
