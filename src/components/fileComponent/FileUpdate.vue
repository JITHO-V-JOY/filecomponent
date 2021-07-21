<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <b-overlay :show="isLoading" rounded="sm" variant="secondary">
                <template #overlay>
                    <div class="d-flex align-items-center">
                        <h6 style="color: white; font-wieght: 700; marging-right:2px">Uploading</h6>
                           <b-spinner style="width: 0.5rem; height: 0.5rem;" small type="grow" variant="white"></b-spinner>
                           <b-spinner style="width: 1rem; height: 1rem;"  type="grow" variant="white"></b-spinner>
                           <b-spinner style="width: 0.5rem; height: 0.5rem;" small type="grow" variant="white"></b-spinner>
                    </div>
                </template>
         <div name="dropzone" id="dropzone" class="dropzone" @dragover="dragOver" @dragleave="dragLeave" @drop="onDrop">
         <div class="file-input" >
            <b-form-file id="form-file" class="form-file" name="idproof"  @change ="onChange" plain :multiple="multiple" :accept="String([...accept])"></b-form-file>
            <i class="fas fa-cloud-upload-alt" style="color:gray; font-size:27px;"></i>
            <span> Drag & Drop or <a href="" class="browse">click here</a> to upload</span>
            
        </div>
         <div>
            <FileRender v-for="fileinfo in fileList" :fileinfo="fileinfo" :key="fileinfo.name" :deleteoption="multiple" @delete="onDelete"  />
        </div>   
       
               
        </div>
        </b-overlay>
        <p v-for="err in isErr" :key="err"  style="color:red; font-size:12px; margin:0">{{err}}</p>

    </div>
   
       
</template>

<script>
import {updateFile, deleteFile} from './services'
import FileRender from './FileRender.vue'
export default {
    name:'FileUpdate',
    props:['fileList', 'accept', 'multiple', 'label'],
    components:{
        FileRender
    },
    data(){
        return {
            isLoading: false,
            isErr : []
        }
    },
    methods:{
        onChange(event){
            event.preventDefault();
            this.isLoading = !this.isLoading
            updateFile("user4", this.multiple, event.target.files, this.fileList, (fileinfo, err)=>{
                if(err[0]){
                    this.isErr = err
                    event.target.value= "";
                    this.isLoading = false
                }else{
                    this.isErr = [];
                }
                if(fileinfo[0]){
                    console.log("fileinfo", fileinfo)
                    this.fileList = fileinfo
                    this.isLoading = false
                    event.target.value= "";
                }
            })
            
        },
         onDelete(fileName){

              deleteFile("user4", fileName, (file, err)=>{
                console.log("hello")
                if(err[0]){
                    this.isErr = err;
                }else{
                    this.isErr = []
                }
                if(file){
                   this.fileList = this.fileList.filter((file)=> file !== fileName)
                }
              })
        },

        dragOver(event){
            event.preventDefault();
            event.currentTarget.style.background = "rgb(231, 201, 145)";
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
    background: wheat;
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