<template>
    <div class="dropzone" @dragover="dragOver" @dragleave="dragLeave">
         <div class="file-input" >
            <b-form-file class="form-file" v-model="arraylist" @change="onChange" plain :multiple="multiple" :accept="String([...accept])"></b-form-file>
            <i class="fas fa-cloud-upload-alt" style="color:gray; font-size:17px;"></i>
            <span> Drag & Drop or <a href="" class="browse">click here</a></span>   
        </div>
        <div>
            <FileRender v-for="fileinfo in arraylist" :fileinfo="fileinfo" :key="fileinfo.id" :deleteoption="false"  />
        </div>
               
    </div>
       
</template>

<script>
import {getFileInfo} from './services'
import FileRender from './FileRender.vue'
export default {
    name:'FileCreate',
    props:['arraylist', 'accept', 'multiple'],
    components:{
        FileRender
    },
    methods:{
        onChange(){
            getFileInfo((fileinfo, err)=>{
                if(err){
                    alert(err)
                }else if(fileinfo){
                    this.arraylist = fileinfo
                }
            })
        },
        dragOver(event){
            event.preventDefault();
            event.currentTarget.style.background = "rgb(243, 217, 217)";
        },
        dragLeave(event){
            event.preventDefault();
            if(!this.arraylist[0]){
                event.currentTarget.style.background = "white";
            }
        },
  
    }
    
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center; 
    padding: 2px;
    min-height: 45px; /* for responsive height */
    cursor: pointer;
    background: "white";
    border: rgb(136, 135, 135) dashed 2px;
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