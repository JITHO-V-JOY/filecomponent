<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <b-overlay :show="isLoading" rounded="sm" variant="danger">
         <div name="dropzone" id="dropzone" class="dropzone" @dragover="dragOver" @dragleave="dragLeave" @drop="onDrop">
         <div class="file-input" >
            <b-form-file id="form-file" class="form-file" name="idproof"  @change ="onChange" plain :multiple="multiple" :accept="String([...accept])"></b-form-file>
            <i class="fas fa-cloud-upload-alt" style="color:gray; font-size:27px;"></i>
            <span> Drag & Drop or <a href="" class="browse">click here</a></span>
            
        </div>
         <div>
            <FileRender v-for="fileinfo in fileList" :fileinfo="fileinfo" :key="fileinfo.name" :deleteoption="false" />
        </div>   
       
               
        </div>
         </b-overlay>
    </div>
   
       
</template>

<script>
import {updateFile} from './services'
import FileRender from './FileRender.vue'
export default {
    name:'FileUpdate',
    props:['fileList', 'accept', 'multiple', 'label'],
    components:{
        FileRender
    },
    data(){
        return {
            isLoading: false
        }
    },
    methods:{
        onChange(event){
            event.preventDefault();
             this.isLoading = !this.isLoading
            updateFile("user1", event.target.files, this.fileList, (fileinfo, err)=>{
                if(err){
                    console.log("Hello")
                    alert("hello");
                    event.target.value= "";
                }else if(fileinfo){
                    console.log("fileinfo", fileinfo)
                    this.fileList = fileinfo;
                    this.isLoading = !this.isLoading
                    event.target.value= "";
                }
            })
            
        },

        dragOver(event){
            event.preventDefault();
            event.currentTarget.style.background = "rgb(243, 217, 217)";
        },

        dragLeave(event){
            event.preventDefault();
            event.currentTarget.style.background = "wheat";
        },
        onDrop(event){
            event.currentTarget.style.background = "wheat";
        }
  
    },
   
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    padding: 3px;
    flex-direction: column;
    justify-content: center; 
    min-height: 45px; /* for responsive height */
    cursor: pointer;
    background: rgb(228, 228, 228);
    border: rgb(235, 14, 14) dashed 2px;
}
.browse{
    border: none;
    color: red;
    text-decoration: underline;
}
.form-file{
        overflow: hidden;
        width: 100%;
        height: 45px;
        opacity: 0;
        position: absolute;
          cursor: pointer;  
}
.file-input{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: center;
  
}


</style>