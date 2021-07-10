<template>
        <div >
            <div class="file-info">
                <span @click="showPreview">{{fileinfo.filename}}</span>
                    <i v-if="deleteoption" class="fas fa-times" @click="onDelete"></i>
                    </div>
                    <img v-if="preview" :src="fileurl+fileinfo._id" alt="" width="100%" height="200px" >
                </div>
               

</template>
<script>
import {fileurl} from "../../../public/config"
import {deleteFile} from "./services"
export default {
    name:"FileRender",
    props:["fileinfo", "deleteoption"],
    data(){
        return{
            preview: false,
            fileurl: fileurl
        }
    },
    
    methods:{
        showPreview(){
            if(this.fileinfo.filename.match(/.pdf/)){
                window.open(this.fileurl+ this.fileinfo._id)
            }else{
                this.preview = !this.preview
            }
        },
        onDelete(){
            deleteFile(this.fileinfo._id, (response, err)=>{
                if(err){
                    alert(err);
                }
                if(response){
                    this.$emit('delete', this.fileinfo._id)
                }
            })
        }
    }
}
</script>

<style scoped>
    .file-info{
        display: flex;
        padding: 2px;
        margin: 1px;
        justify-content: space-between;
        background: #f0f0f0;
        width:100%;
        align-items: center;
    }
</style>