import {TDoc} from "./utils/utils.types";
import {Schema} from "mongoose";

export type TPost = {
  title: string,
  text: string,
  tags?: string[],
  imageUrl?: string,
  views?: number,
  user: Schema.Types.ObjectId
}

export interface IPostDocument extends TPost, TDoc {}