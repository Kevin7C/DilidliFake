<template lang="html">
  <div class="app">
    <div class="left" v-show="flag">
      <user></user>
    </div>
    <div class="right" ref="right">
      <search @open="open"></search>
      <tab></tab>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="blocker" v-show="flag" ref="blocker" @click="back">
    </div>
  </div>
</template>

<script>
  import User from 'components/user'
  import Search from "components/search";
  import Tab from "components/tab";
  import Home from 'components/home'
  import {perfixStyle} from "./common/js/dom";

  const transform=perfixStyle('transform');
  const transitionDuration=perfixStyle('transitionDuration');
  export default {
  name: 'App',
  components: {
    Search,
    User,
    Tab,
    Home
  },
  data(){
    return {
      flag:false
    }
  },
  methods:{
    test(){
      this.$test_message({message:"fdfd"});
    },
    open(){
      this.flag=true;
      this.$refs.right.style[transform]=`translate3d(50%,0,0)`;
      this.$refs.right.style[transitionDuration]=`50ms`;
    },
    back(){
      this.flag=false;
      this.$refs.right.style[transform]=``;
      this.$refs.right.style[transitionDuration]=`50ms`;

    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .app
    .left
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 50%;
    
    .right
      display: flex;
      background: #fff;
      flex-direction: column;
      .bottom
        text-align: center;
        height: 100px;
        line-height: 100px;
      
    
    .blocker
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      height: 100%;
      width: 100%;
      transform: translate(50%,0);
      -webkit-transform: translate(50%,0);
      -moz-transform: translate(50%,0);
    
  
</style>
