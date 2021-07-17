<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <div name="dropzone" id="dropzone" class="dropzone">
         <div>
            <FileRender v-for="fileinfo in arraylist" :fileinfo="fileinfo" :key="fileinfo.name" :deleteoption="false" />
        </div>    
        </div>
    </div>
   
       
</template>

<script>

import FileRender from './FileRender.vue'
export default {
    name:'FileRead',
    props:['arraylist', 'accept', 'multiple', 'label'],
    components:{
        FileRender
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
    background: whitesmoke;
    border: rgb(136, 135, 135) solid 1px;
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