//讀取檔案套件
const fs = require('fs');
//處理文件路徑套件
const path = require('path');
//設定預設文件路徑,module.filename將會回傳該原始碼所在的文件夾
const basename = path.basename(module.filename);
//目前系統環境為開發中，若有設定環境變數，將可以讓程式自適應環境，切換所要連線的伺服器。
const env = process.env.NODE_ENV || 'development';
console.log("status:"+env)
const db = {};
//初始化資料庫連線
//Set up mongoose connection
var mongoose = require('mongoose');
require('dotenv').config();
//console.log('資料庫使用者:'+process.env.MONGO_INITDB_ROOT_USERNAME);
//console.log('資料庫名稱:'+process.env.MONGO_INITDB_ROOT_DATABASE1);
//console.log('資料庫主機:'+process.env.MONGO_HOST);
console.log('資料庫URL:'+`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_INITDB_ROOT_DATABASE1}?authSource=admin`);
console.log('連線資料庫中。。。');
const DATABASEURL=`mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_INITDB_ROOT_DATABASE1}?retryWrites=true&w=majority`;
//const DATABASEURL=`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/${process.env.MONGO_INITDB_ROOT_DATABASE1}?authSource=admin`;
console.log(DATABASEURL)
mongoose.connect(DATABASEURL,{
//useNewUrlPaser: true,
//useUnifieldTopology:true
})
.then(()=>console.log("Connection Success!!"))
.catch(err=>console.log(err));

mongoose.Promise = global.Promise;
var dbconnect = mongoose.connection;
dbconnect.on('error', console.error.bind(console, 'MongoDB connection error:'));
dbconnect.once('open',function(){
console.log('資料庫dbcarbon連線成功');
});

//將資料夾內的.js檔案依序實例，並註冊在同一物件之中。
fs.readdirSync(__dirname)
    .filter((file) =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach((file) => {
        const fileName = file.replace('.js','');
        const model =require('./'+fileName);
        db[fileName] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

module.exports = db;
