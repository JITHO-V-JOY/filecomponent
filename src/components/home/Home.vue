<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-3">
                <FileComponent :mode="mode" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :arraylist="arraylist" />
            </div>
            
           
        </div>
    </div>
</template>
<script>
import FileComponent from '../fileComponent/FileComponent.vue'
export default {
    name:'Home',
    data(){
        return{
            mode:"create",
            arraylist:[],
        }
    },
    components:{
        FileComponent
    }
}
</script>

<style scoped>
   
</style>