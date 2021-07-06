<template>
                <div @click="showPreview">
                     <div class="file-info">
                        <span>{{fileinfo.name}}</span>
                        <i class="fas fa-times"></i>
                    </div>
                    <img v-if="preview" :src="fileinfo.url" alt="" width="100%" height="200px">
                </div>
               

</template>
<script>
export default {
    name:"FileRender",
    props:["fileinfo"],
    data(){
        return{
            preview: false
        }
    },
    methods:{
        showPreview(){
            this.preview = !this.preview
        }
    }
}
</script>

<style scoped>
    .file-info{
        display: flex;
        padding: 2px;
        margin: 1px;
        justify-content: space-between;
        background: #f0f0f0;
        width:100%;
        align-items: center;
    }
</style>