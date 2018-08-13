<template lang="html">
  <div>
    <List :data="data"></List>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getHome} from "../api/api";
  import {Response_OK} from "../api/config";
  import List from "../base/list"

  export default {
        name: "home",
        components: {List},
        comments:{
              List
            },
            created(){
              this._getHome();
            },
            data(){
              return{
                data:[]
              }
            },
        methods:{
          _getHome(){
            getHome().then((res)=>{
              if(res.code===Response_OK){
                try{
                  this.data=res.data.list;
                }catch(e){
                  console.error(e);
                }
              }else{
                console.error(res.message);
              }
            },(err)=>{
              console.log(err);
            })
          }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">

</style>
