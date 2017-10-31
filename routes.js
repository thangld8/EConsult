// const app = express.app();
//
// app.get("/", controler.homePage);
// app.get("/index", controler.homePage);
// app.post("/login", controler.login);
// app.post("/upPost", controler.addPost);
// app.get("/newsPost", controler.newsPost);
// app.get("/notiPost", controler.notiPost);
// app.get("/eventPost", controler.eventPost);
// app.get("/getNewsTotal", controler.getNewsTotal);
// app.get("/aboutUs", controler.aboutUs);
// app.get("/priceTable", controler.priceTable);
// app.get("/shareServices", controler.shareServices);
// app.get("/shareServicesTrans", controler.shareServicesTrans);
// app.get("/shareServicesFinaceCor", controler.shareServicesFinaceCor);
// app.get("/shareServicesFamily", controler.shareServicesFamily);
// app.get("/shareServicesFinaceBanking", controler.shareServicesFinaceBanking);
// app.get("/shareServicesTax", controler.shareServicesTax);
// app.get("/shareServicesSupport", controler.shareServicesSupport);
// app.get("/course", controler.course);
// app.get("/hireEmp", controler.hireEmp);
// app.get("/contactUs", controler.contactUs);
//
// export default app;

var controler = require("./controllers/econsultControllers");

module.exports = function (app) {
    app.get("/", controler.homePage);
    app.get("/index", controler.homePage);
    app.post("/login", controler.login);
    app.post("/upPost", controler.addPost);
    app.get("/newsPost", controler.newsPost);
    app.get("/notiPost", controler.notiPost);
    app.get("/eventPost", controler.eventPost);
    app.get("/getNewsTotal", controler.getNewsTotal);
    app.get("/aboutUs", controler.aboutUs);
    app.get("/priceTable", controler.priceTable);
    app.get("/shareServices", controler.shareServices);
    app.get("/shareServicesTrans", controler.shareServicesTrans);
    app.get("/shareServicesFinaceCor", controler.shareServicesFinaceCor);
    app.get("/shareServicesFamily", controler.shareServicesFamily);
    app.get("/shareServicesFinaceBanking", controler.shareServicesFinaceBanking);
    app.get("/shareServicesTax", controler.shareServicesTax);
    app.get("/shareServicesSupport", controler.shareServicesSupport);
    app.get("/course", controler.course);
    app.get("/hireEmp", controler.hireEmp);
    app.get("/contactUs", controler.contactUs);
    app.get("/reUp", controler.reUp);
    app.get("/newestPostToEdit", controler.newestPostToEdit);
    app.post("/editPost", controler.editPost);
    app.post("/updatePost", controler.updatePost);
}