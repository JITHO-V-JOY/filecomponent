<template>
        <component :is="fileMode" :userId="userId" :value="value" :accept="accept" :multiple="multiple" @input="handleInput" :label="label"/>
</template>

<script>
import FileCreate from './FileCreate.vue'
import FileUpdate from './FileUpdate.vue'
import FileRead from './FileRead.vue'

export default {
    name:'base-form-file',
    props:['mode', 'userId', 'value', 'multiple', 'accept', 'label'],
    components:{
        FileCreate ,
        FileUpdate,
        FileRead
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

