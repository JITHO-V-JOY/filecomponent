<template>
        <component :is="fileMode" :arraylist="arraylist" :accept="accept" :multiple="multiple" />
</template>

<script>
import FileCreate from './FileCreate.vue'
import FileUpdate from './FileUpdate.vue'
export default {
    name:'FileComponent',
    props:['mode', 'arraylist', 'multiple', 'accept'],
    components:{
        FileCreate ,
        FileUpdate
    },
    computed:{
        fileMode: function(){
            if(this.mode === "create"){
                return FileCreate
            }else{
                return FileUpdate
            }
            
        }
    }
}
</script>

