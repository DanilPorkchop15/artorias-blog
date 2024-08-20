import upload from "../../storage";
import {Router} from "express";
import authMiddleware from "../../middleware/authMiddleware";

const router: Router = Router();

router.post("/", upload.single("image"), (req, res) => {
  res.send({url: `${req.file?.path}`});
});

export default router;