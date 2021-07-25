<template>
        <div >
            <div class="file-preview">
                <div class="fileinfo">
                    <img  :src="require(`../../../public/images/${filetype}.svg`)" width="20px" height="25px" alt="">
                    <i v-if="preview" class="file-name-active" @click="showPreview">{{fileinfo}}</i>
                    <i v-else class="file-name" @click="showPreview">{{fileinfo}}</i>

                </div>
                <div>
                    <i v-if="deleteOption" class="fas fa-trash delete" @click="onDelete "></i>

                </div>
            </div>
            
            <img v-if="preview" :src="fileUrl" alt="failed to load image" width="100%" height="250px" >
        </div>
               

</template>
<script>

import {getUrl} from "./services"

export default {
    name:"FileRender",
    props:["userId", "fileinfo", "multiple", "deleteOption"],
    data(){
        return{
            preview: false,
            fileUrl:"",
            filetype:""
        }
    },
    methods:{
        showPreview(){
             if(this.fileinfo.match(/.pdf/) || this.fileinfo.match(/.docx/)){
                getUrl(this.userId, this.fileinfo, (response, err)=>{
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
                     getUrl(this.userId, this.fileinfo, (response, err)=>{
                            console.log(err)
                             if(response){
                                this.fileUrl = response;
                                this.preview = true
                            }
                    })

                }
                
            }

            
          
        },
        onDelete(){
            this.$emit('delete', this.fileinfo)
        },
         allowPreview(){
            let types =  ["jpg", "png", "jpeg"];
            console.log("Hello")
            types.forEach(element =>{
                if(this.fileinfo.match(element)){
                     getUrl(this.userId, this.fileinfo, (response, err)=>{
                            console.log(err)
                            if(response){
                                this.fileUrl = response;
                                if(!this.multiple){
                                    this.preview = true
                                }
                            }
                    })
                }
            })
        },

        fetchFileType(){
            let types = ["pdf"];
            let images = ["jpg", "jpeg", "png"];
            types.forEach(element =>{
                  if(this.fileinfo.match(element)){
                      this.filetype = element;
                  }
            })

            images.forEach(element =>{
                  if(this.fileinfo.match(element)){
                      this.filetype = "img";
                  }
            })
            if(!this.filetype){
                this.filetype = "file"
            }
        }
    },

    mounted(){
        this.allowPreview()
        this.fetchFileType()
    }
}
</script>

<style scoped>
    .file-preview{
        display: flex;
        padding:2px 5px;
        margin: 2px 0;
        border-radius: 5px;
        justify-content: space-between;
        background:#7c7c7c;
        color: rgb(255, 255, 255);
        width:100%;
        align-items: center;
        cursor: default;
        
    }
    .file-name{
        width: 300px;
        overflow: hidden;
        cursor: pointer;
        margin-left: 5px;
        
    }
     .file-name-active{
        width: 300px;
        overflow: hidden;
        cursor: pointer;
        margin-left: 5px;
        font-size: 18px;
        font-style: italic;
        color: rgb(243, 223, 142);
        text-decoration: underline;
        
    }
    .type{
        color: rgb(255, 255, 255);
    }
    i:hover{
        font-size: 18px;
        color: rgb(243, 223, 142);
        text-decoration: underline;
    }
    span:hover{
        font-size: 18px;
        color: rgb(243, 223, 142);
    }
    .delete{
        cursor: pointer;
    }
    .fileinfo{
        display: flex;
    }
    
</style>