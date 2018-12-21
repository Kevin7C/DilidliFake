<template lang="html">
  <div class="block-content">
    <div class="title-content">
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div class="more" :class="leaderboard===1?'select':''" v-show="leaderboard!==0">
        <span @click="getTitle">{{moreName}}</span>
      </div>
    </div>
    <div class="video-content">
      <div v-for="item in data" class="item">
        <div class="item-img">
          <img v-lazy="item.pic" :key="item.pic">
          <div class="item-des">
            <span class="item-play">{{count(item.play)}}观看</span>
            <span class="item-review">{{count(item.video_review)}}评论</span>
          </div>
        </div>
        <div class="item-title">
          {{item.title}}
        </div>
      </div>
      <div class="video-more" v-show="moreflag" @click="getMore">
        点击加载更多
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "block-list",
        props:{
          data:{
            type:Array,
            default:function () {
              return [];
            }
          },
          title:{
            type: String,
            default: ""
          },
          leaderboard:{
            type:Number,
            default:0
          },
          moreflag:{
            type:Boolean,
            default:false
          },
          routeId:{
            type:Number,
            default:null
          }
        },
        created(){
          // console.log(this.data);
          this.pn=1;
        },
        computed:{
          moreName(){
            return this.leaderboard==1?"排行榜":this.leaderboard==2?"查看更多":"";
          }
        },
        methods:{
          count(num){
            let newN=(num/10000).toFixed(1);
            let des=newN>1?newN+"万":num;
            return des;
          },
          getTitle(){
            if(this.leaderboard===1){
              this.$emit('title','rank');
            }else{
              this.$emit('title','more',this.routeId,);
            }

          },
          getMore(){
            this.$emit('more',this.pn++);
          }
        },
        watch:{
          data(){
            // console.info("data",this.data);
          }
        }
    }
</script>

<style scoped lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .block-content
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    .title-content
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 45px 15px;
      .title
        font-size: 48px;

      .more
        font-size: 48px;
        color: #666666;
        &.select
          color: orange;

        &.none
          display: none;



    .video-content
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-between;
      .item
        display: flex;
        flex-direction: column;
        width: 508px;
        margin-bottom: 45px;
        .item-img
          position: relative;
          width: 100%;
          height: 314px;
          border-radius: 30px;
          overflow: hidden;
          img
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;

          .item-des
            position: absolute;
            width: 100%;
            height: 45px;
            bottom: 0;
            color: #fff;
            font-size: 45px;
            background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
            .item-play
              margin-left: 30px;

            .item-review
              margin-left: 60px;



        .item-title
          font-size: 38px;
          line-height: 50px;
          padding: 15px 0 0 9px;


      .video-more
        color: #FB7299;
        text-align: center;
        line-height: 105px;
        font-size: 39px;
        background: #e7e7e7;
        width:  100%;
        height: 105px;




</style>
