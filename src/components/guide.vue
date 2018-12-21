<template lang="html">
  <div class="guide-content">
    <title-list :data="titleData.list" :current-index="currentIndex" @select="select" ref="titleRef"></title-list>
    <router-view></router-view>
  </div>
</template>

<script>
    import TitleList from '../base/title-list'
    import {initData} from "../api/config";
    export default {
        name: "guide",
        components:{
          TitleList
        },
        created(){
          let itemData=null;
          for(let i=0;i<initData.length;i++){
            let item=initData[i];
            if(this.$route.path.indexOf(item.value)>-1){
              itemData=item;
              break;
            }
          }
          this.titleData=itemData;
          let list=this.titleData.list;
          if(this.$route.params.id){
            for (let index in list){
              if(parseInt(this.$route.params.id)===list[index].id){
                this.currentIndex=parseInt(index);
                break;
              }
            }
          }else{
            // console.log(this.$route.path.indexOf('home')>-1);
            if(!(this.$route.path.indexOf('home')>-1)){
              this.select(this.titleData.list[0]);
            }
          }
        },
        data(){
          return {
            titleData:[],
            currentIndex:0
          }
        },
        methods:{
          select(item){
            this.$router.push({
              path:`/${this.$route.path.split('/')[1]}/${item.id}`
            });
          },
          setTitleData(data){
            this.titleData=data;
          },
        },
        watch:{
          $route(){
            for(let i=0;i<initData.length;i++){
              let item=initData[i];
              if(this.$route.path.indexOf(item.value)>-1){
                this.titleData=item;
                break;
              }
            }
            if(this.$route.params.id){
              // console.log("12");
              let list=this.titleData.list;
              for(let i in list){
                if(parseInt(list[i].id)===parseInt(this.$route.params.id)){
                  // this.$refs.titleRef.setSelect(i);
                  this.currentIndex=parseInt(i);
                  break;
                }
              }
            }else{
              // console.log(this.$route.path.indexOf('home')>-1);
              if(!(this.$route.path.indexOf('home')>-1)){
                this.select(this.titleData.list[0]);
                this.$refs.titleRef.reset();
              }
            }
          }
        }
    }
</script>

<style scoped lang="stylus" type="text/stylus" >
  .guide-content
    width: 100%;

</style>
