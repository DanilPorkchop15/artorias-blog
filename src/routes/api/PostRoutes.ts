import {Router} from "express";
import {postCreateValidation} from "../../validations/PostValidation";
import {createPost, deletePost, getAllPosts, getPost, updatePost} from "../../controllers/PostController";
import checkAuth from "../../middleware/authMiddleware";
import {handleValidationErrorsMiddleware} from "../../middleware/handleValidationErrorsMiddleware";

const router: Router = Router();

router.get('/', getAllPosts)

router.get('/:id', getPost)

router.post(
  '/',
  postCreateValidation,
  handleValidationErrorsMiddleware,
  checkAuth,
  createPost
)

router.put(
  '/:id',
  postCreateValidation,
  handleValidationErrorsMiddleware,
  checkAuth,
  updatePost
)

router.delete('/:id', checkAuth, deletePost)

export default router