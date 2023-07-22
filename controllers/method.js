//載入相對應的model
const Method = require('../models/index').method;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /method !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Method.find({}).then(async methods=>{
        //console.log("found methods:"+methods);
        console.log("type of methods:"+typeof(methods));
        console.log("type of 1st method:"+typeof(methods[0]));
        //console.log("1st method:"+methods[0].a25different)
        console.log("No. of method:"+methods.length)
        let methodlist=encodeURIComponent(JSON.stringify(methods));
        console.log("type of methods:"+typeof(methodlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("method/listpage",{
        //ctx.response.send({
            methodlist:methodlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Method.find({}) failed !!");
        console.log(err)
    })
},


//到新增資料頁
async inputpage(ctx, next) {
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
	await ctx.render("method/inputpage",{
		statusreport:ctx.request.body.statusreport
	})
},
//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered method.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Method.findById(ctx.params.id)
        .then(async methodx=>{
            console.log("Methodx:"+methodx);
            let method=encodeURIComponent(JSON.stringify(methodx));
            console.log("method:"+method);
            console.log("type of method:"+typeof(method));
            await ctx.render("method/editpage",{
                method:method,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Method.findById(ctx.params.id) failed !!");
            console.log(err)
        })
},

//依參數id取得資料
retrieve(req,res){

},
//依參數no取得一筆資料
findByNo(req,res){

},

//寫入一筆資料
async create(ctx,next){
    var new_method = new Method(ctx.request.body);
    console.log("got new_method:"+new_method.a25different);
    await new_method.save()
    .then(()=>{
        console.log("Saving new_method....");
    statusreport="儲存單筆客戶資料後進入本頁";
    ctx.redirect("/method/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Method.save() failed !!")
        console.log(err)
    })
},
//批次新增資料
async batchinput(ctx, next){
    var statusreport=ctx.query.statusreport;
    var datafile=ctx.query.datafile;
    console.log("got the name of datafile:"+datafile)
    // 引用需要的模組
    const fs = require('fs');
    const path=require("path");
    const readline = require('readline');
    // 逐行讀入檔案資料
    //定義輸出串流
    //var writeStream = fs.createWriteStream('out.csv');

    //定義讀入串流 (檔案置於/public目錄下)
    let filepath=path.join(__dirname,"../public/csv/");
    var lineReader = readline.createInterface({
        input: fs.createReadStream(filepath+datafile+'.csv')
    });
    var lineno=0;
    var methodArray;
    var tempstore=new Array(9);
    for (let i=0;i<9;i++){
        tempstore[i]=new Array();
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{
    //當讀入一行資料時
    lineReader.on('line', function(data) {
        var values = data.split(',');
        for (let i=0;i<9;i++){
            tempstore[i][lineno]=values[i].trim();
        }
        lineno++;
        console.log("read line:"+data)
    });//EOF lineReader.on
    resolve();
            })//EOF promise
    })//EOF readfile
    let savedata=(()=>{
        return new Promise((resolve, reject)=>{
        methodArray=new Array(lineno);

        let saveone=(async new_method=>{
                await new_method.save()
                .then(()=>{
                    console.log("Saved document:"+new_method.a25different)
                    })
                .catch((err)=>{
                    console.log("Method.save() failed !!")
                    console.log(err)
                })
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            methodArray[k]=new Array(9);
            for (let m=0;m<9;m++){
                methodArray[k][m]=tempstore[m][k]
                //console.log(methodArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of methodArray:"+methodArray[0][0]);
        console.log("read total lines:"+methodArray.length);
        let sequence=Promise.resolve();
        methodArray.forEach(function(methodj){
            sequence=sequence.then(function(){
                var new_method = new Method({
                  a05activityID:methodj[0],
                  a10loyalistID:methodj[1],
                  a15subact_old:methodj[2],
                  a20subact_new:methodj[3],
                  a25different:methodj[4],
                  a30baseline:methodj[5],
                  a35dataneed:methodj[6],
                  a40formula:methodj[7],
                  a99footnote:methodj[8]
                });//EOF new method
                    saveone(new_method)
                .catch(err=>{
                    console.log(err)
                })
            })//EOF sequence
            })//EOF forEach
            resolve();
        })//EOF promise
        })//EOF savedata
    await readfile()
    .then(()=>{
        setTimeout(savedata,3000)
    })
    .then(async ()=>{
        //console.log("going to list prject....");
        //ctx.redirect("/project/?statusreport="+statusreport)
        console.log("go back to datamanage1.ejs");
        statusreport="完成method批次輸入";
        await ctx.render("innerweb/datamanage/datamanagetemp",{
            statusreport
        })
    })
    .catch((err)=>{
        console.log("ctx.redirect failed !!")
        console.log(err)
    })
},
//依參數id刪除資料
async destroy(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Method.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a method....");
    statusreport="刪除單筆名詞對照後進入本頁";
    //ctx.res.end()
    ctx.redirect("/method/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Method.deleteOne() failed !!")
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await Method.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newmethod)=>{
        console.log("Saving new_method....:"+newmethod);
    statusreport="更新單筆名詞對照後進入本頁";
    ctx.redirect("/method/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Method.findOneAndUpdate() failed !!")
        console.log(err)
    })
}
}//EOF export
