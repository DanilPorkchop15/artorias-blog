import {Router} from "express";
import {postCreateValidation} from "../../validations/PostValidation";
import { PostController} from "../../controllers";
import checkAuth from "../../middleware/authMiddleware";
import {handleValidationErrorsMiddleware} from "../../middleware/handleValidationErrorsMiddleware";

const router: Router = Router();

router.get('/', PostController.getAllPosts)

router.get('/:id', PostController.getPost)

router.post(
  '/',
  postCreateValidation,
  handleValidationErrorsMiddleware,
  checkAuth,
  PostController.createPost
)

router.put(
  '/:id',
  postCreateValidation,
  handleValidationErrorsMiddleware,
  checkAuth,
  PostController.updatePost
)

router.delete('/:id', checkAuth, PostController.deletePost)

export default router