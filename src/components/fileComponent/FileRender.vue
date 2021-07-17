<template>
        <div >
            <div class="file-info">
                <span @click="showPreview">{{fileinfo}}</span>
                    <i v-if="deleteoption" class="fas fa-times" @click="onDelete"></i>
            </div>
            <b-overlay :show="isLoading" rounded="sm" variant="danger">
                <img v-if="preview" :src="fileUrl" alt="" width="100%" height="250px" >
            </b-overlay>
        </div>
               

</template>
<script>

import {deleteFile, getUrl} from "./services"

export default {
    name:"FileRender",
    props:["fileinfo", "deleteoption"],
    data(){
        return{
            preview: false,
            urlError: false,
            fileUrl:"",
            isLoading: false
        }
    },
    
    methods:{
        showPreview(){
             if(this.fileinfo.match(/.pdf/)){
                getUrl("abcd", this.fileinfo, (response, err)=>{
                    if(err){
                        this.urlError = !this.urlError
                    }else if(response){
                        this.fileUrl = response;
                        window.open(this.fileUrl)
                     }
                })
            }else{
                if(this.preview){
                    this.preview = !this.preview
                }else{
                     this.preview = !this.preview;
                     this.isLoading = !this.isLoading;
                     getUrl("abcd", this.fileinfo, (response, err)=>{
                            if(err){
                                this.urlError = !this.urlError
                            }else if(response){
                                this.fileUrl = response;
                                this.isLoading = !this.isLoading
                        }
                    })

                }
                
            }

            
          
        },
        onDelete(){
            deleteFile(this.fileinfo, (response, err)=>{
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
        background:#df4759;
        color: white;
        width:100%;
        align-items: center;
    }
</style>