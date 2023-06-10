var router = require('@koa/router')();

const branchController = require('../controllers/index').branch;
//依帳號決定轉頁
router.post('/', async (ctx, next)=> {
	await branchController.dispatch(ctx)
});
//到Applicantweb
router.get('/app4applicant', async (ctx, next)=> {
    await branchController.goapplicant(ctx,next)
});
//到Processorweb
router.get('/pwa4decomposer', async (ctx, next)=> {
  await branchController.godecomposer(ctx,next)
});
//到Methodorweb
router.get('/pwa4methodor', async (ctx, next)=> {
  await branchController.gomethodor(ctx,next)
});
//到Collectorweb
router.get('/pwa4collecter', async (ctx, next)=> {
  await branchController.gocollecter(ctx,next)
});
//到Investigatorweb
router.get('/pwa4investigator', async (ctx, next)=> {
  await branchController.goinvestigator(ctx,next)
});
//到Accepterweb
router.get('/pwa4receiver', async (ctx, next)=> {
  await branchController.goreceiver(ctx,next)
});
//到Maintainerweb
router.get('/maintainer', async (ctx, next)=> {
  await branchController.gomaintainer(ctx,next)
});
module.exports = router;
