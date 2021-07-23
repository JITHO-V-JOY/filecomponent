<template>
        <component :is="fileMode" ref="file_widge" :value="value" :accept="accept" :multiple="multiple" @input="handleInput" :label="label"/>
</template>

<script>
import FileCreate from './FileCreate.vue'
import FileUpdate from './FileUpdate.vue'
import FileRead from './FileRead.vue'

export default {
    name:'FileComponent',
    props:['mode', 'value', 'multiple', 'accept', 'label'],
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
        handleInput(value){
            this.$emit('input', value)
        }
    }
}
</script>

