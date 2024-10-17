const expresss = require('express');
const bodyParser = require('body-parser');
const {PORT,DB_SYNC} = require('./config/serverConfig.js');
const apiRoutes = require('./router/index.js')
const db = require('./models/index.js');
function setupAndStartServer(){
    const app = expresss();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',apiRoutes);
    if(DB_SYNC){
        db.sequelize.sync({alter:true});
    }
    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
    })
}

setupAndStartServer();