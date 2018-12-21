<template lang="html">
  <div class="video-content" ref="videoRef">
    <block-list v-for="(item,index) in blockData"
                :key="item.key"
                :title="item.title"
                :data="item.list"
                :leaderboard="item.flag"
                :moreflag="item.more"
                :route-id="item.id?item.id:-1"
                @title="getTitle"
                @more="getMore"
    ></block-list>
    <Last></Last>
  </div>
</template>

<script>
    import BlockList from '../base/block-list'
    import Recommend from './recommend'
    import Last from './last'
    import {initData} from "../api/config";
    import {getRecommend,getOthers,getMore} from "../api/api";

    export default {
      components:{
        BlockList,
        Recommend,
        Last
      },
      created(){
        this.titleList=null;
        this.selectItem=null;
        this.init();

      },
      mounted(){
        let height=window.innerHeight-70-45-29;
        this.$refs.videoRef.style.height=`${height}px`;
      },
      data(){
        return {
          flag:true,
          blockData:[]
        }
      },
      methods:{
        getTitle(type,routeId){
          console.log(routeId);
          this.$router.push({
            path:`/${this.$route.path.split('/')[1]}/${routeId}`
          });
          this.$refs.videoRef.scrollTop=0;
        },
        getMore(pn){
          console.log(pn);
          if(this.selectItem){
            getMore(this.selectItem.id,pn).then((res)=>{
              // for(let i in res.data.archives){
              //   this.blockData[1].list.push(res.data.archives[i]);
              // }
              this.blockData[1].list=this.blockData[1].list.concat(res.data.archives);
            })
          }
        },
        init(){
          if(this.$route.params.id){
            let flag=false;
            let titleList=null;
            let selectItem=null;
            for(let i in initData){
              if(this.$route.path.indexOf(initData[i].value)>-1){
                let list=initData[i].list;
                titleList=list;
                for(let j in list){
                  if(parseInt(this.$route.params.id)===list[j].id){
                    selectItem=list[j];
                    if(j==0){
                      flag=true;
                      break;
                    }
                  }
                }
                break;
              }
            }
            this.titleList=titleList;
            this.selectItem=selectItem;
            this.flag=flag;
            if(flag){//推荐
              getRecommend(titleList).then((res)=>{
                this.blockData=res.data.map((item,index)=>{
                  let list=item.slice(0,4);
                  return {
                    title:index===0?"热门推荐":list[0].typename,
                    list:list,
                    flag:index===0?1:2,
                    key:"block_title_"+index,
                    id:titleList[index].id
                  }
                })
              });
            }else{//非推荐
              let tempList=[];
              getOthers(selectItem).then((res)=>{
                console.log(res.data);
                tempList.push({
                  title:"热门推荐",
                  list:res.data.slice(0,4),
                  flag:0,
                  key:"blockrecomend",
                  more:false
                })
                return getMore(selectItem.id,1)
              }).then((res)=>{
                tempList.push({
                  title:"最新视频",
                  list:res.data.archives,
                  flag:0,
                  key:"blockmore",
                  more:true
                });
                // this.blockData=[];
                this.blockData=tempList;
              });
            }
          }
        }
      },
      watch:{
        $route(){
          this.init();
          // console.error("id为空");
        }
      }
    }
</script>

<style scoped lang="stylus" type="text/stylus">
  .video-content
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;

</style>
