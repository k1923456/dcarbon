var router = require('@koa/router')();
var views=require("koa-views");
const innerwebController = require('../controllers/index').innerweb;
//到本系統後台管理網頁-登入員工業務要覽
router.post('/', async (ctx, next)=> {
	await innerwebController.daily(ctx, next)
});
//回到本系統後台管理網頁-回到員工業務要覽
router.get('/', async (ctx, next)=> {
	await innerwebController.daily(ctx, next)
});
//到客服業務處理
router.get('/workzone', async (ctx, next)=> {
	await innerwebController.operate(ctx, next)
});
//客服業務處理-回應留言
router.get('/workzone/message', async (ctx, next)=> {
	await innerwebController.reply(ctx, next)
});
//客服業務處理-回應需求
router.get('/workzone/bellcall', async (ctx, next)=> {
	await innerwebController.reception(ctx, next)
});
//客服業務處理-需求轉為專案
router.get('/workzone/project', async (ctx, next)=> {
	await innerwebController.project(ctx, next)
});
//客服業務處理-ocosa分析
router.get('/workzone/analysis', async (ctx, next)=> {
	await innerwebController.ocosa(ctx, next)
});
//客服業務處理-行動規劃及進度管控
router.get('/workzone/planning', async (ctx, next)=> {
	await innerwebController.actionplan(ctx, next)
});
//到知識管理
router.get('/KI/KM', async (ctx, next)=> {
	await innerwebController.KM(ctx, next)
});
//到知識整合-依企管分類
router.get('/KI/KIbycate', async (ctx, next)=> {
	await innerwebController.KIbycate(ctx, next)
});
//到知識整合-依專業領域分類
router.get('/KI/KIbydomain', async (ctx, next)=> {
	await innerwebController.KIbydomain(ctx, next)
});
//到知識整合-依課程分類
router.get('/KI/KIbycourse', async (ctx, next)=> {
	await innerwebController.KIbycourse(ctx, next)
});
//到知識分類學
router.get('/KI/classify', async (ctx, next)=> {
	await innerwebController.classify(ctx, next)
});
//到行政作業
router.get('/general', async (ctx, next)=> {
    console.log("進入router的general");
	await innerwebController.affaire(ctx, next)
});
//行政作業-人力資源
router.get('/general/personnel', async (ctx, next)=>{
	await innerwebController.personnel(ctx, next)
});
//行政作業-財務會計
router.get('/general/finance', async (ctx, next)=>{
	await innerwebController.finance(ctx, next)
});
//行政作業-資訊通訊
router.get('/general/ICT', async (ctx, next)=>{
	await innerwebController.ICT(ctx, next)
});
//到資料庫維管
router.post('/datamanage', async (ctx, next)=>{
    console.log("進入router的datamanage");
	await innerwebController.datamanage(ctx, next)
});
//判定資料庫維管群組
router.post('/datamanage/group', async (ctx, next)=> {
    console.log("進入router的group");
    //var {statusreport}=ctx.request.body;
    //var {account}=ctx.request.body;
    //console.log("gotten query:"+statusreport);
    //console.log("gotten account:"+account);
    await innerwebController.group(ctx, next)
});
//到各種model管理(0)
router.get('/datamanage/gomanage0', async (ctx, next)=> {
    await innerwebController.managepage0(ctx, next)
});
//到各種model管理(一)
router.get('/datamanage/gomanage1', async (ctx, next)=> {
	await innerwebController.managepage1(ctx, next)
});
//到各種model管理(二)
router.get('/datamanage/gomanage2', async (ctx, next)=> {
	await innerwebController.managepage2(ctx, next)
});
//到各種model管理(三)
router.get('/datamanage/gomanage3', async (ctx, next)=> {
	await innerwebController.managepage3(ctx, next)
});
//業績看板
router.get('/team/outcome', async (ctx, next)=>{
	await innerwebController.outcome(ctx, next)
});
//到內部通訊
router.get('/team/communicate', async (ctx, next)=> {
	await innerwebController.communicate(ctx, next)
});
//到回應意見反映
router.get('/team/ideadeal', async (ctx, next)=> {
	await innerwebController.ideadeal(ctx, next)
});
module.exports = router;
