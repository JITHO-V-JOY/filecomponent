<template>
    <div class="dropzone">
        <input type="file" multiple name="files" />
        <i class="fas fa-cloud-upload-alt" style="color:gray; font-size:17px;"></i>
        <div>
            <span> Drag & Drop or <span class="browse">browse</span></span>
        </div>             
    </div>
       
</template>

<script>
export default {
    props:['label']
}
</script>

<style scoped>
.dropzone{
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 2px;
    height: 45px;
    border: rgb(153, 152, 152) dashed 2px;
}
.browse{
    border: none;
    color: red;
    cursor: pointer;
    text-decoration: underline;
}
input[type="file"]{
        overflow: hidden;
        width: 100%;
        height: 40px;
        opacity: 0;
        position: absolute;
        cursor: pointer;
        
}


</style>