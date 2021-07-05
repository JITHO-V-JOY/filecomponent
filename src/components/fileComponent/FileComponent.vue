<template>
        <component :is="fileMode" />
</template>

<script>
import FileCreate from './FileCreate.vue'
export default {
    name:'FileComponent',
    props:['mode'],
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

