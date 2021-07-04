<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-2">
                <File  />
            </div>
              <div class="col-12 col-md-4">
                <File  />
            </div>
              <div class="col-12 col-md-4">
                <File  />
            </div>
            
           
        </div>
    </div>
</template>
<script>
import File from '../fileComponent/File.vue'
export default {
    name:'Home',
    components:{
        File
    }
}
</script>

<style scoped>
   
</style>