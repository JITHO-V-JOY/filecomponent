

var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: '192.168.1.6',
    port: 9000,
    useSSL: false,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin'
});




async function getAsByteArray(file) {
    return new Uint8Array(await readFile(file))
  }

  function readFile(file) {
    return new Promise((resolve, reject) => {
      // Create file reader
      let reader = new FileReader()
  
      // Register event listeners
      reader.addEventListener("loadend", e => resolve(e.target.result))
      reader.addEventListener("error", reject)
  
      // Read file
      reader.readAsArrayBuffer(file)
    })
  }
  

function uploadFile(bucketName, files, callback){

     minioClient.bucketExists(bucketName, async function(err, exists){
        if(err){
            console.log("exist err", err)
            return callback(null, "failed to upload try again")
        }
        else if(!exists){
            minioClient.makeBucket(bucketName, 'india', async function(err) {
                if(err){
                    console.log("make err", err)
                    callback(null, "failed to upload try again")
                }else{
                    let errmsg = null;
                    let fileinfo = new Array();

                    for(let i = 0; i< files.length; i++){
                        let filename = files[i].name;
                        let arrayBuffer = await getAsByteArray(files[i]);
                        let fileBuffer = Buffer.from(arrayBuffer);

                        minioClient.putObject(bucketName, filename, fileBuffer,  function(err, etag) {
                            if(err) {
                                errmsg = err
                            }
                            else if(etag){
                             console.log("Success", etag)
                             fileinfo.push(filename)
                            }
                        })
                    
                    }

                    if(errmsg){
                        callback(null, "failed to upload try again")
                    }else{
                        callback(fileinfo, null)
                    }
                }

            })
        }else{
            console.log("hello", exists)
                let errmsg = null;
                let fileinfo = new Array();

                for(let i = 0; i< files.length; i++){
                    let filename = files[i].name;
                    let arrayBuffer = await getAsByteArray(files[i]);
                    let fileBuffer = Buffer.from(arrayBuffer);

                    minioClient.putObject(bucketName, filename, fileBuffer,  function(err, etag) {
                        if(err) {
                            errmsg = err
                        }
                        else if(etag){
                         console.log("Success", etag)
                         fileinfo.push(filename)
                        }
                    })
                
                }
                if(errmsg){
                    callback(null, errmsg)
                }else{
                    console.log("success callback")
                    callback(fileinfo, null)
                }
        }
    })
}

async function updateFile(bucketName, newFiles, oldFiles, callback){
    let errmsg = null;
    let fileinfo = new Array();

    for(let i = 0; i < oldFiles.length; i++){
        console.log(i)
        try{
            let response = await minioClient.removeObject(bucketName, oldFiles[i])
            console.log("hello", response)
        }
        catch(err){
            errmsg = err;
            console.log("error", err)
        }
        /*
        .then((response)=>{
                console.log("response", response)
                tracki = i;
        }).catch((err)=>{
            errmsg = err;
            console.log("error aanu", err)
            tracki = i;
        })
        */
       
    }
       
    if(errmsg){
        callback(null, errmsg);
    }else{
        for(let i = 0; i< newFiles.length; i++){
            let filename = newFiles[i].name;
            let arrayBuffer = await getAsByteArray(newFiles[i]);
            let fileBuffer = Buffer.from(arrayBuffer);
            
            try{
                let response = await  minioClient.putObject(bucketName, filename, fileBuffer)
                console.log("response", response)
                fileinfo.push(filename);
            }
            catch(err){
                console.log("error", err);
                errmsg = err;
            }
            /*
            .then((objectInfo)=> {
            console.log("Success", objectInfo)
                         fileinfo.push(filename);
                         tracki = i;
                    }).catch((err)=>{
                        errmsg = err
                        console.log("error", err)
                        tracki = i;
                    })
                    */
        }
            
        if(errmsg){
            return callback(null, errmsg);
        }else{
            console.log("no error")
            return callback(fileinfo, null)
        }
    }
}
        
    
    
   
    
   

function deleteFile(bucketName, fileName, callback){
    minioClient.removeObject(bucketName, fileName, function(err) {
        if (err) {
          return callback(null, err)
        }
        callback(fileName, null)
      })
}

function getUrl(bucketName, fileName, callback){
    minioClient.presignedUrl("GET", bucketName, fileName, 24 * 60 * 60, function(err, presignedUrl){
        if(err){
            callback(null, err);
        }
        else if(presignedUrl){
            callback(presignedUrl, null);
        }
    })
}

export {uploadFile, updateFile, deleteFile, getUrl}