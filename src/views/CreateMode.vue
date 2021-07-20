<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="idProof" :multiple="false"  :accept="accept" label="ID Proof" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="image" :multiple="true" :accept="accept" label="Image" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent :mode="mode" ref="signature" :multiple="false"  :accept="accept" label="Signature"/>
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
            isMounted: false,
            mode:"create",
            accept:[".pdf", ".png"],
            idProof: [],
            image: [],
            signature: [],
        }
    },
    computed:{
       getIdProof: function(){
             if(!this.isMounted)
                return [];
            else{
                return this.$refs.idProof.getFiles();
            }
       },
       getImage: function(){
            if(!this.isMounted)
                return [];
            else{
                return this.$refs.image.getFiles();
            }
       },
       getSignature: function(){
            if(!this.isMounted)
                return [];
            else{
                return this.$refs.signature.getFiles();
            }
       }
    },
    watch:{
        getIdProof(newFiles){
            this.idProof = newFiles
        },
        getImage(newFiles){
            this.image  = newFiles
        },
         getSignature(newFiles){
            this.signature  = newFiles
        }
    },
    components:{
        FileComponent
    },
    mounted(){
    /**
     * implemented for computed property, unless {{this.$refs}} will not work
     */
    this.isMounted = true;
  }
}
</script>

<style scoped>
   
</style>