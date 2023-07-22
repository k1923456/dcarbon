//載入相對應的model
const User = require('../models/index').user;
const Process = require('../models/index').process;
const Staff = require('../models/index').staff;
const Term = require('../models/index').term;
module.exports = {

//到本系統後台管理網頁-登入員工業務要覽
async daily(ctx,next){
    var {statusreport}=ctx.request.body;
    var {account}=ctx.request.body;
    var {password}=ctx.request.body;

},
//由本系統後台管理網頁回到員工業務要覽
async gobackdaily(ctx,next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);
},
//到客服業務處理
async operate(ctx, next){

},
//客服業務處理-回應留言
async reply(ctx, next){
    var statusreport="由客服業務處理選項進入本頁";

},
//客服業務處理-回應需求
async reception(ctx, next){
    var statusreport="由客服業務處理選項進入本頁";

},
//客服業務處理-客戶需求轉為專案
async project(ctx, next){
    statusreport="由客服業務處理選項進入本頁";

},
//客服業務處理-ocosa分析
async ocosa(ctx, next){
    statusreport="由客服業務處理選項進入本頁";

},
//客服業務處理-行動規劃及進度管控
async actionplan(ctx, next){
    statusreport="由客服業務處理選項進入本頁";

},
//到知識管理
async KM(ctx, next){
    console.log("found route /knowledge !!");
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);

},
//到知識整合-依企管分類
async KIbycate(ctx, next){
    let statusreport="知識整合-依企管分類！!";
    console.log("going in method KIbycate!!")

},
//到知識整合-依課程分類
async KIbycourse(ctx, next){

},
//到知識整合-依專業領域分類
async KIbydomain(ctx, next){

},
//到知識分類學
async classify(ctx, next){

},
//到行政作業
async affaire(ctx, next){
    statusreport="由行政作業選項進入本頁";
    console.log("進入controller的affaire");

},
//行政作業-人力資源
async personnel(ctx, next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);

},
//行政作業-財務會計
async finance(ctx, next){
    statusreport="由行政作業選項進入本頁";

},
//行政作業-資訊通訊
async ICT(ctx, next){
    statusreport="由行政作業選項進入本頁";

},
//到資料庫維管
async datamanage(ctx, next){
    console.log("進入controller的datamanage");
    statusreport="以資料管理權限進入本頁";
    var tablesjson=[
      {"route":"/user",
      "label":"使用者帳戶資料表維管"
      },
      {"route":"/userright",
      "label":"使用者權限資料表維管"
      },
      {"route":"/staff",
      "label":"團隊人員資料表維管"
      },
      {"route":"/applicant",
      "label":"認證申請人資料表維管"
      },
      {"route":"/loyalist",
      "label":"淨零義士資料表維管"
      },
      {"route":"/product",
      "label":"申請碳權產品資料表維管"
      },
      {"route":"/activity",
      "label":"減碳或增匯活動資料表維管"
      },
      {"route":"/subact",
      "label":"減碳或增匯細部活動資料表維管"
      },
      {"route":"/input",
      "label":"細部活動投入資料表維管"
      },
      {"route":"/coefficient",
      "label":"細部活動碳排係數資料表維管"
      },
      {"route":"/method",
      "label":"認驗證方法資料表維管"
      },
      {"route":"/dataneed",
      "label":"驗證所需提供資料表維管"
      },
      {"route":"/case",
      "label":"申請案場資料表維管"
      },
      {"route":"/progress",
      "label":"申請案件進度表資料表維管"
      },
      {"route":"/evidence",
      "label":"上傳佐證資料表維管"
      },
      {"route":"/report",
      "label":"驗證報告資料表維管"
      },
      {"route":"/credit",
      "label":"公評碳權管理資料表維管"
      },
      {"route":"/award",
      "label":"公評點數資料表維管"
      },
      {"route":"/source",
      "label":"資料來源資料表維管"
      },
      {"route":"/term",
      "label":"名詞對照資料表維管"
      }
      ];
      console.log("type of tablesjson:"+typeof(tablesjson));
      console.log("type of 1st table:"+typeof(tablesjson[0]));
      console.log("No. of table:"+tablesjson.length)
      let tables=encodeURIComponent(JSON.stringify(tablesjson));
      console.log("type of tables:"+typeof(tables));
    await ctx.render("innerweb/datamanage" ,{
        statusreport,
        tables
    })

},
//判定登入人群組
async group(ctx,next){
    console.log("進入controller的group");
    let {statusreport}=ctx.request.body;
    let {account}=ctx.request.body;
    console.log("gotten query:"+statusreport);
    console.log("gotten account:"+account);
    if(statusreport===undefined){
        statusreport="未截到status";
        console.log("未截到status!!");
    }
    /* 若資料庫需要先建立一些資料，則先用此段程式替代下段程式
    await ctx.render("datamanage" ,{
        statusreport,
        account
    })
    */

},

//到各種model管理(0)
async managepage0(ctx, next){
	statusreport="由某類資料管理進入本頁";
},
//到各種model管理(一)
async managepage1(ctx, next){
	statusreport="由某類資料管理進入本頁";

},
//到各種model管理(二)
async managepage2(ctx, next){
	statusreport="由某類資料管理進入本頁";

},
//到各種model管理(三)
async managepage3(ctx, next){
	statusreport="由某類資料管理進入本頁";

},
//業績看板
async outcome(ctx, next){
    statusreport="";

},
//到內部通訊
async communicate(ctx, next){
    statusreport="";

},
//到回映意見反映
async ideadeal(ctx, next){
    var statusreport=ctx.query.statusreport;
    console.log("gotten query:"+statusreport);

},
}//EOF export
