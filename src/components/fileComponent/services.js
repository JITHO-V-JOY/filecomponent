import axios from '../../axios-index';
//import axios from "axios"

var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: '192.168.1.6',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});

function getFileInfo(callback){
    axios.get('/file').then((response, err)=>{
        if(err){
            throw err;
        }   
        if(response){
           console.log(response.data)
           callback(response.data, null)
        }
    }).catch((err)=> callback(null, err));
}

function uploadFile(data, callback){
    
    minioClient.listBuckets(function(err, buckets) {
        if (err) return console.log(err)
        console.log('buckets :', buckets)
      })

    axios.post("/api/file", data, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    .then((res)=>{
        callback(res, null)
        console.log(res)
    })
    .catch((err)=> {
        callback(null, err)
        console.log(err)
    })
}

function deleteFile(file_id, callback){
    axios.delete(`/api/file/${file_id}`)
    .then((response, err)=>{
        if(err){
            throw err
        }
        if(response){
            console.log(response.data);
            callback(response.data, null)
        }
    })
    .catch((err)=> callback(null, err))
    
}

export {getFileInfo, uploadFile, deleteFile}