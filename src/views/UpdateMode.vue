<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-4">
                <FileComponent :mode="mode"  :multiple="true"  :accept="accept" label="ID Proof" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :fileList="image"  :multiple="true" :accept="accept" label="Image" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :fileList="image" :multiple="true"  :accept="accept" label="Signature"/>
            </div>
            
           
        </div>
    </div>
</template>
<script>
import FileComponent from '../components/fileComponent/FileComponent.vue'
export default {
    name:'Home',
    data(){
        return{
            mode:"update",
            image:["id1.jpg", "id2.png"],
            accept:[".pdf", ".png"]
        }
    },
    components:{
        FileComponent
    }
}
</script>

<style scoped>
   
</style>