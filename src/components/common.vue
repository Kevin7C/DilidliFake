<template lang="html">
  <div class="common-content">
    <title-list :data="titleData.list" @select="select" ref="titleRef"></title-list>
    <block-list v-for="(item,index) in blockData" :key="item.key"
                :title="item.title"
                :data="item.list"
                :leaderboard="item.flag" >

    </block-list>
    <router-view></router-view>
  </div>
</template>

<script>
    import TitleList from '../base/title-list'
    import BlockList from '../base/block-list'
    import {initData} from "../api/config";
    import {getCommon,getRecommend,getOthers,getMore} from "../api/api";

    export default {
        name: "common",
        components: {BlockList, TitleList},
        comments:{
            TitleList,
            BlockList
        },
        created(){

        },
        mounted(){

        },
        updated(){

        },
        data(){
          return {
            test:"dfdfd",
            titleData:[],
            selectItem:null,
            blockData:[]
          }
        },
        methods:{
          setTitleData(data){
            this.titleData=data;
          },
          select(item){
            console.info('select',item);
            this.selectItem=item;
          },
          _getCommon(item){
            if(this.titleData.list[item].id===1){
              getRecommend(this.titleData.list);
            }
          }
        },
        watch:{
          $route(one,two){
            for(let i=0;i<initData.length;i++){
              let item=initData[i];
              if(this.$route.path.indexOf(item.value)>-1){
                this.titleData=item;
                break;
              }
            }
          },
          titleData(){
            // if(!this.selectItem){
            //   this.selectItem=this.titleData.list[0];
            // }
            if(this.titleData.list){
              this.selectItem=this.titleData.list[0];
            }
          },
          selectItem(){
            if(this.selectItem){
              if(this.selectItem.name.indexOf("推荐")>-1){
                getRecommend(this.titleData.list).then((res)=>{
                  this.blockData=res.data.map((item,index)=>{
                    let list=item.slice(0,4);
                    return {
                      title:index===0?"热门推荐":list[0].typename,
                      list:list,
                      flag:index===0?1:2,
                      key:"block"+index
                    }
                  })
                });
              }else{
                let tempList=[];
                getOthers(this.selectItem).then((res)=>{
                  console.log(res.data);
                  tempList.push({
                    title:"热门推荐",
                    list:res.data.slice(0,4),
                    flag:0,
                    key:"bllock"+"g"
                  })
                  return getMore(this.selectItem.id,1)
                }).then((res)=>{
                  tempList.push({
                    title:"最新视频",
                    list:res.data.archives,
                    flag:0
                  });
                  console.log(tempList);
                  // this.blockData=[];
                  this.blockData=tempList;
                });
                // getMore(this.selectItem.id,1).then((res)=>{
                //   console.log(res.data);
                // });
              }
            }
          }
        },
        beforeRouteEnter(to,from,next){
          console.log("RouterEnter");
          let itemData=null;
          for(let i=0;i<initData.length;i++){
            let item=initData[i];
            if(to.path.indexOf(item.value)>-1){
              itemData=item;
            }
          }
          next(vm=>{
            vm.setTitleData(itemData);
          });
        },
        beforeRouteUpdate(to,from,next){
          console.log("RouterUpdate");
          next();
        },
        beforeRouteLeave(to,from,next){
          console.log("RouterLeave");
          next();
        }
    }
</script>

<style scoped lang="stylus" type="text/stylus">
  .common-content
    width: 100%;
    .test
      width: 100%;
      height: 120px;
      background: pink;


</style>
