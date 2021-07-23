<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <div name="dropzone" id="dropzone" class="dropzone">
         <div>
            <FileRender v-for="fileinfo in fileList" :fileinfo="fileinfo" :key="fileinfo" :deleteoption="false"  />
        </div>    
        </div>
    </div>
   
       
</template>

<script>

import FileRender from './FileRender.vue'
export default {
    name:'FileRead',
    props:['fileList', 'accept', 'multiple', 'label'],
    components:{
        FileRender
    }
   
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    padding: 3px;
    flex-direction: column;
    justify-content: center; 
    border-radius: 10px;
    min-height: 45px; /* for responsive height */
    cursor: pointer;
    background: rgb(243, 242, 242);;
    border: rgb(235, 14, 14) solid 1px;
}
.browse{
    border: none;
    color: rgb(238, 43, 43);
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