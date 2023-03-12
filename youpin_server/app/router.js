//router.js
module.exports = (app) => {
  const { router, controller } = app;
  //http://localhost:7001/getStr.do
  // router.get("/getStr.do", controller.personal.getStr);
  router.get("/getorder.do", controller.personal.getorder);
  router.get('/getcars.do', controller.personal.getcars);

  // router.post('/addgoods.do', controller.personal.addgoods);
  // router.post('/addOrUpdate.do', controller.personal.checkedAdd);
  router.post('/getpersonal.do', controller.personal.getpersonal);
  router.post('/addAddress.do', controller.personal.addAddress);


  router.post('/deleteorder.do', controller.personal.deleteorder);
  router.post('/upcarsnum.do', controller.personal.upcarsnum);
  router.post('/decar.do', controller.personal.decar);

  router.get("/getgoodsBynew.do", controller.homepageController.getgoodsBynew);
  router.get("/getgoodsBytime.do", controller.homepageController.getgoodsBytime);
  router.get("/getallgoods.do", controller.homepageController.getAllgoods);
  router.get("/getallgoodsbyclass.do", controller.homepageController.getAllgoodsbyclass);
  router.get("/getallgoodsbyprice.do", controller.homepageController.getAllgoodsbyprice);
  // router.get("/getallgoodsbyprice.do", controller.homepageController.getAllgoodsbyprice);

  router.post("/login", controller.loginController.login);
  router.post("/register", controller.registerController.register);
  router.post('/getCurrentUser', controller.loginController.getCurrentUser);
  router.post('/searchByKey', controller.searchController.searchByKey);
  // router.post("/addCart.do", controller.goodsController.addCart);
  router.get("/getGoodsAddressById.do", controller.goodsController.getGoodsAddressById);
  router.get("/getCommentBygid.do", controller.goodsController.getCommentBygid);
  router.get("/checkedAdd.do", controller.goodsController.checkedAdd);
  router.post("/addOrUpdate.do", controller.goodsController.addOrUpdate);
  router.post("/addComment.do", controller.goodsController.addComment);
  router.get("/delComment.do", controller.goodsController.delComment);
  router.post("/addComSon.do", controller.goodsController.addComSon);
  router.get("/getGoodsById.do", controller.goodsController.getGoodsById);
  router.get("/getGoodsImgById.do", controller.goodsController.getGoodsImgById);
};