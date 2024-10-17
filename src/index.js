const expresss = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig.js');

function setupAndStartServer(){
    const app = expresss();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
    })
}

setupAndStartServer();