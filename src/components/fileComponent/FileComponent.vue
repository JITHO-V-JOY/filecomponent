<template>
        <component :is="fileMode" ref="file_widget" :fileList="fileList" :accept="accept" :multiple="multiple"  :label="label"/>
</template>

<script>
import FileCreate from './FileCreate.vue'
import FileUpdate from './FileUpdate.vue'
import FileRead from './FileRead.vue'

export default {
    name:'FileComponent',
    props:['mode', 'fileList', 'multiple', 'accept', 'label'],
    components:{
        FileCreate ,
        FileUpdate
    },
    computed:{
        fileMode: function(){
            if(this.mode === "create"){
                return FileCreate
            }else if(this.mode === "update"){
                return FileUpdate
            }else{
                return FileRead
            }
            
        }
    },
    methods:{
        getFiles(){
            return this.$refs.file_widget.fileList;
        }
    }
}
</script>

