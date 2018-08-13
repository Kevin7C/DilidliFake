<template lang="html">
  <div class="tab" >
    <div class="tab-details" ref="tabDetails">
      <div class="tab-details-wrapper">
        <router-link tag="a" v-for="(item,index) in data" :key="index" :to="item.value" >
          {{item.name}}
        </router-link>
      </div>
      <div class="switch-up">
        <span @click="up">上拉</span>
      </div>
    </div>
    <div class="tab-wrapper">
      <div class="test">
        <router-link tag="div" :key="index+222" class="tab-item" v-for="(item,index) in data" :to="item.value">
          <p class="tab-link">{{item.name}}</p>
        </router-link>
      </div>
    </div>
    <div class="switch-down" @click="down">
      下拉
    </div>
  </div>
</template>

<script>
    import {initData} from "../api/config";
    import {perfixStyle} from "../common/js/dom";

    const transform=perfixStyle('transform');
    const transitionDuration=perfixStyle('transitionDuration');
    export default {
        name: "tab",
        created(){
          this.data=initData;
        },
        data(){
          return {
            data:[],
            show:false
          }
        },
        methods:{
          up(){
            this.$refs.tabDetails.style[transform]=`translate(0,-100%)`;
            this.$refs.tabDetails.style[transitionDuration]=`500ms`;
            // this.show=false;
          },
          down(){
            this.$refs.tabDetails.style[transform]=`translate(0,0)`;
            this.$refs.tabDetails.style[transitionDuration]=`500ms`;
            // this.show=true;
          }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
@import "../common/css/variable.scss";
.tab{
  width: 100%;
  font-size: 0;
  overflow: hidden;
  .tab-details{
    position: absolute;
    display: flex;
    flex-direction: column;
    background: #fff;
    z-index: 3;
    font-size: 45px;
    transform: translate(0,-100%);
    -webkit-transform: translate(0,-100%);
    overflow: hidden;
    .tab-details-wrapper{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      a{
        display: block;
        color: #666666;
        text-decoration: none;
        margin: 0 39px;
        padding: 45px 0 30px 0px;
        &.router-link-active{
          color:#FB7299 !important;
          border-bottom: 4px solid #FB7299;
        }
      }
    }
    .switch-up{
      text-align: center;
      margin: 30px;
    }
  }
  .tab-wrapper{
    display: inline-block;
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll; /* 1 */
    -webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-overflow-scrolling: touch; /* 2 */
    overflow-scrolling: touch;
    text-align: justify; /* 3 */
    height: 90px;
    &::-webkit-scrollbar{
      width: 0px;
    }
    &::-webkit-scrollbar-track-piece{
      background: transparent;
    }
    .test{
      height: 90px;
      .tab-item{
        display: inline-block;
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 45px;
        color: #666666;
        padding: 6px 0;
        margin: 0 45px;
        .tab-link{
          border-bottom: transparent;
        }
        &.router-link-active{
          .tab-link{
            color: #FB7299 !important;
            border-bottom: 4px solid #FB7299;
          }
        }
      }
    }
  }
  .switch-down{
    /*z-index: 11;*/
    position: absolute;
    font-size: 45px;
    right: 90px;
    top: 220px;
  }
}


</style>
