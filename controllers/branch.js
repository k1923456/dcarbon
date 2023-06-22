//載入相對應的model
const User = require('../models/index').user;
module.exports = {
//依帳號決定轉頁
async dispatch(ctx, next) {
  console.log("進入branch controller的dispatch");
  statusreport="由系統的暫用統一入口進入本頁";
  var {account}=ctx.request.body;
  var group;
  var pwaroute;
  console.log("the account :"+account)
  await User.findOne({a15account:account}).then(async userx=>{
      console.log("userx:"+userx.a15account);
      console.log("group:"+userx.a25group);
      group=userx.a25group;
      switch(group){
        case "applicant":pwaroute="/base4dcarbon/branch/app4applicant";break;
        case "decomposer":pwaroute="/base4dcarbon/branch/pwa4decomposer";break;
        case "methodor":pwaroute="/base4dcarbon/branch/pwa4methodor";break;
        case "collecter":pwaroute="/base4dcarbon/branch/pwa4collecter";break;
        case "investigator":pwaroute="/base4dcarbon/branch/pwa4investigator";break;
        case "admin":pwaroute="/base4dcarbon/branch/maintainer";break;
        case "management":pwaroute="/base4dcarbon/branch/maintainer";break;
        case "tester":pwaroute="/base4dcarbon/branch/collecter";break;
        default:pwarouter="/base4dcarbon";
      }
      await ctx.redirect(pwaroute+"/"+account);
  })
  .catch(err=>{
      console.log("User.findOne() failed !!");
      console.log(err)
  })
},
//到Applicantweb
async goapplicant(ctx, next) {
  console.log("進入branch controller的goapplicant");
  var account=ctx.params.id;
  console.log("account:"+account);
  await User.findOne({a15account:account}).then(async userx=>{
      console.log("userx ID:"+userx.a10personID);
      statusreport="以認證申請人身分進入本頁";
      console.log("type of userx:"+typeof(userx));
      console.log("userx:"+userx)
      let user1=encodeURIComponent(JSON.stringify(userx));
      console.log("type of user1:"+typeof(user1));
      console.log("user1:"+user1)
      await ctx.render("branch/app4applicant" ,{
        statusreport,
        user1
          })
    })
    .catch(err=>{
      console.log("User.findOne() failed !!");
      console.log(err)
  })
},
//到decomposerweb
async godecomposer(ctx, next) {
  console.log("進入branch controller的godecomposer");
  statusreport="以活動解構士身分進入本頁";
  await ctx.render("branch/pwa4decomposer" ,{
    statusreport
})
},
//到Methodorweb
async gomehtodor(ctx, next) {

},
//到Collecterweb
async gocollecter(ctx, next) {

},
//到Investigatorweb
async goinvestigator(ctx, next) {

},
//到Receiverweb
async goreceiver(ctx, next) {

},
//到maintainertweb
async gomaintainer(ctx, next) {
  console.log("進入branch controller的maintainer");
  statusreport="以資料管理權限進入本頁";
  var tablesjson=[
    {"route":"/base4dcarbon/user",
    "label":"使用者帳戶資料表維管"
    },
    {"route":"/base4dcarbon/userright",
    "label":"使用者權限資料表維管"
    },
    {"route":"/base4dcarbon/staff",
    "label":"團隊人員資料表維管"
    },
    {"route":"/base4dcarbon/applicant",
    "label":"認證申請人資料表維管"
    },
    {"route":"/base4dcarbon/loyalist",
    "label":"淨零義士資料表維管"
    },
    {"route":"/base4dcarbon/product",
    "label":"申請碳權產品資料表維管"
    },
    {"route":"/base4dcarbon/activity",
    "label":"減碳或增匯活動資料表維管"
    },
    {"route":"/base4dcarbon/subact",
    "label":"減碳或增匯細部活動資料表維管"
    },
    {"route":"/base4dcarbon/input",
    "label":"細部活動投入資料表維管"
    },
    {"route":"/base4dcarbon/coefficient",
    "label":"細部活動碳排係數資料表維管"
    },
    {"route":"/base4dcarbon/method",
    "label":"認驗證方法資料表維管"
    },
    {"route":"/base4dcarbon/dataneed",
    "label":"驗證所需提供資料表維管"
    },
    {"route":"/base4dcarbon/case",
    "label":"申請案場資料表維管"
    },
    {"route":"/base4dcarbon/progress",
    "label":"申請案件進度表資料表維管"
    },
    {"route":"/base4dcarbon/evidence",
    "label":"上傳佐證資料表維管"
    },
    {"route":"/base4dcarbon/report",
    "label":"驗證報告資料表維管"
    },
    {"route":"/base4dcarbon/credit",
    "label":"公評碳權管理資料表維管"
    },
    {"route":"/base4dcarbon/award",
    "label":"公評點數資料表維管"
    },
    {"route":"/base4dcarbon/source",
    "label":"資料來源資料表維管"
    },
    {"route":"/base4dcarbon/term",
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
}
}//EOF export
