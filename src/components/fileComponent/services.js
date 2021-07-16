

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
  

function uploadFile(files, callback){

     minioClient.bucketExists('abcd', async function(err, exists){
        if(err){
            console.log("exist err", err)
            return callback(null, "hello")
        }
        else if(!exists){
            minioClient.makeBucket('abcd', 'india', async function(err) {
                if(err){
                    console.log("make err", err)
                }else{

                    let errmsg = null;
                    let urls = new Array();
                    let fileinfo = new Object();

                    for(let i = 0; i< files.length; i++){
                        let filename = files[i].name;
                        let arrayBuffer = await getAsByteArray(files[i]);
                        let fileBuffer = Buffer.from(arrayBuffer);
    
                        minioClient.putObject('abcd', filename, fileBuffer,  function(err, etag) {
                            if(err) {
                                errmsg = err
                            }
                            else if(etag){
                             console.log("Success", etag);
                             minioClient.presignedUrl('GET', 'abcd', filename, 24*60*60, function(err, presignedUrl) {
                                if (err) return console.log(err)
                                console.log(presignedUrl)
                                fileinfo.name = filename
                                fileinfo.url = presignedUrl
                                urls.push(fileinfo)
                              })
                            }
                        })
                    
                    }

                    if(errmsg){
                        callback(null, errmsg)
                    }else{
                        callback(urls, null)
                    }
                }

            })
        }else{
            console.log("hello", exists)
                let errmsg = null;
                let urls = new Array();
                let fileinfo = {};

                for(let i = 0; i< files.length; i++){
                    let filename = files[i].name;
                    let arrayBuffer = await getAsByteArray(files[i]);
                    let fileBuffer = Buffer.from(arrayBuffer);

                    minioClient.putObject('abcd', filename, fileBuffer,  function(err, etag) {
                        if(err) {
                            errmsg = err
                        }
                        else if(etag){
                         console.log("Success", etag)

                         minioClient.presignedUrl('GET', 'abcd', filename, 24*60*60, function(err, presignedUrl) {
                            if (err) return console.log(err)
                            fileinfo.name = filename
                            fileinfo.url = presignedUrl
                            console.log("filename", fileinfo)
                            urls.push(fileinfo)
                            fileinfo = {}
                          })
                        }
                    })
                
                }
                if(errmsg){
                    callback(null, errmsg)
                }else{
                    console.log("success callback")
                    callback(urls, null)
                }
        }
    })
}

async function updateFile(newFiles, oldFiles, callback){
    let errmsg = null;
    let fileinfo = new Array();
    let urls = {};

    for(let i = 0; i < oldFiles.length; i++){
        minioClient.removeObject('abcd', oldFiles[i].name, function(err, response){
            if(err){
                console.log("error", err)
                errmsg = "error";
            }
            else{
                console.log("response", response)
            }
        })
       
    }
    if(errmsg){
        return callback(null, errmsg);
    }

    for(let i = 0; i< newFiles.length; i++){
        let filename = newFiles[i].name;
        let arrayBuffer = await getAsByteArray(newFiles[i]);
        let fileBuffer = Buffer.from(arrayBuffer);

        let response = await minioClient.putObject('abcd', filename, fileBuffer)
        if(response){
            let presignedUrl = await minioClient.presignedUrl('GET', "abcd", filename, 24*60*60);
            if(presignedUrl){
                urls.name = filename;
                urls.url = presignedUrl;
                fileinfo.push(urls);
                urls = {};
                console.log(presignedUrl)
            }else{
                errmsg = "error"
            }

        }
        else{
            errmsg = "error"
        }

    }
    if(errmsg){
        callback(null, errmsg)
    }else{
        console.log("success callback", fileinfo)
        callback(fileinfo, null)
    }
}

function deleteFile(fileName, callback){
    minioClient.removeObject('abcd', fileName, function(err) {
        if (err) {
          return callback(null, err)
        }
        callback(fileName, null)
      })
}

async function getIDProof(bucketName, fileNames, callback){
    let fileinfo = new Array();
    let urls = {};
    let errmsg = null;
    for(let i = 0; i < fileNames.length; i++){
        let presignedUrl = await minioClient.presignedUrl('GET', bucketName, fileNames[i], 24*60*60)
        if(presignedUrl){
            urls.name = fileNames[i];
            urls.url = presignedUrl;
            fileinfo.push(urls);
            urls = {};
            console.log(presignedUrl)
        }else{
            errmsg = "error"
        }
    }
    if(errmsg){
        callback(null, errmsg)
    }else{
        console.log("success callback", fileinfo)
        callback(fileinfo, null)
    }
    
}

export {getIDProof, uploadFile, updateFile, deleteFile}