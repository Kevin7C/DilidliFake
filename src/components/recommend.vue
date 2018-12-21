<template lang="html">
  <div class="recommend-content">
    <block-list v-for="(item,index) in data"
                :key="item.key"
                :title="item.title"
                :data="item.list"
                :leaderboard="item.flag"
                :moreflag="item.more"
    >

    </block-list>
  </div>
</template>

<script>
    import BlockList from '../base/block-list'
    export default {
        name: "recommend",
        props:{
          data:{
            type:Array,
            default:function () {
              return [];
            }
          }
        },
        components:{
            BlockList
        },
        methods:{
          getTitle(){

          },
          getMore(){

          }
        }
    }
</script>

