<template>
                <div @click="showPreview">
                     <div class="file-info">
                        <span>{{fileinfo.filename}}</span>
                        <i v-if="deleteoption" class="fas fa-times"></i>
                    </div>
                    <img v-if="preview" :src="fileurl+fileinfo._id" alt="" width="100%" height="200px">
                </div>
               

</template>
<script>
import {fileurl} from "../../../public/config"
export default {
    name:"FileRender",
    props:["fileinfo", "deleteoption"],
    data(){
        return{
            preview: false,
            fileurl: fileurl
        }
    },
    
    methods:{
        showPreview(){
            if(this.fileinfo.filename.match(/.pdf/)){
                window.open(this.fileurl+ this.fileinfo._id)
            }else{
                this.preview = !this.preview
            }
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