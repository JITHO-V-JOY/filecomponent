<template>
    <div>
         <label for="dropzone" style="font-weight:bold">{{label}}</label>

         <div name="dropzone" id="dropzone" class="dropzone">
         <div>
            <FilePreview v-for="fileinfo in value" :userId="userId" :fileinfo="fileinfo" :key="fileinfo" :multiple="multiple" :deleteOption="false"/>
        </div>    
        </div>
    </div>
   
       
</template>

<script>

import FilePreview from './FilePreview.vue'
export default {
    name:'FileRead',
    props:['userId', 'value', 'accept', 'multiple', 'label'],
    components:{
        FilePreview
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
    border-radius: 5px;
    min-height: 45px; /* for responsive height */
    background: rgb(243, 242, 242);;
    border: rgb(235, 14, 14) solid 1px;
}


</style>