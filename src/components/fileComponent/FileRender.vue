<template>
        <div >
            <div class="file-info">
                <div>
                    <i v-if="preview" class="fas fa-angle-down arrow"></i>
                    <i v-else class="fas fa-angle-right arrow" ></i>
                    <span class="file-name" @click="showPreview">{{fileinfo}}</span>
                 
                </div>
                <div>
                    <i v-if="deleteoption" class="fas fa-trash delete" @click="onDelete "></i>

                </div>
            </div>
            <b-overlay :show="isLoading" rounded="sm" variant="danger">
                <img v-if="preview" :src="fileUrl" alt="failed to load image" width="100%" height="250px" >
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
            fileUrl:"",
            isLoading: false
        }
    },
    
    methods:{
        showPreview(){
             if(this.fileinfo.match(/.pdf/)){
                getUrl("user1", this.fileinfo, (response, err)=>{
                    if(err){
                        alert(err)
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
                     getUrl("user1", this.fileinfo, (response, err)=>{
                            if(err){
                                alert(err)
                            }else if(response){
                                this.fileUrl = response;
                                this.isLoading = !this.isLoading
                        }
                    })

                }
                
            }

            
          
        },
        onDelete(){
            deleteFile("user1", this.fileinfo, (response, err)=>{
                console.log("hello")
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
        padding:2px 5px;
        margin: 2px 0;
        border-radius: 5px;
        justify-content: space-between;
        background:#857a7a;
        color: rgb(255, 255, 255);
        width:100%;
        align-items: center;
        cursor: default;
        
    }
    .file-name{
        width: 80%;
        overflow: hidden;
        cursor: pointer;
        margin-right: 5px;
    }
    .delete{
        cursor: pointer;
    }
    .arrow{
        margin-right: 3px;
    }
</style>