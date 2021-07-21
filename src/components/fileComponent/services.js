

var Minio = require('minio')

var minioClient = new Minio.Client({
    endPoint: process.env.VUE_APP_MINIO_ENDPOINT,
    port: 9000,
    useSSL: false,
    accessKey: process.env.VUE_APP_MINIO_ACCESS_KEY,
    secretKey: process.env.VUE_APP_MINIO_SECRET_KEY
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
  

function uploadFile(bucketName, multiple, files, existingFiles, callback){

     minioClient.bucketExists(bucketName, async function(err, exists){
        if(err){
            console.log("exist err", err)
            return callback(null, "failed to upload try again")
        }
        else if(!exists){
            minioClient.makeBucket(bucketName, 'india', async function(err) {
                if(err){
                    console.log("make err", err)
                    callback(existingFiles, "failed to upload try again")
                }else{
                        let errmsg = new Array();
                        let fileinfo = new Array();
                       
                            for(let i = 0; i< files.length; i++){
                                let filename = files[i].name;
                                let arrayBuffer = await getAsByteArray(files[i]);
                                let fileBuffer = Buffer.from(arrayBuffer);
                                try{
                                    let response = await  minioClient.putObject(bucketName, filename, fileBuffer)
                                    console.log("response", response)
                                    fileinfo.push(filename);
                                }
                                catch(err){
                                    console.log("error", err);
                                    errmsg.push("failed to upload "+filename+" try again");


                                }
                            
                            }

                         return callback(fileinfo, errmsg)
                            
                    }
                })
        }else{
            console.log("hello", exists)
            if(!multiple){
                let errmsg = new Array();
                let fileinfo = new Array();

                console.log("not multiple")

                for(let i = 0; i < existingFiles.length; i++){
                    console.log(i)
                    try{
                        let response = await minioClient.removeObject(bucketName, existingFiles[i])
                        console.log("hello", response)
                    }
                    catch(err){
                        errmsg.push("failed to remove "+existingFiles[i])
                        console.log("error", err)
                    }
                   
                }
                
                if(errmsg[0]){
                    return callback(existingFiles, errmsg);
                }else{

                    for(let i = 0; i<files.length; i++){
                        let filename = files[i].name;
                        let arrayBuffer = await getAsByteArray(files[i]);
                        let fileBuffer = Buffer.from(arrayBuffer);
                        try{
                            let response = await  minioClient.putObject(bucketName, filename, fileBuffer)
                            console.log("response", response)
                            fileinfo.push(filename);
                        }
                        catch(err){
                            console.log("error", err);
                            errmsg.push("failed to upload "+filename+" try again");
                        }
                    
                    }

                    return callback(fileinfo, errmsg)
                    
                }

        }else{
            console.log("multiple", multiple)
            let errmsg = new Array();

            for(let i = 0; i< files.length; i++){
                let filename = files[i].name;
                console.log("filename", filename)
                let arrayBuffer = await getAsByteArray(files[i]);
                let fileBuffer = Buffer.from(arrayBuffer);
                try{
                    let response = await  minioClient.putObject(bucketName, filename, fileBuffer)
                    console.log("response", response)
                    existingFiles.push(filename);
                }
                catch(err){
                    console.log("error", err);
                    errmsg.push("failed to upload "+filename+" try again");

                }
               
            }
             return callback(existingFiles, errmsg)
            
        }
        
        }
        
    })
}



async function updateFile(bucketName, multiple, newFiles, oldFiles, callback){
    let errmsg = new Array();
    let fileinfo = new Array();

    if(!multiple){
        console.log("not multiple")
        for(let i = 0; i < oldFiles.length; i++){
            console.log(i)
            try{
                let response = await minioClient.removeObject(bucketName, oldFiles[i])
                console.log("hello", response)
            }
            catch(err){
                errmsg.push("failed to remove "+oldFiles[i])
                console.log("error", err)
            }
        }
        
        if(errmsg[0]){
            callback(oldFiles, errmsg);
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
                    errmsg.push("failed to upload "+filename+" try again");
                }
            }
                
            return callback(fileinfo, errmsg)
            
        }
        
    }else{
        console.log("multiple..", multiple)
    

        for(let i = 0; i< newFiles.length; i++){
            let filename = newFiles[i].name;
            let arrayBuffer = await getAsByteArray(newFiles[i]);
            let fileBuffer = Buffer.from(arrayBuffer);
            
            try{
                let response = await  minioClient.putObject(bucketName, filename, fileBuffer)
                console.log("response", response)
                oldFiles.push(filename);
            }
            catch(err){
                console.log("error", err);
                errmsg.push("failed to upload "+filename+" try again");

            }
        }
            
       return callback(oldFiles, errmsg)
        
    }
}
        
function deleteFile(bucketName, fileName, callback){
    let errmsg = new Array();
    minioClient.removeObject(bucketName, fileName, function(err) {
        if (err) {
          errmsg.push("failed to remove "+ fileName+ " try again")
          return callback(null, errmsg)
         
        }
        console.log("deleted")
        callback(fileName, errmsg)
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