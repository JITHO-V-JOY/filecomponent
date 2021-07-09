import axios from '../../axios-index';
//import axios from "axios"

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

export {getFileInfo, uploadFile}