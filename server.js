const http = require("http")
const path = require("path")
const fs = require("fs")
const url = require('url')
const querystring = require("querystring")

const fileHtml = path.join(__dirname,"public","index.html")
const fileCss = path.join(__dirname,"public","css","style.css")
const fileJs = path.join(__dirname,"public","js","index.js")

const server = http.createServer((req,res)=>{
    const parsed = url.parse(req.url)
    console.log(parsed);
    
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
    
    if(req.method==="POST"){
        if(parsed.pathname==="/send-data"){
            let body = ""
            req.on("data",(chunk)=>{
                console.log(chunk);
                body += chunk.toString()
            })
            req.on("end", () => {
                const parsedData = querystring.parse(body)
                fs.readFile("./data.json", (error, data) => {
                    let contents = error ? [] : JSON.parse(data);
                    contents.push(parsedData);
                    fs.writeFile("./data.json", JSON.stringify(contents), error => {
                        if (error) {
                            res.writeHead(500)
                            res.end(error.message)
                        } else {
                            res.writeHead(200);
                            res.end("Successfully Submitted")
                        }
                    })
                })
            })
        }
    }
})

let port = 2000
server.listen(port,()=>{
    console.log("Server running at port",port);
})
