<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <b-overlay :show="isLoading" rounded="sm" variant="secondary" opacity="0.97">
               <template #overlay>
                   <div class="d-flex align-items-center">
                        <h6 style="color: white; font-weight: 700; marging-right:2px">Uploading</h6>
                           <b-spinner style="width: 0.5rem; height: 0.5rem;" small type="grow" variant="white"></b-spinner>
                           <b-spinner style="width: 1rem; height: 1rem;"  type="grow" variant="white"></b-spinner>
                           <b-spinner style="width: 0.5rem; height: 0.5rem;" small type="grow" variant="white"></b-spinner>
                    </div>
                </template>
         <div name="dropzone" id="dropzone" class="dropzone" @dragover="dragOver" @dragleave="dragLeave" @drop="onDrop">
         <div class="file-input">
            <b-form-file id="form-file" class="form-file" name="idproof"  @change ="onChange" plain :multiple="multiple"></b-form-file>
            <i class="fas fa-cloud-upload-alt" style="color:#b3b3b3; font-size:32px; padding:0 5px"></i>
            <span class="browse">drag & drop or choose file</span>
        </div>
        <FilePreview v-for="fileinfo in fileList" :userId="userId" :fileinfo="fileinfo" :key="fileinfo" :multiple="multiple" :deleteOption="true"  @delete="onDelete"  />
    
        </div>
         </b-overlay>
        <p v-for="err in isErr" :key="err"  style="color:red; font-size:12px; margin:0">{{err}}</p>

    </div>
   
       
</template>

<script>
import {uploadFile, deleteFile} from './services'
import FilePreview from './FilePreview.vue'
export default {
    name:'FileCreate',
    props:['userId', 'value', 'accept', 'multiple', 'label'],
    components:{
        FilePreview
    },
    data(){
        return {
            fileList: this.value,
            isLoading: false,
            isErr:[]
        }
    },
    methods:{
        onChange(event){
            event.preventDefault();
            this.isLoading = !this.isLoading
            let allowUpload = false;
            for(let i = 0; i < event.target.files.length; i++){
                let filename = event.target.files[i].name;
                this.accept.forEach(element => {
                    if(filename.match(element)){
                        allowUpload = true
                    }
                });
                if(!allowUpload){
                    break;
                }
            }

            console.log("allowed", allowUpload);
            if(allowUpload){
                console.log("userId", this.userId)
                uploadFile(this.userId, this.multiple, event.target.files, this.fileList, (fileinfo, err)=>{
                    if(err[0]){
                        this.isErr = err
                        event.target.value= "";
                        this.isLoading = false
                    }else{
                        this.isErr = []
                    }
                    if(fileinfo[0]){
                        console.log("fileinfo", fileinfo)
                        this.fileList = fileinfo;
                        this.isLoading = false
                        event.target.value= "";
                        this.$emit('input', this.fileList)
                    }
                 })
            }else{
                alert("please upload files of type "+ [...this.accept])
                this.isLoading = false
            }
            
            
        },

        onDelete(fileName){

              deleteFile(this.userId, fileName, (file, err)=>{
                console.log("hello")
                if(err[0]){
                    this.isErr = err;
                }else{
                    this.isErr = []
                }
                if(file){
                   this.fileList = this.fileList.filter((file)=> file !== fileName)
                   this.$emit('input', this.fileList)

                }
              })
        },

        dragOver(event){
            event.preventDefault();
            event.currentTarget.style.background = "rgb(224, 224, 224)";
        },

        dragLeave(event){
            event.preventDefault();
            event.currentTarget.style.background = "rgb(240, 240, 240)";
        },
        onDrop(event){
            event.currentTarget.style.background = "rgb(240, 240, 240)";
        }
  
    } 
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    flex-direction: column;
    border-radius: 5px;
    padding: 2px;
    justify-content: center; 
    min-height: 40px; /* for responsive height */
    cursor: pointer;
    background: rgb(245, 245, 245);
    border: rgb(114, 114, 114) solid 1.5px;
}
.browse{
    border: none;
    color:gray;
}
.form-file{
        overflow: hidden;
        width: 100%;
        height: 40px;
        opacity: 0;
        position: absolute;
        cursor: pointer;  
}
.file-input{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    justify-content: center;
    border: rgb(179, 179, 179) dashed 1.5px;
    border-radius: 5px;
}



</style>