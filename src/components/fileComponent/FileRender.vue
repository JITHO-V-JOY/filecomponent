<template>
        <div >
            <div class="file-info">
                <span @click="showPreview">{{fileinfo.name}}</span>
                    <i v-if="deleteoption" class="fas fa-times" @click="onDelete"></i>
                    </div>
                    <img v-if="preview" :src="fileinfo.url" alt="" width="100%" height="200px" >
                </div>
               

</template>
<script>

import {deleteFile} from "./services"
export default {
    name:"FileRender",
    props:["fileinfo", "deleteoption"],
    data(){
        return{
            preview: false,
        }
    },
    
    methods:{
        showPreview(){
            if(this.fileinfo.name.match(/.pdf/)){
                window.open(this.fileinfo.url)
            }else{
                this.preview = !this.preview
            }
        },
        onDelete(){
            deleteFile(this.fileinfo.name, (response, err)=>{
                if(err){
                    alert(err);
                }
                if(response){
                    this.$emit('delete', response)
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