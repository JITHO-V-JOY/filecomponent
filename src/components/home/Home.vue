<template>
    <div class="container" style="margin-top:10px;">
        <div class="row">
            <div class="col-12 col-md-4">
                <FileComponent mode="create"  :arraylist="arraylist" :multiple="true"  :accept="accept" label="ID Proof" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent mode="update"  :arraylist="arraylist" :multiple="true" :accept="accept" label="Image" />
            </div>
              <div class="col-12 col-md-4">
                <FileComponent mode="create" :arraylist="arraylist"  :multiple="true"  :accept="accept" label="Signature"/>
            </div>
            
           
        </div>
    </div>
</template>
<script>
import FileComponent from '../fileComponent/FileComponent.vue'
import {getIDProof} from '../fileComponent/services'
export default {
    name:'Home',
    data(){
        return{
            mode:"create",
            arraylist:[],
            IDProof:["file_upload (1).png", "grace.png"],
            accept:[".pdf", ".png"]
        }
    },
    components:{
        FileComponent
    },
    created(){
        getIDProof("abcd", this.IDProof, (response, err)=>{
            if(err){
                alert(err);
            }
            if(response){
                console.log("response", response)
                this.arraylist = response
            }
        })
    }
}
</script>

<style scoped>
   
</style>