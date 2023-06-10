//載入相對應的model
const Product = require('../models/index').product;
module.exports = {
//列出清單list(req,res)
async list(ctx,next){
    console.log("found route /base4dcarbon/product !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    await Product.find({}).then(async products=>{
        //console.log("found products:"+products);
        console.log("type of products:"+typeof(products));
        console.log("type of 1st product:"+typeof(products[0]));
        //console.log("1st product:"+products[0].a30mean)
        console.log("No. of product:"+products.length)
        let productlist=encodeURIComponent(JSON.stringify(products));
        console.log("type of products:"+typeof(productlist));
        if(statusreport===undefined){
            statusreport="未截到status"
        }
        await ctx.render("product/listpage",{
        //ctx.response.send({
            productlist:productlist,
            statusreport:statusreport
        })
    })
    .catch(err=>{
        console.log("Product.find({}) failed !!");
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
	await ctx.render("product/inputpage",{
		statusreport:ctx.request.body.statusreport
	})
},
//到修正單筆資料頁
async editpage(ctx, next) {
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
    console.log("ID:"+ctx.params.id);
    console.log("entered product.findById(ctx.params.id)!!");
    if(statusreport===undefined){
        statusreport="status未傳成功!"
    }
    await Product.findById(ctx.params.id)
        .then(async productx=>{
            console.log("Productx:"+productx);
            let product=encodeURIComponent(JSON.stringify(productx));
            console.log("product:"+product);
            console.log("type of product:"+typeof(product));
            await ctx.render("product/editpage",{
                product:product,
                statusreport:statusreport
            })
        })
        .catch(err=>{
            console.log("Product.findById(ctx.params.id) failed !!");
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
    var new_product = new Product(ctx.request.body);
    console.log("got new_product:"+new_product.a30mean);
    await new_product.save()
    .then(()=>{
        console.log("Saving new_product....");
    statusreport="儲存單筆客戶資料後進入本頁";
    ctx.redirect("/base4dcarbon/product/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Product.save() failed !!")
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
    var productArray;
    var tempstore=new Array(8);
    for (let i=0;i<8;i++){
        tempstore[i]=new Array();
    };
    let readfile=(()=>{
        console.log("reading..."+datafile+".csv");
        return new Promise((resolve,reject)=>{
    //當讀入一行資料時
    lineReader.on('line', function(data) {
        var values = data.split(',');
        for (let i=0;i<8;i++){
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
        productArray=new Array(lineno);

        let saveone=(async new_product=>{
                await new_product.save()
                .then(()=>{
                    console.log("Saved document:"+new_product.a30mean)
                    })
                .catch((err)=>{
                    console.log("Product.save() failed !!")
                    console.log(err)
                })
        });//EOF saveone
        for (let k=0;k<lineno;k++){
            productArray[k]=new Array(8);
            for (let m=0;m<8;m++){
                productArray[k][m]=tempstore[m][k]
                //console.log(productArray[k])
            }
        }
        console.log("3 second later...");
        console.log("1st datum of productArray:"+productArray[0][0]);
        console.log("read total lines:"+productArray.length);
        let sequence=Promise.resolve();
        productArray.forEach(function(productj){
            sequence=sequence.then(function(){
                var new_product = new Product({
                  a05hscode:productj[0],
                  a10part:productj[1],
                  a15chapter:productj[2],
                  a20section:productj[3],
                  a25subsection:productj[4],
                  a30itemCh:productj[5],
                  a35itemEn:productj[6],
                  a99footnote:productj[7]
                });//EOF new product
                    saveone(new_product)
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
        //ctx.redirect("/base4dcarbon/project/?statusreport="+statusreport)
        console.log("go back to datamanage1.ejs");
        statusreport="完成product批次輸入";
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
    await Product.deleteOne({_id: ctx.params.id})
    .then(()=>{
        console.log("Deleted a product....");
    statusreport="刪除單筆名詞對照後進入本頁";
    //ctx.res.end()
    ctx.redirect("/base4dcarbon/product/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Product.deleteOne() failed !!")
        console.log(err)
    })
},

//依參數id更新資料
async update(ctx,next){
    let {_id}=ctx.request.body;
    var {statusreport}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    await Product.findOneAndUpdate({_id:_id}, ctx.request.body, { new: true })
    .then((newproduct)=>{
        console.log("Saving new_product....:"+newproduct);
    statusreport="更新單筆名詞對照後進入本頁";
    ctx.redirect("/base4dcarbon/product/?statusreport="+statusreport)
    })
    .catch((err)=>{
        console.log("Product.findOneAndUpdate() failed !!")
        console.log(err)
    })
}
}//EOF export
