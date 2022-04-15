const http = require('http')
const app = require('./app')
const server = http.createServer(app)
server.listen(3000,()=>{
    console.log('Website is running and is live on port 3000')
})
