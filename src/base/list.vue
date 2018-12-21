<template lang="html">
    <div class="list-content">
      <div v-for="item in data" class="list-item">
        <div class="list-img">
          <img v-lazy="item.pic">
          <div class="list-description">
            <span>{{item.duration}}</span>
            &nbsp;&nbsp;&nbsp;
            <span>{{computedCount(item.play)}}观看</span>
            &nbsp;&nbsp;
            <span>{{computedCount(item.video_review)}}弹幕</span>
          </div>
        </div>
        <div class="list-title">
          <p>{{item.title}}</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        props:{
          data:{
            type:Array,
            default:[]
          }
        },
        methods:{
          computedCount(num){
            let newN=(num/10000).toFixed(1);
            let des=newN>1?newN+"万":num;
            return des;
            // return (count/10000).toFixed(1);
          }
        }
    }
</script>

<style scoped lang="stylus" type="text/stylus">
  .list-content
    display: flex;
    flex-direction: column;
    .list-item
      width: 100%;
      padding: 45px 0;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      flex-direction: column;
      .list-img
        position: relative;
        width: 100%;
        height: 640px;
        border-radius: 30px;
        -webkit-border-radius: 30px;
        overflow: hidden;
        background: #fff;
        img
          position: absolute;
          top:0;
          width: 100%;
          height: 100%;
        
        .list-description
          position: absolute;
          bottom: 0px;
          color: #fff;
          font-size: 40px;
          padding: 0 0 8px 45px;
          background: linear-gradient(180deg,rgba(33,33,33,0),rgba(33,33,33,.5));
        
      
      .list-title
        margin: 30px 0 0 15px;
        font-size: 45px;
      
    
  
</style>
