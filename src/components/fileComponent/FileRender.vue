<template>
        <div >
            <div class="file-info">
                <div>
                    <i v-if="preview" class="fas fa-angle-down arrow-active"></i>
                    <i v-else class="fas fa-angle-right arrow-right" ></i>
                    <span v-if="preview" class="file-name-active" @click="showPreview">{{fileinfo}}</span>
                    <span v-else class="file-name" @click="showPreview">{{fileinfo}}</span>

                </div>
                <div>
                    <i v-if="deleteoption" class="fas fa-trash delete" @click="onDelete "></i>

                </div>
            </div>
            
            <img v-if="preview" :src="fileUrl" alt="failed to load image" width="100%" height="250px" >
        </div>
               

</template>
<script>

import {getUrl} from "./services"

export default {
    name:"FileRender",
    props:["fileinfo", "deleteoption"],
    data(){
        return{
            preview: false,
            fileUrl:"",
        }
    },
    methods:{
        showPreview(){
             if(this.fileinfo.match(/.pdf/)){
                getUrl("user4", this.fileinfo, (response, err)=>{
                    if(err){
                        alert(err)
                    }else if(response){
                        this.fileUrl = response;
                        window.open(this.fileUrl)
                     }
                })
            }else{
                if(this.preview){
                    this.preview = false
                }else{
                     this.preview = !this.preview;
                     getUrl("user4", this.fileinfo, (response, err)=>{
                            if(err){
                                alert(err)
                            }else if(response){
                                this.fileUrl = response;
                               
                        }
                    })

                }
                
            }

            
          
        },
        onDelete(){
            this.$emit('delete', this.fileinfo)
        },
         allowPreview(){
            let types =  [".jpg", ".png"];
            console.log("Hello")
            types.forEach(element =>{
                if(this.fileinfo.match(element)){
                     getUrl("user4", this.fileinfo, (response, err)=>{
                            if(err){
                                alert(err)
                            }else if(response){
                                this.fileUrl = response;
                                this.preview = true
                        }
                    })
                }
            })
        }
    },
    mounted(){
        this.allowPreview()
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
     .file-name-active{
        width: 80%;
        overflow: hidden;
        cursor: pointer;
        margin-right: 5px;
        font-size: 18px;
        color: rgb(243, 223, 142);
        
    }
    i:hover{
        font-size: 18px;
        color: rgb(243, 223, 142);
    }
    span:hover{
        font-size: 18px;
        color: rgb(243, 223, 142);
    }
    .delete{
        cursor: pointer;
    }
    .arrow-active{
        margin-right: 3px;
        color: rgb(243, 223, 142);
    }
    .arrow-right{
        margin-right: 3px;
    }
</style>