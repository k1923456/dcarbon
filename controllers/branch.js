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
        case "applicant":pwaroute="/branch/app4applicant";break;
        case "decomposer":pwaroute="/branch/pwa4decomposer";break;
        case "methodor":pwaroute="/branch/pwa4methodor";break;
        case "collecter":pwaroute="/branch/pwa4collecter";break;
        case "investigator":pwaroute="/branch/pwa4investigator";break;
        case "admin":pwaroute="/branch/maintainer";break;
        case "management":pwaroute="/branch/maintainer";break;
        case "tester":pwaroute="/branch/collecter";break;
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
}
}//EOF export
