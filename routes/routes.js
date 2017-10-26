import express from "express";
import { homePage, login, hireEmp, contactUs, shareServicesTax, course, shareServicesSupport, shareServicesFinaceBanking, shareServicesFamily, shareServicesFinaceCor, addPost, newsPost, eventPost, notiPost, getNewsTotal, aboutUs, priceTable, shareServices, shareServicesTrans} from "../controllers/econsultControllers";

const router = express.Router();

router.get("/", homePage);
router.get("/index", homePage);
router.post("/login", login);
router.post("/upPost", addPost);
router.get("/newsPost", newsPost);
router.get("/notiPost", notiPost);
router.get("/eventPost", eventPost);
router.get("/getNewsTotal", getNewsTotal);
router.get("/aboutUs", aboutUs);
router.get("/priceTable", priceTable);
router.get("/shareServices", shareServices);
router.get("/shareServicesTrans", shareServicesTrans);
router.get("/shareServicesFinaceCor", shareServicesFinaceCor);
router.get("/shareServicesFamily", shareServicesFamily);
router.get("/shareServicesFinaceBanking", shareServicesFinaceBanking);
router.get("/shareServicesTax", shareServicesTax);
router.get("/shareServicesSupport", shareServicesSupport);
router.get("/course", course);
router.get("/hireEmp", hireEmp);
router.get("/contactUs", contactUs);

export default router;
