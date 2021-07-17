<template>
        <component :is="fileMode" :arraylist="arraylist" :accept="accept" :multiple="multiple"  :label="label"/>
</template>

<script>
import FileCreate from './FileCreate.vue'
import FileUpdate from './FileUpdate.vue'
import FileRead from './FileRead.vue'

export default {
    name:'FileComponent',
    props:['mode', 'arraylist', 'multiple', 'accept', 'label'],
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
    }
}
</script>

