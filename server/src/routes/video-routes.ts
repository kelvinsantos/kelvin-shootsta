import * as express from "express";
const router = express.Router();

import multer from "multer";
const multipart = multer();

// import utilities
import RouterUtil from "../utils/router-utils";

// import handlers
import VideoHandler from "../handlers/organization/video-handler";

const routerUtil = new RouterUtil(router);

const videoHandler = new VideoHandler();
routerUtil.buildGetRoute("/list", videoHandler.get);
routerUtil.buildGetRoute("/list-from-db", videoHandler.getFromDb);
router.route("/upload").post(multipart.single("file"), videoHandler.upload);

export default router;