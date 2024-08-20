import upload from "../../storage";
import {Router} from "express";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

router.post("/", authMiddleware, upload.single("image"), (req, res) => {
  res.send({url: `api/upload/${req.file?.filename}`});
});

export default router;