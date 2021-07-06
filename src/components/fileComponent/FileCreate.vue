<template>
    <div class="dropzone">
        <div class="file-input">
                 <b-form-file
                    v-model="arraylist"
                    class="form-file"
                    @change="onChange"
                ></b-form-file>
                <i class="fas fa-cloud-upload-alt" style="color:gray; font-size:17px;"></i>
                <div>
                    <span> Drag & Drop or <span class="browse">click here</span></span>
                </div>  
        </div>
        <div>
            <FileRender v-for="fileinfo in arraylist" :fileinfo="fileinfo" :key="fileinfo.id" />
        </div>
               
    </div>
       
</template>

<script>
import {getFileInfo} from './services'
import FileRender from './FileRender.vue'
export default {
    name:'FileCreate',
    props:['arraylist'],
   
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

        }
    }
    
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    min-height: 45px;
    background: rgb(247, 193, 205);
    border: rgb(136, 135, 135) dashed 2px;
}
.browse{
    border: none;
    color: red;
    cursor: pointer;
    text-decoration: underline;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


</style>