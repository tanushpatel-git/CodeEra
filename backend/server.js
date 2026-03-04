const app = require('./src/app')
require('dotenv').config({quiet: true});
const connectDb = require('./src/utility/connectDb');

const serverStart = async () => {
    try{
        await connectDb();
        const port = process.env.PORT || 3000;
        app.listen(port,()=>{
            console.log("server started on port", port);
        })
    }catch(e){
        console.error(e);
    }
}

serverStart();