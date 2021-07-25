<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="idProof" v-model="idProof" :multiple="true"  :accept="accept" label="ID Proof" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="image" v-model="image" :multiple="true" :accept="accept" label="Image" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="signature" v-model="signature" :multiple="false"  :accept="accept" label="Signature"/>
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
            mode:"create",
            accept:[".pdf",".png", ".jpg", ".docx"],
            idProof: [],
            image: [],
            signature: [],
        }
    },
    components:{
        FileComponent
    }
}
</script>

<style scoped>
   
</style>