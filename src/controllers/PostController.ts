import { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.body.userId})
    await newPost.save()
    res.json(newPost)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      message: 'Create post error'
    })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id)
    if (req.body.userId !== post?.user.toString()) {
      return res.status(403).json({message: 'Forbidden'})
    }
    const newPost = await Post
      .findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.body.userId
    }, {new: true})
      .populate("user")
      .exec()
    if (!newPost) {
      return res.status(404).json({message: 'Post not found'})
    }
    res.json(newPost)
  } catch (e) {
    console.log(e)
    res.status(400).json({
      message: 'Update post error'
    })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    if (req.body.userId !== req.params.id) {
      return res
        .status(403)
        .json({
          message: 'Forbidden'
        })
    }
    const post = await Post.findByIdAndDelete({_id: req.params.id})
    if (!post) {
      return res
        .status(404)
        .json({
          message: 'Post not found'
        })
    }
    res.json({
      message: 'Post deleted'
    })
  } catch (e) {
    console.log(e)
    res.status(400).json({
      message: 'Delete post error'
    })
  }
}

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Post
      .findByIdAndUpdate({
        _id: req.params.id
        },
        {
          $inc: {
            views: 1
          }
        },
        {
          returnDocument: 'after'
        }
        )
      .populate("user")
      .exec()
    if (!post) {
      return res
        .status(404)
        .json({message: 'Post not found'})
    }
    console.log(post)
    res.json(post)
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json({
      message: 'Get post error'
    })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post
      .find()
      .populate("user")
      .exec()
    if (!posts) {
      return res
        .status(404)
        .json({
          message: 'Posts not found'
        })
    }
    res.json(posts)
  } catch (e) {
    console.log(e)
    res
      .status(400)
      .json({
      message: 'Get posts error'
    })
  }
}