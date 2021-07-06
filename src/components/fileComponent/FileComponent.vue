<template>
        <component :is="fileMode" :arraylist="arraylist" />
</template>

<script>
import FileCreate from './FileCreate.vue'
export default {
    name:'FileComponent',
    props:['mode', 'arraylist'],
    components:{
        FileCreate  
    },
    computed:{
        fileMode: function(){
            if(this.mode === "create"){
                return FileCreate
            }
            return FileCreate
        }
    }
}
</script>

