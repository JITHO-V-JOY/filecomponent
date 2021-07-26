<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
             <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :userId="userId" v-model="idProof" :multiple="true"  :accept="accept" label="ID Proof" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :userId="userId" v-model="image"  :multiple="true" :accept="accept" label="Image" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" :userId="userId" v-model="signature" :multiple="false"  :accept="accept" label="Signature"/>
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
            userId:"user4",
            mode:"read",
            idProof:["id1.jpg", "id2.png"],
            image:["img1.jpg", "img2.jpg"],
            signature:["sig.jpg"],
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