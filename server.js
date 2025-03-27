const http = require("http")
const path = require("path")
const fs = require("fs")
const fileHtml = path.join(__dirname,"public","index.html")
const fileCss = path.join(__dirname,"public","css","style.css")
const fileJs = path.join(__dirname,"public","js","index.js")



const server = http.createServer((req,res)=>{
    if(req.method==='GET'){
        console.log(req.url);
        if(req.url==="/"){ 
            fs.readFile(fileHtml,(err,data)=>{
                if(err){
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/html"})
                    res.end(data)
                }
            })
        }
        if(req.url==="/css/style.css"){ 
            fs.readFile(fileCss,(err,data)=>{
                if(err){
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/css"})
                    res.end(data)
                }
            })
        }
        if(req.url==="/js/index.js"){ 
            fs.readFile(fileJs,(err,data)=>{
                if(err){
                    res.writeHead(500)
                    res.end(err.message)
                }else{
                    res.writeHead(200,{"Content-Type":"text/json"})
                    res.end(data)
                }
            })
        }
    }    
})

let port = 3000 || 4000
server.listen(port,()=>{
    console.log("Server running at port",port);
})
