<template lang="html">
  <div class="title-content">
    <div class="title-wrapper">
        <div v-for="(item,index) in data" :class="current===index?'checked':''" @click="select(item,index)" class="title-item">
          {{item.name}}
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        props:{
          data: {
            type: Array,
            default: function () {
              return [];
            }
          },
          currentIndex:{
            type: Number,
            default:0
          }
        },
        created(){
          this.current=this.currentIndex;
        },
        data(){
          return {
            current:0
          }
        },
        methods:{
          select(item,index){
            this.current=index;
            this.$emit('select',item);
          },
          setSelect(id){
            for(let i=0;i<this.data.length;i++){
              if(parseInt(this.data.id)===id){
                this.current=i;
                break;
              }
            }
          },
          getSelect(){
            return this.current;
          },
          reset(){
            this.current=0;
          }
        },
        watch:{
          currentIndex(newVal){
            this.current=parseInt(newVal);
          }
        }
    }
</script>

<style scoped lang="scss" type="text/scss">
  .title-content{
    background: #f9f9f9;
    text-align: center;
    .title-wrapper{
      padding-top: 15px;
      overflow: hidden;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      height: 123px;
      &::-webkit-scrollbar{
        width: 0px;
      }
      &::-webkit-scrollbar-track-piece{
        background: transparent;
      }
      .title-item{
        display: inline-block;
        padding: 30px;
        font-size: 45px;
        color: #666666;
        &.checked{
          color: #FB7299;
        }
      }
    }
  }
</style>
