<template>
        <div >
            <div class="file-preview">
                <div class="fileinfo">
                    <img v-if="filetype"  :src="require(`../../../public/img/${filetype}.svg`)" width="20px" height="25px" alt="">
                    <p v-if="preview" class="file-name-active" @click="showPreview">{{fileinfo}}</p>
                    <p v-else class="file-name" @click="showPreview">{{fileinfo}}</p>
                </div>
    
                 <i v-if="deleteOption" class="fas fa-trash delete" @click="onDelete "></i>
            </div>
             <img class="show-file" v-if="preview" :src="fileUrl" alt="failed to load image" width="100%" height="auto" >
            
        </div>
               

</template>
<script>
import {getUrl} from "./services"
export default {
    name:"FilePreview",
    props:["userId", "fileinfo", "multiple", "deleteOption"],
    data(){
        return{
            preview: false,
            fileUrl:"",
            filetype:null
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
            let types = ["pdf", "jpg", "jpeg", "png", "docx"];
            types.forEach(element =>{
                  if(this.fileinfo.match(element)){
                      this.filetype = element;
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
        padding:0px 3px;
        margin: 2px 0;
        border-radius: 3px;
        justify-content: space-between;
        background:#afafaf;
        color: rgb(247, 247, 247);
        width:100%;
        font-weight: 700;
        align-items: center;
        cursor: default;
        
    }
    .file-name{
        overflow: hidden;
        cursor: pointer;
        margin-left: 5px;
        color: rgb(247, 247, 247);
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;  
    }
     .file-name-active{
        overflow: hidden;
        cursor: pointer;
        margin-left: 5px;
        font-style: italic;
        color: rgb(247, 247, 247);
        text-decoration: underline;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
    }
    .type{
        color: rgb(255, 255, 255);
    }
    i:hover{
        font-size: 14px;
    }
    p:hover{
         text-decoration: underline;

    }
    .delete{
        cursor: pointer;
    }
    .fileinfo{
        display: flex;
        width: 80%;
        align-items: center;

    }
    
</style>
