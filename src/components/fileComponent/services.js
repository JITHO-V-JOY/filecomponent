import axios from '../../axios-index';

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

export {getFileInfo}