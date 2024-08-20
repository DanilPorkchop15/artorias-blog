import {Document} from "mongoose";

export interface TDoc extends Document {
  _doc?: any
}