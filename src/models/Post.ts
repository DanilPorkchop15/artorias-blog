import { Schema, model } from "mongoose";
import {IPostDocument, TPost} from "../types/Post.types";

const postSchema: Schema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    imageUrl: String,
    views: {
      type: Number,
      default: 0
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

export default model<IPostDocument>("Post", postSchema)